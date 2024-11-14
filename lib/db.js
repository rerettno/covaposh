import mysql from "mysql2/promise";

// Membuat pool dengan beberapa connection agar bisa di-reuse
const pool = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  waitForConnections: true,
  connectionLimit: 10, // Tentukan jumlah koneksi yang bisa dibuat
  queueLimit: 0,
});

export const getConnection = () => {
  return pool;
};
