"use client";
import { useState } from "react";

export default function SizeFilter({ onChange }) {
  const [selectedSize, setSelectedSize] = useState(null);

  const handleSizeClick = (size) => {
    const newSize = size === selectedSize ? null : size; // Hapus filter jika ukuran sama diklik
    setSelectedSize(newSize);
    onChange(newSize); // Kirim ukuran yang dipilih atau null
  };

  const getButtonClass = (size) =>
    `inline-block px-4 py-2 text-sm font-medium w-full border border-blue ${
      size === selectedSize
        ? "bg-blue text-black"
        : "text-black/50 hover:bg-blue hover:text-black"
    }`;

  return (
    <span className="flex justify-between -space-x-px overflow-hidden border border-blue bg-white shadow-sm w-full">
      <button
        className={getButtonClass("Small")}
        onClick={() => handleSizeClick("Small")}
      >
        Small
      </button>
      <button
        className={getButtonClass("Medium")}
        onClick={() => handleSizeClick("Medium")}
      >
        Medium
      </button>
      <button
        className={getButtonClass("Large")}
        onClick={() => handleSizeClick("Large")}
      >
        Large
      </button>
    </span>
  );
}
