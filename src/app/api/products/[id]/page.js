"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductPage({ params }) {
  const [product, setProduct] = useState(null);
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await fetch(`/api/products?id=${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product detail:", error);
      }
    };

    if (id) fetchProductDetail();
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <button onClick={() => router.back()} className="text-blue-500 underline">
        Back
      </button>
      <img
        src={product.product_image || "/images/placeholder.jpg"}
        alt={product.product_name}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <h2 className="text-2xl font-bold mb-2">{product.product_name}</h2>
      <p className="italic text-sm text-gray-500 mb-2">
        Category: {product.category_name}
      </p>
      {product.size_name && (
        <p className="italic text-sm text-gray-500 mb-2">
          Size: {product.size_name}
        </p>
      )}
      <p className="text-lg font-semibold mb-4">
        Rp {product.price.toLocaleString("id-ID", { minimumFractionDigits: 2 })}
      </p>
      <p className="text-gray-700">{product.description}</p>
    </div>
  );
}
