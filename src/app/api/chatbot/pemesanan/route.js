import { getConnection } from "../../../../../lib/db";

let tempOrder = {}; // Untuk menyimpan sementara data pesanan pengguna

export async function POST(req) {
  try {
    const {
      message,
      currentStep,
      product,
      displayedProducts = [],
    } = await req.json();

    if (!message || typeof message !== "string" || message.trim() === "") {
      return new Response(
        JSON.stringify({ error: "Pesan tidak boleh kosong." }),
        { status: 400 }
      );
    }

    const db = await getConnection();
    const keywords = message.toLowerCase();
    const waPhoneNumber = "6285716261499"; // Nomor WhatsApp tujuan

    // Pilihan awal pemesanan
    if (currentStep === "pemesanan") {
      if (keywords === "1") {
        return new Response(
          JSON.stringify({
            reply:
              "Silakan ketik nama produk yang ingin Anda pesan atau ketik /catalog untuk melihat katalog.",
            currentStep: "pesan_produk",
          }),
          { status: 200 }
        );
      }
      if (keywords === "2") {
        return new Response(
          JSON.stringify({
            reply: `Silakan isi format berikut untuk membuat pesanan kustom:
1. Jenis Buket (contoh: bunga/snack/uang):
2. Budget:
3. Request tambahan (opsional):`,
            currentStep: "pesan_kustom",
          }),
          { status: 200 }
        );
      }
      if (keywords === "3") {
        return new Response(
          JSON.stringify({
            reply: `Anda diarahkan ke halaman customize. Setelah selesai merakit, lanjutkan proses pesanan di sini.`,
            redirectTo: "/catalog?category=Custom%20Bouquet&from=customize",
          }),
          { status: 200 }
        );
      }
    }

    // Pencarian produk
    if (currentStep === "pesan_produk") {
      if (keywords === "/catalog") {
        return new Response(
          JSON.stringify({
            reply: `Anda diarahkan ke halaman katalog. Silakan pilih produk yang diinginkan dan klik tombol "Order Sekarang" untuk kembali ke chatbot.`,
            redirectTo: "/catalog",
          }),
          { status: 200 }
        );
      }

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
        WHERE LOWER(p.product_name) LIKE ?;
      `;
      const [rows] = await db.query(query, [`%${keywords}%`]);

      if (rows.length > 0) {
        const foundProduct = {
          product_id: rows[0].product_id,
          product_name: rows[0].product_name,
          price: rows[0].price,
          description: rows[0].description,
          product_image: rows[0].product_image
            ? `data:image/jpeg;base64,${rows[0].product_image.toString(
                "base64"
              )}`
            : "/images/placeholder.jpg",
          category_name: rows[0].category_name,
          size_name: rows[0].size_name,
        };

        return new Response(
          JSON.stringify({
            reply: `Apakah ini produk yang Anda maksud?`,
            product: foundProduct, // Simpan detail produk
            currentStep: "pesan_produk", // Tetap di 'pesan_produk' untuk memungkinkan pencarian baru
          }),
          { status: 200 }
        );
      }
      // Penanganan konfirmasi produk dan memulai pesanan
      if (currentStep === "pesan_produk" && keywords === "/pesan") {
        if (!product) {
          return new Response(
            JSON.stringify({
              reply:
                "Produk belum dipilih. Silakan pilih produk terlebih dahulu sebelum mengetik /pesan.",
            }),
            { status: 200 }
          );
        }

        tempOrder = { ...product }; // Simpan produk ke tempOrder
        tempOrder.step = "input_name"; // Set flag ke langkah berikutnya
        return new Response(
          JSON.stringify({
            reply: "Silakan masukkan nama penerima:",
          }),
          { status: 200 }
        );
      }

      // Masukkan nama penerima
      if (tempOrder.step === "input_name") {
        tempOrder.recipient_name = message;
        tempOrder.step = "input_phone";
        return new Response(
          JSON.stringify({
            reply: "Masukkan nomor WA penerima:",
          }),
          { status: 200 }
        );
      }

      // Masukkan nomor WA
      if (tempOrder.step === "input_phone") {
        tempOrder.phone_number = message;
        tempOrder.step = "input_delivery";
        return new Response(
          JSON.stringify({
            reply: "Jenis pengiriman (ketik 'delivery' atau 'pickup'):",
          }),
          { status: 200 }
        );
      }

      // Masukkan jenis pengiriman
      if (tempOrder.step === "input_delivery") {
        tempOrder.delivery_type =
          keywords === "delivery" ? "delivery" : "pickup";

        if (tempOrder.delivery_type === "delivery") {
          tempOrder.step = "input_address";
          return new Response(
            JSON.stringify({
              reply: "Masukkan alamat pengiriman:",
            }),
            { status: 200 }
          );
        }

        tempOrder.delivery_address = null;
        tempOrder.step = "input_card";
        return new Response(
          JSON.stringify({
            reply: "Masukkan kartu ucapan (opsional):",
          }),
          { status: 200 }
        );
      }

      // Masukkan alamat pengiriman
      if (tempOrder.step === "input_address") {
        tempOrder.delivery_address = message;
        tempOrder.step = "input_card";
        return new Response(
          JSON.stringify({
            reply: "Masukkan kartu ucapan (opsional):",
          }),
          { status: 200 }
        );
      }

      // Masukkan kartu ucapan
      if (tempOrder.step === "input_card") {
        tempOrder.greeting_card = message || "Tidak ada kartu ucapan";
        tempOrder.step = "input_request";
        return new Response(
          JSON.stringify({
            reply: "Masukkan request tambahan (opsional):",
          }),
          { status: 200 }
        );
      }

      // Masukkan request tambahan
      if (tempOrder.step === "input_request") {
        tempOrder.request = message || "Tidak ada request tambahan";
        tempOrder.step = "confirm_order";
        const orderDetails = `
Detail Pesanan:
- Nama Penerima: ${tempOrder.recipient_name}
- Produk: ${tempOrder.product_name}
- Harga: Rp ${tempOrder.price}
- Jenis Pengiriman: ${tempOrder.delivery_type}
- Alamat: ${tempOrder.delivery_address || "Tidak ada"}
- Kartu Ucapan: ${tempOrder.greeting_card}
- Request Tambahan: ${tempOrder.request}
      `.trim();

        return new Response(
          JSON.stringify({
            reply: `Berikut detail pesanan Anda:\n${orderDetails}\n\nKetik "edit" untuk mengubah detail atau "konfirmasi" untuk melanjutkan ke pembayaran.`,
          }),
          { status: 200 }
        );
      }

      // Konfirmasi atau Edit Pesanan
      if (tempOrder.step === "confirm_order") {
        if (keywords === "edit") {
          tempOrder.step = "input_name"; // Kembali ke input nama
          return new Response(
            JSON.stringify({
              reply: "Silakan masukkan nama penerima:",
            }),
            { status: 200 }
          );
        }

        if (keywords === "konfirmasi") {
          // Simpan ke database
          const query = `
        INSERT INTO orders (product_id, recipient_name, phone_number, delivery_type, delivery_address, greeting_card, request, price)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?);
      `;
          const values = [
            tempOrder.product_id,
            tempOrder.recipient_name,
            tempOrder.phone_number,
            tempOrder.delivery_type,
            tempOrder.delivery_address,
            tempOrder.greeting_card,
            tempOrder.request,
            tempOrder.price,
          ];

          await db.query(query, values);

          //           const waMessage = `
          // Pesanan Anda telah berhasil dikonfirmasi!
          // Detail Pesanan:
          // - Nama Penerima: ${tempOrder.recipient_name}
          // - Produk: ${tempOrder.product_name}
          // - Harga: Rp ${tempOrder.price}
          // - Jenis Pengiriman: ${tempOrder.delivery_type}
          // - Alamat: ${tempOrder.delivery_address || "Tidak ada"}
          // - Kartu Ucapan: ${tempOrder.greeting_card}
          // - Request Tambahan: ${tempOrder.request}.
          //         `.trim();

          // const whatsappURL = `https://wa.me/${waPhoneNumber}?text=${waMessage}`;
          tempOrder.step = "pembayaran";
          return new Response(
            JSON.stringify({
              reply: `Pesanan Anda berhasil dibuat! Ketik /pembayaran untuk melanjutkan ke pembayaran.`,
            }),
            { status: 200 }
          );
        }
      }
      // Penanganan keyword "/pembayaran"
      if (tempOrder.step === "pembayaran" && keywords === "/pembayaran") {
        const waMessage = encodeURIComponent(
          `
Pesanan Anda telah berhasil dikonfirmasi!
Detail Pesanan:
- Nama Penerima: ${tempOrder.recipient_name}
- Produk: ${tempOrder.product_name}
- Harga: Rp ${tempOrder.price}
- Jenis Pengiriman: ${tempOrder.delivery_type}
- Alamat: ${tempOrder.delivery_address || "Tidak ada"}
- Kartu Ucapan: ${tempOrder.greeting_card}
- Request Tambahan: ${tempOrder.request}.
          `.trim()
        );

        const whatsappURL = `https://wa.me/${waPhoneNumber}?text=${waMessage}`;
        tempOrder = {}; // Reset tempOrder setelah pembayaran
        return new Response(
          JSON.stringify({
            reply: "Anda diarahkan ke halaman pembayaran.",
            redirectTo: whatsappURL, // Redirect pengguna ke WhatsApp
          }),
          { status: 200 }
        );
      } else {
        return new Response(
          JSON.stringify({
            reply:
              "Maaf, produk tidak ditemukan. Silakan coba lagi dengan nama produk lain.",
          }),
          { status: 200 }
        );
      }
    }

    return new Response(
      JSON.stringify({
        reply: "Input tidak dikenali. Silakan coba lagi.",
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
