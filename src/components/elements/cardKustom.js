"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CardKustom() {
  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [wrapStyles, setWrapStyles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const router = useRouter();

  // Fetch kategori dengan wrap style
  useEffect(() => {
    const fetchCategoriesWithWrapStyles = async () => {
      try {
        const response = await fetch(
          "/api/selectedType?selectedType=category&withWrapStyle=true"
        );
        const data = await response.json();
        setCategories(data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      }
    };

    fetchCategoriesWithWrapStyles();
  }, []);

  // Fetch ukuran berdasarkan kategori
  const handleCategorySelect = async (categoryId) => {
    setSelectedCategory(categoryId);
    setSizes([]);
    try {
      const response = await fetch(
        `/api/selectedType?selectedType=size&category_id=${categoryId}`
      );
      const data = await response.json();
      setSizes(data || []);
    } catch (error) {
      console.error("Error fetching sizes:", error);
      setSizes([]);
    }
  };

  // Fetch wrap styles berdasarkan kategori dan ukuran
  const handleSizeSelect = async (sizeId) => {
    setSelectedSize(sizeId);
    setWrapStyles([]);
    try {
      const response = await fetch(
        `/api/wrapStyle?category_id=${selectedCategory}&size_id=${sizeId}`
      );
      const data = await response.json();
      setWrapStyles(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching wrap styles:", error);
      setWrapStyles([]);
    }
  };

  // Fungsi untuk memilih wrap style dan navigasi
  const handleWrapSelect = (wrap) => {
    const wrapData = {
      ...wrap,
      category_id: selectedCategory,
      size_id: selectedSize,
    };

    localStorage.setItem("selectedWrap", JSON.stringify(wrapData));
    router.push("/customize");
  };

  return (
    <div className="lg:col-span-3 p-2">
      {/* Pilihan Kategori */}
      {!selectedCategory && (
        <div className="px-24">
          <h2 className="text-2xl font-semibold mb-8 text-center">
            Pilih Kategori Buket
          </h2>
          <ul className="flex justify-center gap-6">
            {categories.map((category) => (
              <li
                key={category.category_id}
                className="group relative w-[250px] h-auto border border-gray-200 rounded-lg shadow-md overflow-hidden cursor-pointer"
              >
                <button
                  onClick={() => handleCategorySelect(category.category_id)}
                  className="block w-full h-full"
                >
                  {/* Gambar */}
                  <div className=" object-cover p-2">
                    <img
                      src={category.category_image || "/images/placeholder.jpg"}
                      alt={category.category_name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    />
                  </div>
                  {/* Overlay & Nama Kategori */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white font-semibold text-xl">
                      {category.category_name}
                    </span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Pilihan Ukuran */}
      {selectedCategory && !selectedSize && (
        <div>
          <h2 className="text-2xl font-semibold mb-8 text-center">
            Pilih Ukuran Buket
          </h2>
          <button
            onClick={() => setSelectedCategory(null)}
            className="mb-6 text-blue-500 underline block text-center"
          >
            Kembali ke Pilihan Kategori
          </button>
          <ul className="flex justify-center gap-6">
            {sizes.map((size) => (
              <li
                key={size.size_id}
                className="group relative w-[250px] h-auto border border-gray-200 rounded-lg shadow-md overflow-hidden cursor-pointer"
              >
                <button
                  onClick={() => handleSizeSelect(size.size_id)}
                  className="block w-full h-full"
                >
                  {/* Gambar */}
                  <div className="w-full h-full ">
                    <img
                      src={size.size_image || "/images/placeholder.jpg"}
                      alt={size.size_name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    />
                  </div>
                  {/* Overlay & Nama Ukuran */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white font-semibold text-xl">
                      {size.size_name}
                    </span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Pilihan Wrap Style */}
      {selectedSize && (
        <div>
          <h2 className="text-2xl font-semibold mb-8 text-center">
            Pilih Wrap Style
          </h2>
          <button
            onClick={() => setSelectedSize(null)}
            className="mb-6 text-blue-500 underline block text-center"
          >
            Kembali ke Pilihan Ukuran
          </button>
          <ul className="grid gap-4 grid-cols-3">
            {Array.isArray(wrapStyles) && wrapStyles.length > 0 ? (
              wrapStyles.map((wrap) => (
                <li
                  key={wrap.wrap_id}
                  className="relative border border-blue rounded-lg mx-auto text-center shadow-sm"
                >
                  <button
                    onClick={() => handleWrapSelect(wrap)}
                    className="group block overflow-hidden rounded-lg w-full h-full relative"
                  >
                    <img
                      src={wrap.wrap_image || "/images/placeholder.jpg"}
                      alt={wrap.wrap_name || "Wrap Style"}
                      className="h-[250px] w-fit object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                      <span className="text-white text-lg font-semibold">
                        {wrap.wrap_name || "Wrap Style"}
                      </span>
                    </div>
                  </button>
                </li>
              ))
            ) : (
              <p className="text-gray-500">No Wrap Styles available.</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
