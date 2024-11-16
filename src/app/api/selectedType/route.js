import { getConnection } from "../../../../lib/db.js";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const selectedType = searchParams.get("selectedType"); // Bisa "category" atau "size"
  const categoryId = searchParams.get("category_id"); // Opsional, filter untuk size berdasarkan kategori
  const withWrapStyle = searchParams.get("withWrapStyle") === "true"; // Opsi filter kategori dengan wrap style

  try {
    const pool = getConnection();
    let sql;
    const params = [];

    if (selectedType === "category") {
      if (withWrapStyle) {
        // Query kategori yang memiliki wrap style
        sql = `
          SELECT DISTINCT c.category_id, c.category_name, c.category_image
          FROM categories c
          JOIN wrap_style ws ON c.category_id = ws.category_id
        `;
      } else {
        // Query semua kategori
        sql = `
          SELECT category_id, category_name, category_image 
          FROM categories
        `;
      }
    } else if (selectedType === "size") {
      if (categoryId) {
        // Query ukuran berdasarkan kategori
        sql = `
          SELECT DISTINCT bs.size_id, bs.size_name, bs.size_image, bs.flower_count
          FROM bucket_size bs
          JOIN wrap_style ws ON bs.size_id = ws.size_id
          WHERE ws.category_id = ?
        `;
        params.push(categoryId);
      } else {
        // Query semua ukuran
        sql = `
          SELECT size_id, size_name, size_image, flower_count
          FROM bucket_size
        `;
      }
    } else {
      return NextResponse.json(
        { error: "Invalid selectedType parameter" },
        { status: 400 }
      );
    }

    const [rows] = await pool.query(sql, params);

    // Format gambar menjadi base64
    const result = rows.map((row) => ({
      ...row,
      category_image: row.category_image
        ? `data:image/jpeg;base64,${row.category_image.toString("base64")}`
        : null,
      size_image: row.size_image
        ? `data:image/jpeg;base64,${row.size_image.toString("base64")}`
        : null,
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const selectedType = formData.get("selectedType");

    const pool = getConnection();
    let sql;
    let params = [];

    if (selectedType === "category") {
      const category_name = formData.get("category_name");
      const category_image = formData.get("category_image");

      if (!category_name) {
        return NextResponse.json(
          { error: "Category name is required" },
          { status: 400 }
        );
      }

      const mimeType = category_image?.type;
      if (
        !mimeType ||
        !["image/png", "image/jpeg", "image/jpg"].includes(mimeType)
      ) {
        return NextResponse.json(
          { error: "File harus berupa gambar PNG atau JPG" },
          { status: 400 }
        );
      }

      const imageBuffer = Buffer.from(await category_image.arrayBuffer());
      sql = `
        INSERT INTO categories (category_name, category_image)
        VALUES (?, ?)
      `;
      params = [category_name, imageBuffer];
    } else if (selectedType === "size") {
      const size_name = formData.get("size_name");
      const size_image = formData.get("size_image");
      const flower_count = parseInt(formData.get("flower_count"), 10);

      if (!size_name || isNaN(flower_count)) {
        return NextResponse.json(
          { error: "Size name and flower count are required" },
          { status: 400 }
        );
      }

      const imageBuffer = size_image
        ? Buffer.from(await size_image.arrayBuffer())
        : null;

      sql = `
        INSERT INTO bucket_size (size_name, size_image, flower_count)
        VALUES (?, ?, ?)
      `;
      params = [size_name, imageBuffer, flower_count];
    } else {
      return NextResponse.json(
        { error: "Invalid selectedType parameter" },
        { status: 400 }
      );
    }

    await pool.execute(sql, params);

    return NextResponse.json({
      message: `${selectedType} added successfully!`,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
