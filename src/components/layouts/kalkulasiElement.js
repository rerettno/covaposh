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

  const handleSendToWhatsApp = async () => {
    // if (previewRef.current) {
    //   try {
    // Generate image from previewRef
    //const dataUrl = await toPng(previewRef.current, { quality: 1 });

    // Format pesan WhatsApp
    const totalPrice = calculateTotalPrice();
    const message = `
          Berikut detail kustomisasi Anda:
          - Wrap: ${selectedWrap?.wrap_name || "Tidak dipilih"}
          - Flowers: ${
            selectedFlowers.map((f) => f.color_name).join(", ") ||
            "Tidak dipilih"
          }
          - Ribbon: ${selectedRibbon?.ribbon_name || "Tidak dipilih"}
          - Decoration: ${
            selectedDecoration?.decoration_name || "Tidak dipilih"
          }
          - Total Harga: ${formatCurrency(totalPrice)}
        `;

    const encodedMessage = encodeURIComponent(message);
    //const encodedImage = encodeURIComponent(dataUrl);

    // WhatsApp URL
    const whatsappURL = `https://wa.me/${waPhoneNumber}?text=${encodedMessage}`;

    // Buka WhatsApp di tab baru
    window.open(whatsappURL, "_blank");
  };
  // catch (error) {
  //       console.error("Error generating image or sending to WhatsApp:", error);
  //     }
  //   }
  // };

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
                  Bunga {index + 1}:{" "}
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
        onClick={handleSendToWhatsApp}
        className="bg-green-500 text-white py-2 px-4 rounded-md mt-4"
      >
        Kirim ke WhatsApp
      </button>
    </div>
  );
}
