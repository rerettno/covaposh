import { getConnection } from "../../../../lib/db.js";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get("category_id");

  try {
    const pool = getConnection();
    let sql;
    const params = [];

    if (categoryId) {
      // Query untuk mengambil ukuran yang terkait dengan kategori tertentu di wrap_style
      sql = `
        SELECT DISTINCT bs.size_id, bs.size_name, bs.size_image
        FROM bucket_size bs
        JOIN wrap_style ws ON bs.size_id = ws.size_id
        WHERE ws.category_id = ?
      `;
      params.push(categoryId);
    } else {
      // Query untuk mengambil semua ukuran jika category_id tidak disertakan
      sql = `
        SELECT size_id, size_name, size_image
        FROM bucket_size
      `;
    }

    const [rows] = await pool.query(sql, params);

    const sizes = rows.map((row) => ({
      ...row,
      size_image: row.size_image
        ? `data:image/jpeg;base64,${row.size_image.toString("base64")}`
        : null,
    }));

    return NextResponse.json(sizes);
  } catch (error) {
    console.error("Failed to fetch sizes:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const size_name = formData.get("size_name");
    const size_image = formData.get("size_image");

    if (!size_name) {
      return NextResponse.json(
        { error: "Please provide a size name." },
        { status: 400 }
      );
    }

    const imageBuffer = size_image
      ? Buffer.from(await size_image.arrayBuffer())
      : null;

    const pool = getConnection();
    const sql = `
      INSERT INTO bucket_size (size_name, size_image)
      VALUES (?, ?)
    `;
    await pool.execute(sql, [size_name, imageBuffer]);

    return NextResponse.json(
      { message: "Size successfully added!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding size:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
