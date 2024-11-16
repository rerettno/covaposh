"use client";

import { useState } from "react";

export default function AddCategoryOrSizeForm() {
  const [entityType, setEntityType] = useState("category");
  const [formData, setFormData] = useState({
    name: "",
    image: null,
    flowerCount: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("selectedType", entityType);
    data.append(
      entityType === "category" ? "category_name" : "size_name",
      formData.name
    );
    if (formData.image) {
      data.append(
        entityType === "category" ? "category_image" : "size_image",
        formData.image
      );
    }
    if (entityType === "size") {
      data.append("flower_count", formData.flowerCount);
    }

    try {
      const response = await fetch("/api/selectedType", {
        method: "POST",
        body: data,
      });

      const result = await response.json();
      if (response.ok) {
        setMessage(`${entityType} successfully added!`);
        setFormData({ name: "", image: null, flowerCount: "" });
      } else {
        setMessage(result.error || `Failed to add ${entityType}.`);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Add New {entityType}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
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
        <div>
          <label className="block text-sm font-medium mb-2">
            {entityType === "category" ? "Category Name" : "Size Name"}
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        {entityType === "size" && (
          <div>
            <label className="block text-sm font-medium mb-2">
              Flower Count
            </label>
            <input
              type="number"
              name="flowerCount"
              value={formData.flowerCount}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium mb-2">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue text-black py-2 rounded hover:bg-blue-600"
        >
          Add {entityType}
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}
