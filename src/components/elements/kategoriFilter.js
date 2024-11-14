import { useState } from "react";

export default function KategoriFilter({ onChange }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    const newCategory = category === selectedCategory ? null : category;
    setSelectedCategory(newCategory);
    onChange(newCategory); // Kirim kategori yang dipilih atau null jika kategori dihapus
  };

  const getButtonClass = (category) =>
    `block px-6 text-sm w-full text-left  
     ${
       category === selectedCategory
         ? "bg-blue text-black"
         : "text-black/50 hover:text-black hover:bg-blue"
     }`;

  return (
    <ul className="mt-1">
      <li>
        <button
          onClick={() => handleCategorySelect("Buket Artificial")}
          className={getButtonClass("Buket Artificial")}
        >
          <span className="border-b py-3 border-blue inline-block w-full">
            Buket Artificial
          </span>
        </button>
      </li>
      <li>
        <button
          onClick={() => handleCategorySelect("Buket Uang")}
          className={getButtonClass("Buket Uang")}
        >
          <span className="border-b py-3 border-blue inline-block w-full">
            Buket Uang
          </span>
        </button>
      </li>
      <li>
        <button
          onClick={() => handleCategorySelect("Buket Balon")}
          className={getButtonClass("Buket Balon")}
        >
          <span className="border-b py-3 border-blue inline-block w-full">
            Buket Balon
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
          onClick={() => handleCategorySelect("Buket Wisuda")}
          className={getButtonClass("Buket Wisuda")}
        >
          <span className="border-b py-3 border-blue inline-block w-full">
            Buket Wisuda
          </span>
        </button>
      </li>

      <li>
        <button
          onClick={() => handleCategorySelect("Kustom Buket")}
          className={getButtonClass("Kustom Buket")}
        >
          <span className=" py-3  inline-block w-full">Kustom Buket</span>
        </button>
      </li>
    </ul>
  );
}
