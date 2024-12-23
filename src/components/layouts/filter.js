"use client";
import SearchFilter from "src/components/elements/searchFilter";
import HargaFilter from "../elements/hargaFilter";
import SizeFilter from "../elements/sizeFilter";
import KategoriFilter from "../elements/kategoriFilter";

export default function Filter({ onFilterChange }) {
  // Fungsi untuk menangani perubahan di SearchFilter
  const handleSearchChange = (search) => {
    onFilterChange({ search });
  };

  // Fungsi untuk menangani perubahan di KategoriFilter
  const handleCategoryChange = (category) => {
    onFilterChange({ category });
  };

  // Fungsi untuk menangani perubahan di HargaFilter (misalnya, rentang harga)
  const handlePriceRangeChange = (priceFilters) => {
    onFilterChange(priceFilters);
  };
  // Fungsi untuk menangani perubahan di SizeFilter
  const handleSizeChange = (size) => {
    onFilterChange({ size });
  };

  return (
    <div className="hidden lg:block">
      <div className="mt-1 mb-1 space-y-2">
        {/* Pencarian Section */}
        <div className="relative border border-blue p-4">
          <span className="relative z-10 text-lg font-semibold tracking-wide text-darkBlue p-2">
            Search
          </span>
          <span
            className="absolute top-3 h-8 right-4 bg-lightBlue"
            style={{ width: "calc(100% - 16px)" }}
          ></span>
          <div className="mt-2">
            <SearchFilter onChange={handleSearchChange} />
          </div>
        </div>

        {/* Kategori Section */}
        <div className="relative border border-blue pt-4">
          <span className="relative z-10 text-lg font-semibold tracking-wide text-darkBlue px-6 py-2">
            Categories
          </span>
          <span
            className="absolute top-3 h-8 right-4 bg-lightBlue"
            style={{ width: "calc(100% - 16px)" }}
          ></span>
          <KategoriFilter onChange={handleCategoryChange} />
        </div>

        {/* Harga Section */}
        <div className="relative border border-blue p-4">
          <span className="relative z-10 text-base font-semibold tracking-wide text-darkBlue p-2">
            Price
          </span>
          <span
            className="absolute top-3 h-8 right-4 bg-lightBlue"
            style={{ width: "calc(100% - 16px)" }}
          ></span>
          <div className="mt-2">
            <HargaFilter onChange={handlePriceRangeChange} />
          </div>
        </div>

        {/* Ukuran Section */}
        <div className="relative border border-blue p-4">
          <span className="relative z-10 text-base font-semibold tracking-wide text-darkBlue p-2">
            Size
          </span>
          <span
            className="absolute top-3 h-8 right-4 bg-lightBlue"
            style={{ width: "calc(100% - 16px)" }}
          ></span>
          <div className="pt-4 w-full">
            <SizeFilter onChange={handleSizeChange} />
          </div>
        </div>
      </div>
    </div>
  );
}
