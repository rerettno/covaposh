import { NextResponse } from "next/server";
import { getConnection } from "../../../../lib/db";

export const sizeLimit = "500kb"; // Konfigurasi baru untuk batas ukuran unggahan file

export async function POST(req) {
  const formData = await req.formData();
  const category = formData.get("category"); // Kategori yang dipilih
  const data = {};

  // Parse data sesuai kategori
  if (category === "decoration") {
    data.name = formData.get("decoration_name");
    data.image = formData.get("decoration_image")
      ? Buffer.from(await formData.get("decoration_image").arrayBuffer())
      : null;
  } else if (category === "flower") {
    data.name = formData.get("flower_name");
  } else if (category === "flower_color") {
    data.colorName = formData.get("color_name");
    data.flowerId = formData.get("flower_id");
    data.image = formData.get("flower_image")
      ? Buffer.from(await formData.get("flower_image").arrayBuffer())
      : null;
    data.price = parseFloat(formData.get("flower_price") || 0);
  } else if (category === "ribbon") {
    data.name = formData.get("ribbon_name");
    data.image = formData.get("ribbon_image")
      ? Buffer.from(await formData.get("ribbon_image").arrayBuffer())
      : null;
  } else if (category === "wrap_style") {
    data.categoryId = formData.get("category_id");
    data.sizeId = formData.get("size_id");
    data.image = formData.get("wrap_image")
      ? Buffer.from(await formData.get("wrap_image").arrayBuffer())
      : null;
    data.price = parseFloat(formData.get("wrap_price") || 0);
  } else {
    return NextResponse.json({ error: "Invalid category" }, { status: 400 });
  }

  try {
    const pool = getConnection();
    let sql = "";
    let params = [];

    if (category === "decoration") {
      sql =
        "INSERT INTO decoration (decoration_name, decoration_image) VALUES (?, ?)";
      params = [data.name, data.image];
    } else if (category === "flower") {
      sql = "INSERT INTO flower (flower_name) VALUES (?)";
      params = [data.name];
    } else if (category === "flower_color") {
      sql =
        "INSERT INTO flower_color (flower_id, color_name, flower_image, flower_price) VALUES (?, ?, ?, ?)";
      params = [data.flowerId, data.colorName, data.image, data.price];
    } else if (category === "ribbon") {
      sql = "INSERT INTO ribbon (ribbon_name, ribbon_image) VALUES (?, ?)";
      params = [data.name, data.image];
    } else if (category === "wrap_style") {
      sql =
        "INSERT INTO wrap_style (category_id, size_id, wrap_image, wrap_price) VALUES (?, ?, ?, ?)";
      params = [data.categoryId, data.sizeId, data.image, data.price];
    } else {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    // Tambahkan Logging
    console.log("Executing SQL:", sql);
    console.log("With Params:", params);

    const [result] = await pool.execute(sql, params);
    return NextResponse.json({ message: "Data berhasil ditambahkan!", result });
  } catch (error) {
    console.error("Database Error:", error.message); // Tampilkan pesan error yang lebih spesifik
    return NextResponse.json(
      { error: `Gagal menambahkan data: ${error.message}` },
      { status: 500 }
    );
  }
}
