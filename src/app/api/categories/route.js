import { getConnection } from "../../../../lib/db.js";
import { NextResponse } from "next/server";

// Handler untuk GET (Mengambil semua kategori atau kategori dengan wrap style)
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const withWrapStyle = searchParams.get("withWrapStyle") === "true";

  try {
    const pool = getConnection();
    let sql;

    if (withWrapStyle) {
      // Query hanya kategori yang memiliki wrap style
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

    const [rows] = await pool.query(sql);

    // Mengubah buffer gambar menjadi base64 string
    const categories = rows.map((row) => ({
      ...row,
      category_image: row.category_image
        ? `data:image/jpeg;base64,${row.category_image.toString("base64")}`
        : null,
    }));

    return NextResponse.json(categories);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Konfigurasi untuk menonaktifkan body parser bawaan Next.js
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb", // Setel batas ukuran file
    },
  },
};

// Handler untuk POST (Menambahkan kategori baru dengan gambar)
export async function POST(req) {
  try {
    // Parsing form data menggunakan request.formData()
    const formData = await req.formData();
    const category_name = formData.get("category_name");
    const category_image = formData.get("category_image");

    // Validasi file harus berupa gambar PNG atau JPG
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

    // Membaca gambar sebagai buffer
    const imageBuffer = Buffer.from(await category_image.arrayBuffer());

    // Simpan data kategori ke database
    const pool = getConnection();
    const sql = `
      INSERT INTO categories (category_name, category_image)
      VALUES (?, ?)
    `;
    await pool.execute(sql, [category_name, imageBuffer]);

    return NextResponse.json(
      { message: "Category berhasil ditambahkan!" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
