import { getConnection } from "../../../../../lib/db";

let tempOrder = {}; // Untuk menyimpan sementara data pesanan pengguna

export async function POST(req) {
  try {
    const { message, currentStep, product, customProduct, displayedProducts } =
      await req.json();

    if (!message || typeof message !== "string" || message.trim() === "") {
      return new Response(
        JSON.stringify({ error: "Pesan tidak boleh kosong." }),
        { status: 400 }
      );
    }

    const db = await getConnection();
    const keywords = message.toLowerCase();

    // Handle Step: Pilihan Awal Pemesanan
    if (currentStep === "pemesanan") {
      if (keywords === "1") {
        return new Response(
          JSON.stringify({
            reply:
              "Silakan ketik nama produk yang ingin Anda pesan atau ketik /catalog untuk melihat katalog.",
            nextStep: "pesan_produk",
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
            nextStep: "pesan_kustom",
          }),
          { status: 200 }
        );
      }
      if (keywords === "3") {
        return new Response(
          JSON.stringify({
            reply: `Anda diarahkan ke halaman customize.Setelah selesai merakit, lanjutkan proses pesanan di sini.`,
            redirectTo: "/catalog?category=Custom%20Bouquet&from=customize",
          }),
          { status: 200 }
        );
      }
    }

    // Handle "pesan_produk"
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
    WHERE LOWER(p.product_name) LIKE ? ;
  `;
      const [rows] = await db.query(query, [`%${keywords}%`]);

      if (rows.length > 0) {
        const product = {
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
            product,
          }),
          { status: 200 }
        );
      } else {
        return new Response(
          JSON.stringify({
            reply:
              "Maaf, produk tidak ditemukan. Silakan coba lagi dengan nama produk lain atau ketik /catalog untuk melihat katalog.",
          }),
          { status: 200 }
        );
      }
    }

    // Step: Mulai pengisian detail pemesanan
    if (keywords === "/pesan") {
      if (!product) {
        return new Response(
          JSON.stringify({
            reply:
              "Produk belum dipilih. Silakan pilih produk terlebih dahulu.",
          }),
          { status: 200 }
        );
      }

      tempOrder = { product_id: product.product_id }; // Simpan produk ID
      return new Response(
        JSON.stringify({
          reply: "Silakan masukkan nama penerima:",
          currentStep: "nama_penerima",
        }),
        { status: 200 }
      );
    }

    // Step: Nama penerima
    if (currentStep === "nama_penerima") {
      tempOrder.recipient_name = message; // Simpan nama penerima
      return new Response(
        JSON.stringify({
          reply: "Masukkan nomor WA penerima:",
          currentStep: "nomor_wa",
        }),
        { status: 200 }
      );
    }

    // Step: Nomor WA
    if (currentStep === "nomor_wa") {
      tempOrder.phone_number = message; // Simpan nomor WA
      return new Response(
        JSON.stringify({
          reply: "Jenis pengiriman (ketik 'delivery' atau 'pickup'):",
          currentStep: "jenis_pengiriman",
        }),
        { status: 200 }
      );
    }

    // Step: Jenis pengiriman
    if (currentStep === "jenis_pengiriman") {
      const deliveryType = keywords === "delivery" ? "delivery" : "pickup";
      tempOrder.delivery_type = deliveryType;

      if (deliveryType === "delivery") {
        return new Response(
          JSON.stringify({
            reply: "Masukkan alamat pengiriman:",
            currentStep: "alamat_pengiriman",
          }),
          { status: 200 }
        );
      } else {
        tempOrder.delivery_address = null; // Kosongkan alamat jika pickup
        return new Response(
          JSON.stringify({
            reply: "Masukkan kartu ucapan (opsional):",
            currentStep: "kartu_ucapan",
          }),
          { status: 200 }
        );
      }
    }

    // Step: Alamat pengiriman
    if (currentStep === "alamat_pengiriman") {
      tempOrder.delivery_address = message; // Simpan alamat
      return new Response(
        JSON.stringify({
          reply: "Masukkan kartu ucapan (opsional):",
          currentStep: "kartu_ucapan",
        }),
        { status: 200 }
      );
    }

    // Step: Kartu ucapan
    if (currentStep === "kartu_ucapan") {
      tempOrder.greeting_card = message || "Tidak ada kartu ucapan"; // Simpan kartu ucapan
      return new Response(
        JSON.stringify({
          reply: "Masukkan request tambahan (opsional):",
          currentStep: "request_tambahan",
        }),
        { status: 200 }
      );
    }

    // Step: Request tambahan
    if (currentStep === "request_tambahan") {
      tempOrder.request = message || "Tidak ada request tambahan"; // Simpan request tambahan
      tempOrder.price = product.price; // Harga produk

      // Simpan ke database
      const db = await getConnection();
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

      // Reset tempOrder setelah selesai
      tempOrder = {};

      return new Response(
        JSON.stringify({
          reply: `Pesanan Anda berhasil dibuat!\n
Detail:
- Nama Penerima: ${tempOrder.recipient_name}
- Produk: ${product.product_name}
- Harga: Rp ${tempOrder.price}
- Jenis Pengiriman: ${tempOrder.delivery_type}
Silakan lanjutkan pembayaran melalui WhatsApp: https://wa.me/081234567890.`,
          nextStep: "menu_utama",
        }),
        { status: 200 }
      );
    }

    //     // Handle Step: Konfirmasi Produk
    //     if (currentStep === "konfirmasi_produk") {
    //       if (keywords === "ya") {
    //         return new Response(
    //           JSON.stringify({
    //             reply: `Silakan isi detail berikut:
    // 1. Nama penerima:
    // 2. Nomor WA penerima:
    // 3. Jenis pengiriman (delivery/pickup):
    // 4. Alamat pengiriman (jika delivery):
    // 5. Kartu ucapan:
    // 6. Request tambahan (opsional):`,
    //             nextStep: "detail_pemesanan",
    //             product,
    //           }),
    //           { status: 200 }
    //         );
    //       } else {
    //         return new Response(
    //           JSON.stringify({
    //             reply:
    //               "Silakan ketik ulang nama produk atau ketik /katalog untuk melihat katalog.",
    //             nextStep: "pesan_produk",
    //           }),
    //           { status: 200 }
    //         );
    //       }
    //     }

    //     // Handle Step: Pesan Kustom
    //     if (currentStep === "pesan_kustom") {
    //       return new Response(
    //         JSON.stringify({
    //           reply: `Terima kasih! Berikut detail kustom Anda:
    // - Jenis Buket: ${message.split("\n")[0]}
    // - Budget: ${message.split("\n")[1]}
    // - Request: ${message.split("\n")[2] || "Tidak ada request"}

    // Silakan lanjutkan ke detail penerima seperti berikut:
    // 1. Nama penerima:
    // 2. Nomor WA penerima:
    // 3. Jenis pengiriman (delivery/pickup):
    // 4. Alamat pengiriman (jika delivery):
    // 5. Kartu ucapan:
    // 6. Request tambahan (opsional):`,
    //           nextStep: "detail_pemesanan",
    //           customProduct: message,
    //         }),
    //         { status: 200 }
    //       );
    //     }

    //     // Handle Step: Detail Pemesanan
    //     if (currentStep === "detail_pemesanan") {
    //       const details = message.split("\n");
    //       const name = details[0] || "Tidak diisi";
    //       const phone = details[1] || "Tidak diisi";
    //       const deliveryType = details[2]?.toLowerCase() || "pickup";
    //       const address = deliveryType === "delivery" ? details[3] || "" : null;
    //       const card = details[4] || "Tidak ada kartu ucapan";
    //       const request = details[5] || "Tidak ada request";

    //       const price = product?.price || 0;

    //       const query = `
    //         INSERT INTO orders (recipient_name, phone_number, delivery_type, delivery_address, product_id, custom_product, price, greeting_card, request)
    //         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    //       `;
    //       const values = [
    //         name,
    //         phone,
    //         deliveryType,
    //         address,
    //         product?.product_id || null,
    //         customProduct || null,
    //         price,
    //         card,
    //         request,
    //       ];

    //       await db.query(query, values);

    //       return new Response(
    //         JSON.stringify({
    //           reply: `Pesanan Anda berhasil dibuat!\n
    // Detail:
    // - Nama: ${name}\n
    // - Produk: ${product?.product_name || "Kustom"}\n
    // - Harga: Rp ${price}\n
    // - Pengiriman: ${deliveryType}\n
    // Silakan lanjutkan pembayaran melalui WhatsApp: https://wa.me/081234567890.`,
    //           nextStep: "menu_utama",
    //         }),
    //         { status: 200 }
    //       );
    //     }

    // Fallback untuk currentStep

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
