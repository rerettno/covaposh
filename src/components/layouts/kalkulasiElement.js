"use client";

export default function KalkulasiElement({
  selectedWrap,
  selectedFlowers,
  selectedRibbon,
  selectedDecoration,
}) {
  // Fungsi untuk menghitung harga total
  const calculateTotalPrice = () => {
    let total = 0;

    // Tambahkan harga wrap style jika ada
    total += parseFloat(selectedWrap?.wrap_price) || 0;

    // Tambahkan harga setiap bunga yang dipilih
    selectedFlowers.forEach((flower) => {
      total += parseFloat(flower.flower_price) || 0;
    });

    // Tambahkan harga ribbon jika ada
    total += parseFloat(selectedRibbon?.ribbon_price) || 0;

    // Tambahkan harga decoration jika ada
    total += parseFloat(selectedDecoration?.decoration_price) || 0;

    return total.toFixed(2); // Menampilkan hasil sebagai angka desimal
  };

  return (
    <div className="w-full text-center mt-6">
      <h3 className="text-lg font-semibold mb-4">Kalkulasi Harga</h3>

      {/* Rincian harga untuk setiap elemen yang dipilih */}
      <div className="text-left mb-4">
        {selectedWrap && (
          <p>
            Wrap Style: {selectedWrap.wrap_name} - {selectedWrap.wrap_price} IDR
          </p>
        )}
        {selectedFlowers.map((flower, index) => (
          <p key={index}>
            Bunga: {flower.flower_name} - {flower.flower_price} IDR
          </p>
        ))}
        {selectedRibbon && (
          <p>
            Ribbon: {selectedRibbon.ribbon_name} - {selectedRibbon.ribbon_price}{" "}
            IDR
          </p>
        )}
        {selectedDecoration && (
          <p>
            Decoration: {selectedDecoration.decoration_name} -{" "}
            {selectedDecoration.decoration_price} IDR
          </p>
        )}
      </div>

      {/* Total harga keseluruhan */}
      <p className="text-xl font-semibold">
        Total Harga: {calculateTotalPrice()} IDR
      </p>
    </div>
  );
}
