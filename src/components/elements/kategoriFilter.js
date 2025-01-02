import { useEffect, useState } from "react";

export default function KategoriFilter({ onChange, initialCategory }) {
  // State untuk menyimpan kategori yang dipilih
  const [selectedCategory, setSelectedCategory] = useState(
    initialCategory || null
  );

  // Efek untuk mengatur kategori awal jika ada
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const handleCategorySelect = (category) => {
    const newCategory = category === selectedCategory ? null : category;
    setSelectedCategory(newCategory);
    onChange(newCategory); // Kirim kategori yang dipilih atau null jika kategori dihapus
  };
  const handleCategoryClick = (category) => {
    onFilterChange({ category }); // Kirim kategori terpilih ke parent
  };

  const getButtonClass = (category) =>
    `block px-6 text-sm w-full text-left  
     ${
       category === selectedCategory
         ? "bg-blue text-black" // Gaya tombol aktif (terpilih)
         : "text-black/50 hover:text-black hover:bg-blue"
     }`;

  return (
    <ul className="mt-1">
      <li>
        <button
          onClick={() => handleCategorySelect("Artificial Bouquet")}
          className={getButtonClass("Artificial Bouquet")}
        >
          <span className="border-b py-3 border-blue inline-block w-full">
            Artificial Bouquet
          </span>
        </button>
      </li>
      <li>
        <button
          onClick={() => handleCategorySelect("Money Bouquet")}
          className={getButtonClass("Money Bouquet")}
        >
          <span className="border-b py-3 border-blue inline-block w-full">
            Money Bouquet
          </span>
        </button>
      </li>
      <li>
        <button
          onClick={() => handleCategorySelect("Balloon Bouquet")}
          className={getButtonClass("Balloon Bouquet")}
        >
          <span className="border-b py-3 border-blue inline-block w-full">
            Balloon Bouquet
          </span>
        </button>
      </li>
      <li>
        <button
          onClick={() => handleCategorySelect("Hand Bouquet")}
          className={getButtonClass("Hand Bouquet")}
        >
          <span className="border-b py-3 border-blue inline-block w-full">
            Hand Bouquet
          </span>
        </button>
      </li>
      <li>
        <button
          onClick={() => handleCategorySelect("Graduation Bouquet")}
          className={getButtonClass("Graduation Bouquet")}
        >
          <span className="border-b py-3 border-blue inline-block w-full">
            Graduation Bouquet
          </span>
        </button>
      </li>
      <li>
        <button
          onClick={() => handleCategorySelect("Bouquet Custom")}
          className={getButtonClass("Bouquet Custom")}
        >
          <span className="py-3 inline-block w-full">Bouquet Custom</span>
        </button>
      </li>
    </ul>
  );
}
