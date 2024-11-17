"use client";

import { useEffect, useState } from "react";

export default function AddElementCustom() {
  // State untuk menyimpan data form
  const [selectedCategory, setSelectedCategory] = useState("");
  const [formData, setFormData] = useState({
    decoration_name: "",
    decoration_image: null,
    flower_name: "",
    color_name: "",
    flower_id: "",
    flower_image: null,
    flower_price: "",
    ribbon_name: "",
    ribbon_image: null,
    category_id: "",
    size_id: "",
    wrap_image: null,
    wrap_price: "",
  });

  // State untuk menyimpan opsi dropdown
  const [options, setOptions] = useState({
    flowers: [],
    categories: [],
    sizes: [],
  });

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [categoriesData, sizesData, flowersData] = await Promise.all([
          fetch("/api/selectedType?selectedType=category").then((res) =>
            res.json()
          ),
          fetch("/api/selectedType?selectedType=size").then((res) =>
            res.json()
          ),
          fetch("/api/flowers").then((res) => res.json()), // Anda dapat mengganti endpoint ini jika perlu
        ]);

        setOptions({
          categories: categoriesData,
          sizes: sizesData,
          flowers: flowersData,
        });
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchOptions();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setFormData({}); // Reset form data setiap kali kategori berubah
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("category", selectedCategory);

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        data.append(key, value);
      }
    });

    // Debug: Cetak data yang akan dikirim
    console.log("Sending data:", Object.fromEntries(data.entries()));

    try {
      const response = await fetch("/api/addElementsCustom", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        alert("Data berhasil ditambahkan!");
        setFormData({});
        setSelectedCategory("");
      } else {
        const errorData = await response.json();
        alert(`Gagal menambahkan data: ${errorData.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-6">Tambah Data Buket</h2>

      {/* Dropdown untuk memilih kategori */}
      <label className="block text-sm mb-2">Pilih Kategori Data</label>
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="w-full p-2 mb-6 border rounded"
      >
        <option value="">-- Pilih Kategori --</option>
        <option value="decoration">Decoration</option>
        <option value="flower">Flower</option>
        <option value="flower_color">Flower Color</option>
        <option value="ribbon">Ribbon</option>
        <option value="wrap_style">Wrap Style</option>
      </select>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Form untuk Decoration */}
        {selectedCategory === "decoration" && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Decoration</h3>
            <label className="block text-sm mb-1">Decoration Name</label>
            <input
              type="text"
              name="decoration_name"
              value={formData.decoration_name || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <label className="block text-sm mt-3 mb-1">Decoration Image</label>
            <input
              type="file"
              name="decoration_image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border rounded"
            />
          </div>
        )}

        {/* Form untuk Flower */}
        {selectedCategory === "flower" && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Flower</h3>
            <label className="block text-sm mb-1">Flower Name</label>
            <input
              type="text"
              name="flower_name"
              value={formData.flower_name || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        )}

        {/* Form untuk Flower Color */}
        {selectedCategory === "flower_color" && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Flower Color</h3>
            <label className="block text-sm mb-1">Flower Name</label>
            <select
              name="flower_id"
              value={formData.flower_id || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Pilih Nama Bunga</option>
              {options.flowers.map((flower) => (
                <option key={flower.flower_id} value={flower.flower_id}>
                  {flower.flower_name}
                </option>
              ))}
            </select>

            <label className="block text-sm mt-3 mb-1">Color Name</label>
            <input
              type="text"
              name="color_name"
              value={formData.color_name || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />

            <label className="block text-sm mt-3 mb-1">Flower Price</label>
            <input
              type="number"
              name="flower_price"
              value={formData.flower_price || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />

            <label className="block text-sm mt-3 mb-1">Flower Image</label>
            <input
              type="file"
              name="flower_image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border rounded"
            />
          </div>
        )}

        {/* Form untuk Ribbon */}
        {selectedCategory === "ribbon" && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Ribbon</h3>
            <label className="block text-sm mb-1">Ribbon Name</label>
            <input
              type="text"
              name="ribbon_name"
              value={formData.ribbon_name || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <label className="block text-sm mt-3 mb-1">Ribbon Image</label>
            <input
              type="file"
              name="ribbon_image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border rounded"
            />
          </div>
        )}

        {/* Form untuk Wrap Style */}
        {selectedCategory === "wrap_style" && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Wrap Style</h3>
            <label className="block text-sm mb-1">Category Name</label>
            <select
              name="category_id"
              value={formData.category_id || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Pilih Nama Kategori</option>
              {options.categories.map((category) => (
                <option key={category.category_id} value={category.category_id}>
                  {category.category_name}
                </option>
              ))}
            </select>
            <label className="block text-sm mt-3 mb-1">Size Name</label>
            <select
              name="size_id"
              value={formData.size_id || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Pilih Ukuran</option>
              {options.sizes.map((size) => (
                <option key={size.size_id} value={size.size_id}>
                  {size.size_name}
                </option>
              ))}
            </select>
            <label className="block text-sm mt-3 mb-1">Wrap Image</label>
            <input
              type="file"
              name="wrap_image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border rounded"
            />
            <label className="block text-sm mt-3 mb-1">Wrap Price</label>
            <input
              type="number"
              name="wrap_price"
              value={formData.wrap_price || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue text-black py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
