"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "src/components/layouts/navbar";

export default function ProductPage({ params }) {
  const [product, setProduct] = useState(null);
  const router = useRouter();
  const { id } = params;
  const waPhoneNumber = "6285716261499"; // Nomor WhatsApp dengan kode negara Indonesia

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
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium animate-pulse">Loading...</p>
      </div>
    );
  }

  // Fungsi untuk mengarahkan ke WhatsApp dengan pesan otomatis
  const handleOrderClick = () => {
    const waMessage = `Halo, saya tertarik dengan produk ${product.product_name}. Apakah produk ini masih tersedia?`;
    const waLink = `https://wa.me/${waPhoneNumber}?text=${encodeURIComponent(
      waMessage
    )}`;
    window.open(waLink, "_blank"); // Buka tautan di tab baru
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-8 sm:py-16 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 shadow-lg rounded-lg bg-white overflow-hidden">
            {/* Gambar Produk */}
            <div className="h-64 md:h-[500px]">
              <img
                src={product.product_image || "/images/placeholder.jpg"}
                alt={product.product_name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Detail Produk */}
            <div className="p-4 md:p-8 flex flex-col justify-between">
              {/* Breadcrumb */}
              <p className="text-sm text-black/50 mb-4">
                <span className="hover:underline cursor-pointer">Home</span>{" "}
                &gt;{" "}
                <span className="hover:underline cursor-pointer">Products</span>{" "}
                &gt; Detail Product
              </p>

              {/* Nama Produk */}
              <h1 className="text-2xl md:text-4xl font-bold text-black mb-4">
                {product.product_name || "Nama Produk"}
              </h1>

              {/* Kategori dan Size */}
              <div className="mb-4">
                <p className="text-sm text-black/50">
                  Kategori: {product.category_name} / Ukuran:{" "}
                  {product.size_name}
                </p>
              </div>

              {/* Harga */}
              <p className="text-2xl md:text-3xl text-darkBlue font-bold mb-6">
                Rp.{" "}
                {Number(product.price).toLocaleString("id-ID", {
                  maximumFractionDigits: 0,
                })}
              </p>

              {/* Deskripsi Produk */}
              <p className="text-black leading-relaxed mb-6 text-sm md:text-base">
                {product.description ||
                  "Deskripsi produk akan ditampilkan di sini."}
              </p>

              {/* Tombol Pesan */}
              <div className="mt-auto">
                <button
                  onClick={handleOrderClick} // Tambahkan fungsi di sini
                  className="w-full bg-darkBlue text-white font-medium py-2 md:py-3 rounded-md transition hover:bg-blue shadow-md"
                >
                  Tanyakan Produk
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
