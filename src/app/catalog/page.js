"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import AddElementCustom from "src/components/form/addElementCustom";
import AllProduct from "src/components/layouts/allProduct";
import Filter from "src/components/layouts/filter";
import Footer from "src/components/layouts/footer";
import Navbar from "src/components/layouts/navbar";

export default function CatalogPage() {
  const searchParams = useSearchParams(); // Ambil query parameter dari URL
  const router = useRouter();

  // State untuk menyimpan filter
  const [filters, setFilters] = useState({
    category: searchParams.get("category") || null, // Ambil kategori dari query parameter jika ada
  });

  useEffect(() => {
    if (filters.category) {
      // Hapus query parameter setelah kategori diterapkan
      router.replace("/catalog");
    }
  }, [filters.category, router]);

  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, ...newFilters };
      if (updatedFilters.category === null) {
        delete updatedFilters.category; // Hapus kategori jika tidak ada
      }
      return updatedFilters;
    });
  };

  return (
    <div>
      <Navbar />
      <div className="relative mt-[50px] md:mt-[70px] h-[15px] md:h-[60px]">
        <div
          className="absolute inset-0 bg-repeat-x bg-center"
          style={{
            backgroundImage: "url('/images/divider.png')",
            backgroundSize: "contain",
          }}
        ></div>
        <div className="absolute inset-0 bg-blue/50"></div>
      </div>

      <div className="mt-7 flex h-[calc(100vh-50px)] gap-4">
        {/* Sidebar filter section */}
        <div className="w-[20%] h-full overflow-y-scroll scrollbar-hide">
          <Filter onFilterChange={handleFilterChange} />
        </div>

        {/* Scrollable product section */}
        <div className="w-[80%] h-full overflow-y-scroll scrollbar-hide">
          <AllProduct filters={filters} />
        </div>
      </div>
      {/* <AddElementCustom /> */}
      <Footer type="custom" />
    </div>
  );
}
