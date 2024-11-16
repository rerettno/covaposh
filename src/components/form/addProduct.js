"use client";
import { useState, useEffect } from "react";

export default function AddProduct() {
  const [productName, setProductName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [sizeId, setSizeId] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [filteredSizes, setFilteredSizes] = useState([]); // Ukuran sesuai kategori
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch kategori dan ukuran menggunakan `selectedType`
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoriesResponse = await fetch(
          "/api/selectedType?selectedType=category"
        );
        if (!categoriesResponse.ok)
          throw new Error("Failed to fetch categories");
        const categoriesData = await categoriesResponse.json();

        // Fetch all sizes
        const sizesResponse = await fetch(
          "/api/selectedType?selectedType=size"
        );
        if (!sizesResponse.ok) throw new Error("Failed to fetch sizes");
        const sizesData = await sizesResponse.json();

        // Set data ke state
        setCategories(categoriesData);
        setSizes(sizesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (categoryId) => {
    setCategoryId(categoryId);
    setSizeId(""); // Reset ukuran ketika kategori berubah

    // Filter ukuran berdasarkan kategori yang dipilih
    const filtered = sizes.filter(
      (size) => size.category_id === categoryId || !size.category_id
    );
    setFilteredSizes(filtered);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productName || !categoryId || !sizeId || !price) {
      setMessage("Please provide all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("product_name", productName);
    formData.append("category_id", categoryId);
    formData.append("size_id", sizeId);
    formData.append("price", price);
    formData.append("description", description);
    if (productImage) {
      formData.append("product_image", productImage);
    }

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (response.ok) {
        setMessage("Product successfully added!");
        setProductName("");
        setCategoryId("");
        setSizeId("");
        setPrice("");
        setDescription("");
        setProductImage(null);
      } else {
        setMessage(data.error || "Failed to add product.");
      }
    } catch (error) {
      console.error("Error submitting product:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter product name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            value={categoryId}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Size</label>
          <select
            value={sizeId}
            onChange={(e) => setSizeId(e.target.value)}
            className="w-full p-2 border rounded"
            disabled={!categoryId} // Nonaktifkan dropdown jika kategori belum dipilih
          >
            <option value="">Select Size</option>
            {filteredSizes.map((size) => (
              <option key={size.size_id} value={size.size_id}>
                {size.size_name} (Max Flowers: {size.flower_count || "N/A"})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter product price"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter product description"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Product Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProductImage(e.target.files[0])}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue text-black py-2 rounded hover:bg-blue-600"
        >
          Add Product
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}
