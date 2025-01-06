import { findMatch } from "src/utils/matchUtils";
import { getConnection } from "../../../../../lib/db";
findMatch;

// Sinonim kategori, ukuran, dan harga
const categorySynonyms = {
  "artificial bouquet": ["bunga palsu", "bunga"],
  "money bouquet": ["uang", "duit", "koin"],
  "hand bouquet": ["nikahan", "pernikahan", "wedding", "nikah", "buket tangan"],
  "graduation bouquet": ["wisuda", "kelulusan", "lulus", "boneka"],
  "balloon bouquet": ["balon", "nama"],
  "custom bouquet": ["custom", "kustom"],
};

const sizeSynonyms = {
  small: ["kecil", "sedikit", "mini"],
  medium: ["sedang", "tengah tengah"],
  large: ["besar", "banyak", "jumbo", "raksasa"],
};

const priceSynonyms = {
  cheap: ["murah", "terjangkau", "harga rendah"],
  expensive: ["mahal", "harga tinggi"],
};

export async function POST(req) {
  try {
    const { message, displayedProducts = [] } = await req.json();

    if (!message || typeof message !== "string" || message.trim() === "") {
      return new Response(
        JSON.stringify({ error: "Pesan tidak boleh kosong." }),
        { status: 400 }
      );
    }

    const db = await getConnection();
    const keywords = message.toLowerCase();

    // // Tangani respons langsung (ya/tidak/pesan)
    if (["/tidak"].includes(keywords)) {
      if (keywords === "/tidak") {
        return new Response(
          JSON.stringify({
            reply:
              "Terima kasih telah menggunakan layanan kami! Anda kembali ke menu utama. Pilih: /rekomendasi, /pemesanan, atau /informasi.",
            nextStep: "menu_utama",
          }),
          { status: 200 }
        );
      }
    }

    // Pencocokan kategori, ukuran, dan harga
    const matchedCategory = findMatch(keywords, categorySynonyms);
    const matchedSize = findMatch(keywords, sizeSynonyms);
    const budgetMatch = keywords.match(/(\d+)/); // Cari angka untuk budget
    const budget = budgetMatch ? parseInt(budgetMatch[1], 10) : null;
    const priceType = findMatch(keywords, priceSynonyms) || "cheap";

    const keywordMatches = keywords
      .split(" ")
      .filter((word) => word.trim().length > 2)
      .slice(0, 5);
    // Jika tidak ada kategori dan ukuran yang dikenali
    if (
      !matchedCategory &&
      !matchedSize &&
      !budget &&
      !priceType &&
      keywordMatches.length === 0
    ) {
      return new Response(
        JSON.stringify({
          reply:
            "Maaf, saya tidak menemukan produk yang sesuai dengan pencarian Anda. Silakan coba lagi dengan kata kunci lain.",
        }),
        { status: 200 }
      );
    }

    // Query dengan filter kategori, ukuran, dan harga
    const query = `
      SELECT
        p.product_id,
        p.product_name,
        p.price,
        p.description,
        p.product_image,
        c.category_name,
        s.size_name
      FROM products p
      JOIN categories c ON p.category_id = c.category_id
      JOIN bucket_size s ON p.size_id = s.size_id
      WHERE 1=1
      ${matchedCategory ? "AND c.category_name = ?" : ""}
      ${matchedSize ? "AND s.size_name = ?" : ""}
      ${budget ? "AND p.price <= ?" : ""}
      ${
        matchedCategory || matchedSize || budget
          ? "" // Jangan gunakan keywordMatches jika kategori/ukuran ditemukan
          : keywordMatches.length > 0
          ? `AND (${keywordMatches
              .map(() => "(p.product_name LIKE ? OR p.description LIKE ?)")
              .join(" OR ")})`
          : ""
      }
      ORDER BY ${priceType === "expensive" ? "p.price DESC" : "p.price ASC"};
    `;

    const params = [];
    if (matchedCategory) params.push(matchedCategory);
    if (matchedSize) params.push(matchedSize);
    if (budget) params.push(budget);
    if (keywordMatches.length > 0) {
      keywordMatches.forEach((match) => {
        params.push(`%${match}%`);
        params.push(`%${match}%`);
      });
    }

    const [rows] = await db.query(query, params);

    // Reset produk jika semua produk sudah ditampilkan
    const remainingProducts = rows.filter(
      (row) => !displayedProducts.includes(row.product_id)
    );

    let productsToDisplay = remainingProducts;

    // Jika produk habis, reset displayedProducts dan tampilkan produk dari awal
    if (remainingProducts.length === 0) {
      productsToDisplay = rows;
    }

    // Pilih 5 produk secara acak
    const selectedProducts = rows.sort(() => 0.5 - Math.random()).slice(0, 5);
    const products = selectedProducts.map((row) => ({
      product_id: row.product_id,
      product_name: row.product_name,
      price: row.price,
      description: row.description,
      product_image: row.product_image
        ? `data:image/jpeg;base64,${row.product_image.toString("base64")}`
        : "/images/placeholder.jpg",
      category_name: row.category_name,
      size_name: row.size_name,
    }));

    // if (products.length === 0) {
    //   return new Response(
    //     JSON.stringify({
    //       reply: "Maaf, produk yang anda cari tidak ditemukan.",
    //       products: [],
    //     }),
    //     { status: 200 }
    //   );
    // }

    return new Response(
      JSON.stringify({
        reply: products.length
          ? "Berikut produk yang kami temukan:"
          : "Maaf, saya tidak menemukan produk yang sesuai dengan pencarian Anda. Silakan coba lagi dengan kata kunci lain.",
        products,
        displayedProducts: [
          ...displayedProducts,
          ...products.map((p) => p.product_id),
        ],
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error.message);
    return new Response(
      JSON.stringify({ error: "Terjadi kesalahan pada server." }),
      { status: 500 }
    );
  }
}
