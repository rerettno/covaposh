"use client";
import { useState } from "react";

export default function SearchFilter({ onChange }) {
  const [query, setQuery] = useState("");

  // Panggil fungsi onChange saat input berubah
  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onChange(newQuery); // Kirim nilai pencarian ke Filter
  };

  return (
    <div className="relative mt-4">
      <label htmlFor="Search" className="sr-only">
        Search
      </label>
      <input
        type="text"
        id="Search"
        placeholder="Cari produk..."
        className="w-full border border-blue py-2.5 pe-10 bg-white text-sm"
        value={query}
        onChange={handleInputChange} // Tangani perubahan input
      />
      <span className="absolute inset-y-0 end-0 grid w-12 place-content-center border border-blue">
        <button type="button" className="text-darkBlue hover:text-blue">
          <span className="sr-only">Search</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </span>
    </div>
  );
}
