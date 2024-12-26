"use client";

export default function KalkulasiElement({
  selectedWrap,
  selectedFlowers,
  selectedRibbon,
  selectedDecoration,
}) {
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

  return (
    <div className="w-full text-center sm:text-left mt-6">
      <div className="text-left mb-4 space-y-2">
        {selectedWrap && (
          <p className="text-gray-600">
            Wrap Style:{" "}
            <span className="font-medium">{selectedWrap.wrap_name}</span> -{" "}
            {formatCurrency(selectedWrap.wrap_price)}
          </p>
        )}
        {selectedFlowers.map((flower, index) => (
          <p key={index} className="text-gray-600">
            Bunga: <span className="font-medium">{flower.flower_name}</span> -{" "}
            {formatCurrency(flower.flower_price)}
          </p>
        ))}
        {selectedRibbon && (
          <p className="text-gray-600">
            Ribbon:{" "}
            <span className="font-medium">{selectedRibbon.ribbon_name}</span> -{" "}
            Free
          </p>
        )}
        {selectedDecoration && (
          <p className="text-gray-600">
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
    </div>
  );
}
