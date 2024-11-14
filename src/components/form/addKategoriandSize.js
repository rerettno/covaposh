"use client";

import { useState } from "react";

export default function AddCategoryOrSizeForm() {
  const [entityType, setEntityType] = useState("category"); // Menentukan tipe entitas
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      setMessage(`Please provide a ${entityType} name.`);
      return;
    }

    const formData = new FormData();
    formData.append(
      entityType === "category" ? "category_name" : "size_name",
      name
    );
    if (image) {
      formData.append(
        entityType === "category" ? "category_image" : "size_image",
        image
      );
    }

    try {
      const response = await fetch(
        `/api/${entityType === "category" ? "categories" : "sizes"}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (response.ok) {
        setMessage(
          `${
            entityType === "category" ? "Category" : "Size"
          } successfully added!`
        );
        setName("");
        setImage(null);
      } else {
        setMessage(data.error || `Failed to add ${entityType}.`);
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">
        Add New {entityType === "category" ? "Category" : "Size"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Dropdown untuk memilih tipe entitas */}
        <div>
          <label className="block text-sm font-medium mb-2">Entity Type</label>
          <select
            value={entityType}
            onChange={(e) => setEntityType(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="category">Category</option>
            <option value="size">Size</option>
          </select>
        </div>

        {/* Nama Kategori atau Ukuran */}
        <div>
          <label className="block text-sm font-medium mb-2">
            {entityType === "category" ? "Category Name" : "Size Name"}
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder={`Enter ${
              entityType === "category" ? "category" : "size"
            } name`}
          />
        </div>

        {/* Gambar Kategori atau Ukuran */}
        <div>
          <label className="block text-sm font-medium mb-2">
            {entityType === "category" ? "Category Image" : "Size Image"}
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Tombol Submit */}
        <button
          type="submit"
          className="w-full bg-blue text-black py-2 rounded hover:bg-blue-600"
        >
          Add {entityType === "category" ? "Category" : "Size"}
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}
