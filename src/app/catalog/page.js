"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import AllProduct from "src/components/layouts/allProduct";
import Filter from "src/components/layouts/filter";
import Footer from "src/components/layouts/footer";
import Navbar from "src/components/layouts/navbar";

export default function CatalogPage() {
  const searchParams = useSearchParams(); // Untuk membaca query parameters
  const router = useRouter(); // Untuk navigasi
  const [filters, setFilters] = useState({}); // State untuk menyimpan filter
  const [initialCategory, setInitialCategory] = useState(null); // State untuk kategori awal

  useEffect(() => {
    const category = searchParams.get("category"); // Ambil kategori dari query
    const fromCustomize = searchParams.get("from") === "customize"; // Cek sumber navigasi

    if (category) {
      setFilters((prevFilters) => ({ ...prevFilters, category }));
      setInitialCategory(category); // Simpan kategori awal

      window.history.replaceState({}, document.title, "/catalog");
    }

    if (fromCustomize) {
      // Hapus query "from" dari URL setelah memuat
      const params = new URLSearchParams(searchParams.toString());
      params.delete("from");
      router.replace(`/catalog?${params.toString()}`, undefined, {
        shallow: true,
      });
    }
  }, [searchParams, router]);

  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, ...newFilters };
      if (!updatedFilters.category) {
        delete updatedFilters.category; // Hapus kategori jika kosong
      }
      return updatedFilters;
    });
  };

  return (
    <div>
      <Navbar />
      {/* Divider */}
      <div className="relative mt-[70px] h-[20px] md:h-[60px]">
        <div
          className="absolute inset-0 bg-repeat-x bg-center"
          style={{
            backgroundImage: "url('/images/divider.png')",
            backgroundSize: "contain",
          }}
        ></div>
        <div className="absolute inset-0 bg-blue/50"></div>
      </div>

      {/* Layout grid untuk sidebar dan produk */}
      <div className="mt-7 grid grid-cols-1 lg:grid-cols-5 gap-4 h-[calc(100vh-50px)]">
        {/* Sidebar filter section */}
        <div className="lg:col-span-1 h-full overflow-y-scroll scrollbar-hide">
          <Filter
            onFilterChange={handleFilterChange}
            selectedCategory={filters.category || initialCategory}
          />
        </div>

        {/* Scrollable product section */}
        <div className="lg:col-span-4 h-full overflow-y-scroll scrollbar-hide">
          <AllProduct filters={filters} />
        </div>
      </div>

      {/* Footer */}
      <Footer type="custom" />
    </div>
  );
}
