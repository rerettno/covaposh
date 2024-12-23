"use client";
import { useEffect, useState } from "react";
import CardProduct from "../elements/cardProduct";
import CardKustom from "../elements/cardKustom";

import { useSearchParams, useRouter } from "next/navigation";

export default function AllProduct({ filters }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("");

  // Fungsi untuk mengambil produk sesuai filter
  const fetchProducts = async (currentFilters) => {
    setLoading(true);
    try {
      const query = new URLSearchParams(currentFilters).toString();
      const response = await fetch(`/api/products?${query}`);
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Update produk saat filter atau sortBy berubah
  useEffect(() => {
    if (filters.category === "Kustom Buket") {
      setLoading(false); // Tidak melakukan fetching data
    } else {
      fetchProducts({ ...filters, sortBy });
    }
  }, [filters, sortBy]);

  // Fungsi untuk menangani perubahan dropdown
  const handleSortChange = (e) => {
    setSortBy(e.target.value); // Update state sortBy dengan nilai yang dipilih
  };

  if (loading) return <p>Loading...</p>;
  // Jika kategori adalah "Kustom Buket", tampilkan komponen CardKustom saja
  if (filters.category === "Kustom Buket") {
    return (
      <div className="overflow-y-scroll h-[calc(100vh-100px)] pt-4">
        <CardKustom />{" "}
        {/* CardKustom akan mengelola data dan tampilannya sendiri */}
      </div>
    );
  }

  if (products.length === 0) return <p>No products found.</p>;

  return (
    <div>
      {/* Dropdown Sort By */}
      <div className="flex justify-end p-2 bg-white border-b border-gray-300">
        <label htmlFor="SortBy" className="sr-only">
          Urutkan Berdasarkan
        </label>
        <select
          id="SortBy"
          className="h-10 rounded bg-white border-lightBlue border-2 text-sm"
          onChange={handleSortChange} // Panggil handleSortChange pada perubahan dropdown
          value={sortBy}
        >
          <option>Urutkan Berdasarkan</option>
          <option value="recent">Koleksi Terbaru</option>
          <option value="priceAsc">Harga Terendah</option>
          <option value="priceDesc">Harga Tertinggi</option>
        </select>
      </div>

      {/* Area Produk */}
      <div className="overflow-y-scroll h-[calc(100vh-100px)] pt-4">
        <div className="flex flex-wrap gap-5">
          {products.map((product) => (
            <CardProduct key={product.product_id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
