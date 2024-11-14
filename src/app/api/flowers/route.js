// /api/flowers/route.js
import { getConnection } from "../../../../lib/db.js";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const pool = getConnection();
    const [flowerRows] = await pool.query("SELECT * FROM flower");
    const [colorRows] = await pool.query("SELECT * FROM flower_color");

    const flowers = flowerRows.map((flower) => ({
      ...flower,
      colors: colorRows
        .filter((color) => color.flower_id === flower.flower_id)
        .map((color) => ({
          ...color,
          flower_image: color.flower_image
            ? `data:image/jpeg;base64,${color.flower_image.toString("base64")}`
            : null,
        })),
    }));

    return NextResponse.json(flowers);
  } catch (error) {
    console.error("Error fetching flowers:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
