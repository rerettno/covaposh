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
// import mysql from "mysql2/promise";

// // Membuat koneksi pool ke database
// const pool = mysql.createPool({
//   host: process.env.DATABASE_HOST, // Ambil host dari file .env
//   port: process.env.DATABASE_PORT, // Ambil port dari file .env
//   user: process.env.DATABASE_USER, // Ambil user dari file .env
//   password: process.env.DATABASE_PASSWORD, // Ambil password dari file .env
//   database: process.env.DATABASE_NAME, // Ambil nama database dari file .env
//   waitForConnections: true,
//   connectionLimit: 10, // Maksimal koneksi yang bisa digunakan bersamaan
//   queueLimit: 0,
// });

// export const getConnection = () => {
//   return pool; // Fungsi ini akan mengembalikan pool koneksi
// };
