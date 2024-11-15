import { NextResponse } from "next/server";
import { getConnection } from "../../../../lib/db";

export async function GET() {
  try {
    const pool = getConnection();
    const sql = "SELECT flower_id, flower_name FROM flower";
    const [rows] = await pool.query(sql);

    return NextResponse.json(rows); // Mengembalikan daftar bunga
  } catch (error) {
    console.error("Error fetching flowers:", error);
    return NextResponse.json(
      { error: "Failed to fetch flowers" },
      { status: 500 }
    );
  }
}
