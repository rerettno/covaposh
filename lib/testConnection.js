import { getConnection } from "./db";

async function testConnection() {
  try {
    const connection = await getConnection().getConnection(); // Ambil koneksi
    console.log("Connected to the database!");
    connection.release(); // Tutup koneksi setelah selesai
  } catch (error) {
    console.error("Failed to connect to the database:", error.message);
  }
}

testConnection();
