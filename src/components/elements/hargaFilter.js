"use client";
import { useState } from "react";

export default function HargaFilter({ onChange }) {
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");

  // Fungsi untuk menerapkan filter harga
  const applyPriceFilter = () => {
    onChange({
      priceFrom: priceFrom ? parseFloat(priceFrom) : null,
      priceTo: priceTo ? parseFloat(priceTo) : null,
    });
  };

  return (
    <div className="px-2 pt-4">
      <div className="flex items-center gap-1">
        <span className="text-sm text-black/50">Rp.</span>
        <label htmlFor="FilterPriceFrom" className="flex items-center">
          <input
            type="number"
            id="FilterPriceFrom"
            placeholder="From"
            value={priceFrom}
            onChange={(e) => setPriceFrom(e.target.value)}
            className="w-full border-blue  px-2 py-1  shadow-sm text-xs rounded-button"
          />
        </label>
        <span className="text-sm text-black/50">Rp.</span>
        <label htmlFor="FilterPriceTo" className="flex items-center">
          <input
            type="number"
            id="FilterPriceTo"
            placeholder="To"
            value={priceTo}
            onChange={(e) => setPriceTo(e.target.value)}
            className="w-full border-blue px-2 py-1 shadow-sm text-xs rounded-button"
          />
        </label>
      </div>

      <div className="flex items-center justify-between mt-4">
        <span className="text-xs text-darkBlue">
          *The highest price is 600K
        </span>
        <button
          type="button"
          onClick={applyPriceFilter}
          className="text-sm text-black underline underline-offset-4"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
