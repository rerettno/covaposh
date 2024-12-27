"use client";

import { useState, useEffect } from "react";
import CardProduct from "../elements/cardProduct";
import Link from "next/link";

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
    <div>
      {/* Product Cards */}
      <div className="flex flex-wrap gap-4 justify-between">
        {products.map((product) => (
          <CardProduct key={product.product_id} product={product} />
        ))}
      </div>

      {/* Centered Button */}
      <div className="flex justify-center mt-8 sm:mt-12 md:mt-16">
        <button className="btn text-darkBlue bg-transparent border text-base border-blue rounded-product hover:bg-blue hover:text-white px-6 py-2">
          <Link href="/catalog">Go to Catalog</Link>
        </button>
      </div>
    </div>
  );
}
