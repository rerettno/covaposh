import { getConnection } from "../../../../lib/db.js";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get("category_id");
  const sizeId = searchParams.get("size_id");

  try {
    const pool = getConnection();
    let sql;
    const params = [];

    if (categoryId && sizeId) {
      sql = `
        SELECT wrap_id, wrap_image, wrap_price
        FROM wrap_style
        WHERE category_id = ? AND size_id = ?
      `;
      params.push(categoryId, sizeId);
    } else {
      sql = `
        SELECT wrap_id, wrap_image, wrap_price
        FROM wrap_style
      `;
    }

    const [rows] = await pool.query(sql, params);

    console.log("Fetched Wrap Styles:", rows); // Debug data dari database

    const wrapStyles = rows.map((row) => ({
      ...row,
      wrap_image: row.wrap_image
        ? `data:image/jpeg;base64,${row.wrap_image.toString("base64")}`
        : null,
    }));

    return NextResponse.json(wrapStyles);
  } catch (error) {
    console.error("Error fetching wrap styles:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
