"use client";

import { toPng } from "html-to-image";

export default function KalkulasiElement({
  selectedWrap,
  selectedFlowers,
  selectedRibbon,
  selectedDecoration,
  previewRef, // Referensi dari komponen PreviewElement
}) {
  const waPhoneNumber = "6285716261499"; // Nomor WhatsApp

  // Fungsi untuk memformat harga ke format Rp
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  // Hitung total harga dari semua item yang dipilih
  const calculateTotalPrice = () => {
    let total = 0;
    total += parseFloat(selectedWrap?.wrap_price) || 0;
    selectedFlowers.forEach((flower) => {
      total += parseFloat(flower.flower_price) || 0;
    });
    total += parseFloat(selectedRibbon?.ribbon_price) || 0;
    total += parseFloat(selectedDecoration?.decoration_price) || 0;
    return total;
  };

  const handleSendToWhatsApp = () => {
    const totalPrice = calculateTotalPrice();
    const message = `
Halo Kak, saya ingin melakukan pemesanan dengan detail berikut:
    
*Detail Kustomisasi:*

- *Wrap*: ${selectedWrap?.wrap_name || "Tidak dipilih"}
  ${
    selectedWrap
      ? `(Harga: ${formatCurrency(selectedWrap.wrap_price)}, Kategori: ${
          selectedWrap.category_name || "Tidak diketahui"
        }, Ukuran: ${selectedWrap.size_name || "Tidak diketahui"})`
      : ""
  }
  
- *Flowers*: ${
      selectedFlowers.length > 0
        ? selectedFlowers
            .map(
              (f, index) =>
                `\n  ${index + 1}. ${f.color_name} (${formatCurrency(
                  f.flower_price
                )})`
            )
            .join("")
        : "Tidak dipilih"
    }
  
- *Ribbon*: ${selectedRibbon?.ribbon_name || "Tidak dipilih"}
  ${selectedRibbon ? "" : ""}
  
- *Decoration*: ${selectedDecoration?.decoration_name || "Tidak dipilih"}
  ${selectedDecoration ? "" : ""}
  
- *Total Harga*: ${formatCurrency(totalPrice)}

Mohon konfirmasi untuk melanjutkan pesanan. Terima kasih! 😊
`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${waPhoneNumber}?text=${encodedMessage}`;

    window.open(whatsappURL, "_blank");
  };

  const handleSendToChatbot = () => {
    const totalPrice = calculateTotalPrice();

    const customProduct = {
      product_name: "Custom Bouquet",
      price: totalPrice,
      description: `
- Wrap: ${selectedWrap?.wrap_name || "Tidak dipilih"}
- Flowers: ${
        selectedFlowers.length > 0
          ? selectedFlowers.map((f) => f.color_name).join(", ")
          : "Tidak dipilih"
      }
- Ribbon: ${selectedRibbon?.ribbon_name || "Tidak dipilih"}
- Decoration: ${selectedDecoration?.decoration_name || "Tidak dipilih"}
    `,
      product_image: null,
      category_name: selectedWrap?.category_name || "Custom",
      size_name: selectedWrap?.size_name || "-",
    };

    // Simpan data ke localStorage
    localStorage.setItem("customProduct", JSON.stringify(customProduct));

    // Redirect ke chatbot
    window.location.href = "/chatbot?from=customize";
  };

  return (
    <div className="w-full text-center sm:text-left mt-6">
      <div className="text-left mb-4 space-y-2 bullet">
        {selectedWrap && (
          <p className="text-black/70">
            Wrap Style:{" "}
            <span className="font-medium">{selectedWrap.wrap_name}</span> -{" "}
            {formatCurrency(selectedWrap.wrap_price)} <br />
            <strong>Kategori:</strong> {selectedWrap.category_name || "Unknown"}
            , Ukuran:{" "}
            <span className="font-medium">{selectedWrap.size_name}</span>
          </p>
        )}

        {selectedFlowers.length > 0 && (
          <div>
            <p className="text-black/70 font-medium">Bunga yang Dipilih:</p>
            <ul className="list-disc list-inside text-black/70">
              {selectedFlowers.map((flower, index) => (
                <li key={index}>
                  Item {index + 1}:{" "}
                  <span className="font-medium">{flower.color_name}</span> -{" "}
                  {formatCurrency(flower.flower_price)}
                </li>
              ))}
            </ul>
          </div>
        )}

        {selectedRibbon && (
          <p className="text-black/70">
            Ribbon:{" "}
            <span className="font-medium">{selectedRibbon.ribbon_name}</span> -{" "}
            Free
          </p>
        )}
        {selectedDecoration && (
          <p className="text-black/70">
            Decoration:{" "}
            <span className="font-medium">
              {selectedDecoration.decoration_name}
            </span>{" "}
            - Free
          </p>
        )}
      </div>
      <p className="text-2xl font-bold text-indigo-600">
        Total Harga: {formatCurrency(calculateTotalPrice())}
      </p>

      {/* Tombol Kirim ke WhatsApp */}
      <button
        // onClick={handleSendToWhatsApp}
        onClick={handleSendToChatbot}
        className="bg-green-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-green-600"
      >
        Lanjutkan Pemesanan
      </button>
    </div>
  );
}
