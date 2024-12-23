import { getConnection } from "../../../../lib/db.js";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const recent = searchParams.get("recent");
  const productId = searchParams.get("id");
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const priceFrom = parseFloat(searchParams.get("priceFrom"));
  const priceTo = parseFloat(searchParams.get("priceTo"));
  const sortBy = searchParams.get("sortBy");
  const size = searchParams.get("size");

  try {
    const pool = getConnection();
    let sql = `
      SELECT p.product_id, p.product_name, p.price, p.description, 
             p.product_image, c.category_name, s.size_name, s.size_image 
      FROM products p 
      JOIN categories c ON p.category_id = c.category_id
      LEFT JOIN bucket_size s ON p.size_id = s.size_id
    `;
    const conditions = [];
    const params = [];

    // Filter by productId (for single product view)
    if (productId) {
      conditions.push("p.product_id = ?");
      params.push(productId);
    }

    if (recent === "true") {
      sql += " ORDER BY p.product_id DESC LIMIT 5";
    } else {
      // Apply filters
      if (category) {
        conditions.push("c.category_name = ?");
        params.push(category);
      }
      if (search) {
        conditions.push("p.product_name LIKE ?");
        params.push(`%${search}%`);
      }
      if (size) {
        conditions.push("s.size_name =?");
        params.push(size);
      }
      if (!isNaN(priceFrom)) {
        conditions.push("p.price >= ?");
        params.push(priceFrom);
      }
      if (!isNaN(priceTo)) {
        conditions.push("p.price <= ?");
        params.push(priceTo);
      }
      if (conditions.length > 0) {
        sql += " WHERE " + conditions.join(" AND ");
      }
      if (sortBy === "priceAsc") {
        sql += " ORDER BY p.price ASC";
      } else if (sortBy === "priceDesc") {
        sql += " ORDER BY p.price DESC";
      } else if (sortBy === "recent") {
        sql += " ORDER BY p.product_id DESC";
      }
    }

    const [rows] = await pool.query(sql, params);

    const products = rows.map((row) => ({
      ...row,
      product_image: row.product_image
        ? `data:image/jpeg;base64,${row.product_image.toString("base64")}`
        : null,
      size_image: row.size_image
        ? `data:image/jpeg;base64,${row.size_image.toString("base64")}`
        : null,
    }));

    return NextResponse.json(productId ? products[0] : products);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export async function POST(req) {
  try {
    const formData = await req.formData();
    const product_name = formData.get("product_name");
    const category_id = formData.get("category_id");
    const price = parseFloat(formData.get("price"));
    const description = formData.get("description");
    const product_image = formData.get("product_image");
    const size_id = formData.get("size_id"); // Ambil size_id dari form

    if (!product_name || !category_id || isNaN(price) || !size_id) {
      return NextResponse.json(
        {
          error:
            "Please provide all required fields: product_name, category_id, price, and size_id",
        },
        { status: 400 }
      );
    }

    const mimeType = product_image?.type;
    if (
      product_image &&
      (!mimeType ||
        !["image/png", "image/jpeg", "image/jpg"].includes(mimeType))
    ) {
      return NextResponse.json(
        { error: "File harus berupa gambar PNG atau JPG" },
        { status: 400 }
      );
    }

    const imageBuffer = product_image
      ? Buffer.from(await product_image.arrayBuffer())
      : null;

    const pool = getConnection();
    const sql = `
      INSERT INTO products (product_name, category_id, price, description, product_image, size_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    await pool.execute(sql, [
      product_name,
      category_id,
      price,
      description,
      imageBuffer,
      size_id,
    ]);

    return NextResponse.json(
      { message: "Product berhasil ditambahkan!" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
