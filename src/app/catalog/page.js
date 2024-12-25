"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import AddElementCustom from "src/components/form/addElementCustom";
import AllProduct from "src/components/layouts/allProduct";
import Filter from "src/components/layouts/filter";
import Footer from "src/components/layouts/footer";
import Navbar from "src/components/layouts/navbar";

export default function CatalogPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [filters, setFilters] = useState({
    category: searchParams.get("category") || null, // Default: kategori dari query parameter
  });

  useEffect(() => {
    if (filters.category && searchParams.get("category")) {
      router.replace("/catalog"); // Hapus query parameter
    }
  }, [filters.category, router, searchParams]);

  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, ...newFilters };
      if (updatedFilters.category === null) {
        delete updatedFilters.category; // Hapus kategori jika kosong
      }
      return updatedFilters;
    });
  };

  return (
    <div>
      <Navbar />
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

      <div className="mt-7 grid grid-cols-1 lg:grid-cols-5 gap-4 h-[calc(100vh-50px)]">
        {/* Sidebar filter section */}
        <div className="lg:col-span-1 h-full">
          <Filter
            onFilterChange={handleFilterChange}
            selectedCategory={filters.category}
          />
        </div>

        {/* Scrollable product section */}
        <div className="lg:col-span-4 h-full overflow-y-scroll scrollbar-hide">
          <AllProduct filters={filters} />
        </div>
      </div>
      {/* <AddElementCustom /> */}
      <Footer type="custom" />
    </div>
  );
}
