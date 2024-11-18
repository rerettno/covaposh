import { getConnection } from "../../../../lib/db.js";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const flowerId = searchParams.get("flower_id");

  try {
    const pool = getConnection();
    let sql = "";
    let items = [];

    if (type === "flower") {
      sql = `SELECT flower_id, flower_name FROM flower`;
      const [rows] = await pool.query(sql);
      items = rows.map((row) => ({
        flower_id: row.flower_id,
        flower_name: row.flower_name,
      }));
    } else if (type === "flower_color" && flowerId) {
      sql = `
        SELECT color_id, color_name, flower_image, flower_price 
        FROM flower_color 
        WHERE flower_id = ?
      `;
      const [rows] = await pool.query(sql, [flowerId]);
      items = rows.map((row) => ({
        color_id: row.color_id,
        color_name: row.color_name,
        flower_image: row.flower_image
          ? `data:image/jpeg;base64,${row.flower_image.toString("base64")}`
          : null,
        flower_price: row.flower_price,
      }));
    } else if (type === "ribbon") {
      sql = `SELECT ribbon_id, ribbon_name, ribbon_image FROM ribbon`;
      const [rows] = await pool.query(sql);
      items = rows.map((row) => ({
        ribbon_id: row.ribbon_id,
        ribbon_name: row.ribbon_name,
        ribbon_image: row.ribbon_image
          ? `data:image/jpeg;base64,${row.ribbon_image.toString("base64")}`
          : null,
      }));
    } else if (type === "decoration") {
      sql = `SELECT decoration_id, decoration_name, decoration_image FROM decoration`;
      const [rows] = await pool.query(sql);
      items = rows.map((row) => ({
        decoration_id: row.decoration_id,
        decoration_name: row.decoration_name,
        decoration_image: row.decoration_image
          ? `data:image/jpeg;base64,${row.decoration_image.toString("base64")}`
          : null,
      }));
    } else {
      throw new Error("Invalid type or missing parameters.");
    }

    return NextResponse.json(items);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
