import { useState } from "react";
import SearchFilter from "src/components/elements/searchFilter";
import HargaFilter from "../elements/hargaFilter";
import SizeFilter from "../elements/sizeFilter";
import KategoriFilter from "../elements/kategoriFilter";

export default function Filter({ onFilterChange, selectedCategory }) {
  const [isOpen, setIsOpen] = useState(false); // Toggle dropdown untuk layar kecil

  // Fungsi untuk menangani perubahan filter
  const handleSearchChange = (search) => onFilterChange({ search });
  const handleCategoryChange = (category) => onFilterChange({ category });
  const handlePriceRangeChange = (priceFilters) => onFilterChange(priceFilters);
  const handleSizeChange = (size) => onFilterChange({ size });

  return (
    <div>
      {/* Untuk Layar Kecil: Dropdown */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-full text-sm px-4 py-2 border rounded bg-lightBlue text-darkBlue"
        >
          {isOpen ? "Tutup Filter" : "Buka Filter"}
        </button>
        {isOpen && (
          <div className="border mt-2 rounded-lg bg-white shadow-lg p-4">
            <div className="space-y-4">
              <div>
                <span className="block font-semibold text-darkBlue">
                  Search
                </span>
                <SearchFilter onChange={handleSearchChange} />
              </div>
              <div>
                <span className="block font-semibold text-darkBlue">
                  Categories
                </span>
                <KategoriFilter
                  onChange={handleCategoryChange}
                  initialCategory={selectedCategory}
                />
              </div>
              <div>
                <span className="block font-semibold text-darkBlue">Price</span>
                <HargaFilter onChange={handlePriceRangeChange} />
              </div>
              <div>
                <span className="block font-semibold text-darkBlue">Size</span>
                <SizeFilter onChange={handleSizeChange} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Untuk Layar Besar: Sidebar */}
      <div className="hidden lg:block">
        <div className="mt-1 mb-1 space-y-2">
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
          <div className="relative border border-blue pt-4">
            <span className="relative z-10 text-lg font-semibold tracking-wide text-darkBlue px-6 py-2">
              Categories
            </span>
            <span
              className="absolute top-3 h-8 right-4 bg-lightBlue"
              style={{ width: "calc(100% - 16px)" }}
            ></span>
            <KategoriFilter
              onChange={handleCategoryChange}
              initialCategory={selectedCategory}
            />
          </div>
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
    </div>
  );
}
