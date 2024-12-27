"use client"; // Menandakan bahwa ini adalah Client Component
import { useEffect, useState } from "react";
import CardKategori from "../elements/cardKategori";

export default function Kategori() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null); // Untuk menangani error

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Perbaiki endpoint sesuai path API Anda
        const res = await fetch("/api/selectedType/?selectedType=category");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();

        // Pastikan respons API memiliki data yang benar
        if (!Array.isArray(data)) {
          throw new Error("Invalid data format from API");
        }

        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError(err.message); // Simpan pesan error untuk ditampilkan
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      {
        error && (
          <p className="text-red-500">Error: {error}</p>
        ) /* Tampilkan error jika terjadi */
      }
      <div className="flex flex-row justify-between space-x-4 overflow-x-scroll lg:overflow-x-hidden scrollbar-hide py-2 mb-2 sm:mb-4 md:mb-8">
        {categories.map((category) => (
          <CardKategori
            key={category.category_id}
            category_name={category.category_name}
            category_image={category.category_image}
          />
        ))}
      </div>
    </div>
  );
}
