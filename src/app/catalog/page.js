"use client";

import { useState, useEffect } from "react";
import AddElementCustom from "src/components/form/addElementCustom";
import AllProduct from "src/components/layouts/allProduct";
import Filter from "src/components/layouts/filter";
import Footer from "src/components/layouts/footer";
import Navbar from "src/components/layouts/navbar";

export default function CatalogPage() {
  const [filters, setFilters] = useState({}); // State untuk menyimpan filter
  const [initialCategory, setInitialCategory] = useState(null); // State untuk kategori awal dari URL

  useEffect(() => {
    // Ambil parameter kategori dari URL
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");
    if (category) {
      setFilters((prevFilters) => ({ ...prevFilters, category }));
      setInitialCategory(category); // Simpan kategori awal
      // Hapus parameter dari URL
      window.history.replaceState({}, document.title, "/catalog");
    }
  }, []);

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

// "use client";

// import { useEffect, useState } from "react";
// import AllProduct from "src/components/layouts/allProduct";
// import Filter from "src/components/layouts/filter";
// import Footer from "src/components/layouts/footer";
// import Navbar from "src/components/layouts/navbar";

// export default function CatalogPage() {
//   const [filters, setFilters] = useState({});
//   const [initialCategory, setInitialCategory] = useState(null);

//   useEffect(() => {
//     // Membaca query parameters dari window.location
//     const searchParams = new URLSearchParams(window.location.search);
//     const category = searchParams.get("category");
//     const fromCustomize = searchParams.get("from") === "customize";

//     if (category) {
//       setFilters((prevFilters) => ({ ...prevFilters, category }));
//       setInitialCategory(category);

//       // Hapus "category" dari URL tanpa memuat ulang halaman
//       const url = new URL(window.location.href);
//       url.searchParams.delete("category");
//       window.history.replaceState(
//         {},
//         document.title,
//         url.pathname + url.search
//       );
//     }

//     if (fromCustomize) {
//       // Hapus "from" dari URL tanpa memuat ulang halaman
//       const url = new URL(window.location.href);
//       url.searchParams.delete("from");
//       window.history.replaceState(
//         {},
//         document.title,
//         url.pathname + url.search
//       );
//     }
//   }, []);

//   const handleFilterChange = (newFilters) => {
//     setFilters((prevFilters) => {
//       const updatedFilters = { ...prevFilters, ...newFilters };
//       if (!updatedFilters.category) {
//         delete updatedFilters.category; // Hapus kategori jika kosong
//       }
//       return updatedFilters;
//     });
//   };

//   return (
//     <div>
//       <Navbar />
//       {/* Divider */}
//       <div className="relative mt-[70px] h-[20px] md:h-[60px]">
//         <div
//           className="absolute inset-0 bg-repeat-x bg-center"
//           style={{
//             backgroundImage: "url('/images/divider.png')",
//             backgroundSize: "contain",
//           }}
//         ></div>
//         <div className="absolute inset-0 bg-blue/50"></div>
//       </div>

//       {/* Layout grid untuk sidebar dan produk */}
//       <div className="mt-7 grid grid-cols-1 lg:grid-cols-5 gap-4 h-[calc(100vh-50px)]">
//         {/* Sidebar filter section */}
//         <div className="lg:col-span-1 h-full overflow-y-scroll scrollbar-hide">
//           <Filter
//             onFilterChange={handleFilterChange}
//             selectedCategory={filters.category || initialCategory}
//           />
//         </div>

//         {/* Scrollable product section */}
//         <div className="lg:col-span-4 h-full overflow-y-scroll scrollbar-hide">
//           <AllProduct filters={filters} />
//         </div>
//       </div>

//       {/* Footer */}
//       <Footer type="custom" />
//     </div>
//   );
// }
