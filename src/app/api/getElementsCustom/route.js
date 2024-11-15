// /app/api/elements/route.js
import { getConnection } from "../../../../lib/db.js";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  // Validasi type yang diterima
  const validTypes = ["flower", "ribbon", "decoration"];
  if (!type || !validTypes.includes(type)) {
    return NextResponse.json(
      { error: "Invalid type parameter" },
      { status: 400 }
    );
  }

  try {
    const pool = getConnection();
    let sql = "";
    let items = [];

    // Tentukan SQL query berdasarkan type
    if (type === "flower") {
      sql = `
        SELECT f.flower_id, f.flower_name, fc.color_id, fc.color_name, fc.flower_image, fc.flower_price 
        FROM flower f
        JOIN flower_color fc ON f.flower_id = fc.flower_id
      `;
    } else if (type === "ribbon") {
      sql = `
        SELECT ribbon_id, ribbon_name, ribbon_image 
        FROM ribbon
      `;
    } else if (type === "decoration") {
      sql = `
        SELECT decoration_id, decoration_name, decoration_image 
        FROM decoration
      `;
    }

    // Jalankan query
    const [rows] = await pool.query(sql);

    // Ubah buffer gambar menjadi base64 untuk ditampilkan di front-end
    if (type === "flower") {
      items = rows.map((row) => ({
        flower_id: row.flower_id,
        flower_name: row.flower_name,
        color_id: row.color_id,
        color_name: row.color_name,
        flower_image: row.flower_image
          ? `data:image/jpeg;base64,${row.flower_image.toString("base64")}`
          : null,
        flower_price: row.flower_price,
      }));
    } else if (type === "ribbon") {
      items = rows.map((row) => ({
        ribbon_id: row.ribbon_id,
        ribbon_name: row.ribbon_name,
        ribbon_image: row.ribbon_image
          ? `data:image/jpeg;base64,${row.ribbon_image.toString("base64")}`
          : null,
      }));
    } else if (type === "decoration") {
      items = rows.map((row) => ({
        decoration_id: row.decoration_id,
        decoration_name: row.decoration_name,
        decoration_image: row.decoration_image
          ? `data:image/jpeg;base64,${row.decoration_image.toString("base64")}`
          : null,
      }));
    }

    return NextResponse.json(items);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
