"use client";

import { useState, useEffect } from "react";
import CardProduct from "../elements/cardProduct";

export default function NewProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Mengambil 5 produk terbaru dengan parameter `recent=true`
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products?recent=true");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex flex-wrap  gap-4 justify-between">
      {products.map((product) => (
        <CardProduct key={product.product_id} product={product} />
      ))}
    </div>
  );
}
