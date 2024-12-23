"use client";
import { useState } from "react";
import AddElementCustom from "src/components/form/addElementCustom";
import AllProduct from "src/components/layouts/allProduct";
import Filter from "src/components/layouts/filter";
import Footer from "src/components/layouts/footer";
import Navbar from "src/components/layouts/navbar";

export default function CatalogPage() {
  const [filters, setFilters] = useState({});

  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => {
      // Jika kategori diubah menjadi null, hapus dari filters
      const updatedFilters = { ...prevFilters, ...newFilters };
      if (updatedFilters.category === null) {
        delete updatedFilters.category;
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
