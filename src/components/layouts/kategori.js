"use client"; // Menandakan bahwa ini adalah Client Component
import { useEffect, useState } from "react";
import CardKategori from "../elements/cardKategori";

export default function Kategori() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="flex flex-row justify-between space-x-4 overflow-x-scroll lg:overflow-x-hidden scrollbar-hide">
      {categories.map((category) => (
        <CardKategori
          key={category.category_id}
          category_name={category.category_name}
          category_image={category.category_image}
        />
      ))}
    </div>
  );
}
