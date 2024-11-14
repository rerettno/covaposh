// app/customize/KalkulasiElement.js
"use client";

import { useEffect, useState } from "react";

export default function KalkulasiElement({ selectedWrap, selectedFlowers }) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [wrapPrice, setWrapPrice] = useState(0);
  const [flowerPrices, setFlowerPrices] = useState([]);

  useEffect(() => {
    // Mengambil harga wrap jika ada
    const wrapCost = parseFloat(selectedWrap?.wrap_price || 0);
    setWrapPrice(wrapCost);

    // Mengambil harga setiap bunga
    const flowerCosts = selectedFlowers.map((flower) => ({
      name: flower.color_name,
      price: parseFloat(flower.flower_price || 0),
    }));
    setFlowerPrices(flowerCosts);

    // Menghitung total harga dari wrap dan bunga
    const totalFlowerPrice = flowerCosts.reduce(
      (sum, flower) => sum + flower.price,
      0
    );
    const total = wrapCost + totalFlowerPrice;
    setTotalPrice(total);
  }, [selectedWrap, selectedFlowers]);

  return (
    <div className="w-full max-w-md mt-8">
      <h3 className="text-lg font-semibold mb-4">Rincian Harga</h3>

      {/* Rincian Harga Wrap Style */}
      <div className="mb-4">
        <h4 className="text-md font-medium">Wrap Style</h4>
        {selectedWrap ? (
          <p>
            {selectedWrap.wrap_name}: {wrapPrice.toLocaleString()} IDR
          </p>
        ) : (
          <p>Belum ada wrap style yang dipilih</p>
        )}
      </div>

      {/* Rincian Harga Bunga */}
      <div className="mb-4">
        <h4 className="text-md font-medium">Bunga</h4>
        {flowerPrices.length > 0 ? (
          flowerPrices.map((flower, index) => (
            <p key={index}>
              {flower.name}: {flower.price.toLocaleString()} IDR
            </p>
          ))
        ) : (
          <p>Belum ada bunga yang dipilih</p>
        )}
      </div>

      {/* Total Keseluruhan */}
      <div className="mt-6 border-t pt-4">
        <h4 className="text-lg font-bold">Total Harga</h4>
        <p className="text-xl font-bold">{totalPrice.toLocaleString()} IDR</p>
      </div>
    </div>
  );
}
