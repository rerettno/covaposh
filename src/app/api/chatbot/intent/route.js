import { findMatch } from "src/utils/matchUtils";

findMatch;

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message || message.trim() === "") {
      return new Response(
        JSON.stringify({ reply: "Pesan tidak boleh kosong." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const lowerMessage = message.toLowerCase();

    // Deteksi perintah utama
    if (lowerMessage.startsWith("/rekomendasi")) {
      return new Response(
        JSON.stringify({
          reply:
            "Baik, Anda ingin saya merekomendasikan apa? Silakan sebutkan kategori, ukuran, atau deskripsi produk.",
          nextStep: "rekomendasi",
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    if (lowerMessage.startsWith("/pemesanan")) {
      return new Response(
        JSON.stringify({
          reply: `Pilih salah satu opsi pemesanan:
1. Pesan produk katalog
2. Pesan kustom
3. Rakit sendiri (custom bouquet)`,
          nextStep: "pemesanan",
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    if (lowerMessage.startsWith("/informasi")) {
      return new Response(
        JSON.stringify({
          reply:
            "Toko kami buka setiap hari pukul 09.00 - 21.00. Lokasi: Jalan Raya Contoh No. 123. Hubungi kami di 0812-3456-7890.",
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // Fallback jika perintah tidak dikenali
    return new Response(
      JSON.stringify({
        reply:
          "Maaf, saya tidak mengenali perintah tersebut. Silakan ketik salah satu:\n/rekomendasi\n/pemesanan\n/informasi",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in Intent API:", error);
    return new Response(
      JSON.stringify({ error: "Terjadi kesalahan pada server." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
