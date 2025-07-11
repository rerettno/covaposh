"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import CardProduct from "src/components/elements/cardProduct";

const ChatbotPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [currentStep, setCurrentStep] = useState(null);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [customProduct, setCustomProduct] = useState(null);
  const [displayedProducts, setDisplayedProducts] = useState([]);

  //untuk pemesanan dr katalog langsung
  useEffect(() => {
    const storedProduct = localStorage.getItem("selectedProduct");
    if (storedProduct) {
      const parsed = JSON.parse(storedProduct);
      setProduct(parsed);
      localStorage.removeItem("selectedProduct");
      // Trigger awal: langsung kirim nama produk
      fetch("/api/chatbot/pemesanan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: parsed.product_name,
          currentStep: "pesan_produk",
          product: parsed,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setMessages([
            {
              sender: "bot",
              content: `Halo! Selamat datang di Chatbot E-Catalog.\nProduk yang kamu pilih akan langsung diproses.`,
            },
            {
              sender: "bot",
              content: (
                <div>
                  <CardProduct product={parsed} />
                  <p>
                    Ketik <b>/pesan</b> untuk melanjutkan atau ganti produk
                    dengan mengetik nama lain.
                  </p>
                </div>
              ),
            },
          ]);
          setCurrentStep("pesan_produk");
        });
    } else {
      setMessages([
        {
          sender: "bot",
          content: `Halo! Selamat datang di Chatbot E-Catalog.
Pilih salah satu perintah berikut untuk melanjutkan:
1. /rekomendasi - Untuk mencari rekomendasi produk.
2. /pemesanan - Untuk memesan produk.
3. /informasi - Untuk informasi toko.`,
        },
      ]);
    }
  }, []);

  //bagian kustom
  useEffect(() => {
    const custom = localStorage.getItem("customProduct");
    if (custom) {
      const parsed = JSON.parse(custom);
      setCustomProduct(parsed);
      localStorage.removeItem("customProduct");

      fetch("/api/chatbot/pemesanan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: "/pesan",
          currentStep: "pesan_produk",
          product: parsed,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          // setCurrentStep("input_name");

          setMessages([
            {
              sender: "bot",
              content: (
                <>
                  <CardProduct product={parsed} />
                  <p className="mt-2 font-bold">
                    mohon maaf, pemesanan kustom belum tersedia! Anda kembali ke
                    menu utama. Pilih: /rekomendasi, /pemesanan, atau /informasi
                  </p>
                </>
              ),
            },
          ]);
        });
    }
  }, []);

  //awalan
  useState(() => {
    setMessages([
      {
        sender: "bot",
        content: `Halo! Selamat datang di Chatbot E-Catalog.
Pilih salah satu perintah berikut untuk melanjutkan:
1. /rekomendasi - Untuk mencari rekomendasi produk.
2. /pemesanan - Untuk memesan produk.
3. /informasi - Untuk informasi toko.`,
      },
    ]);
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", content: input }]);
    setLoading(true);

    try {
      const endpoint =
        currentStep === "rekomendasi"
          ? "/api/chatbot/rekomendasi"
          : currentStep === "pesan_produk"
          ? "/api/chatbot/pemesanan"
          : currentStep === "pemesanan"
          ? "/api/chatbot/pemesanan"
          : "/api/chatbot/intent";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          currentStep,
          product,
          customProduct,
          displayedProducts,
        }),
      });

      const data = await response.json();

      if (data.redirectTo) {
        window.location.href = data.redirectTo;
        return;
      }

      setMessages((prev) => [...prev, { sender: "bot", content: data.reply }]);

      if (data.products && data.products.length > 0) {
        const productCards = data.products.map((product) => (
          <CardProduct key={product.product_id} product={product} />
        ));
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            content: (
              <div>
                <div className="flex flex-wrap gap-4">{productCards}</div>
                <p>
                  Apakah ada rekomendasi lain yang ingin dicari? Ketik{" "}
                  <b>/tidak</b> untuk kembali ke menu utama, atau{" "}
                  <b>sebutkan deskripsi produk lain yang ingin Anda cari.</b>
                </p>
              </div>
            ),
          },
        ]);

        setDisplayedProducts((prev) => [
          ...prev,
          ...data.products.map((p) => p.product_id),
        ]);
      }

      if (data.product) {
        setProduct(data.product);

        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            content: (
              <div>
                <CardProduct product={data.product} />
                <p>
                  Ketik <b>/pesan</b> untuk melanjutkan atau ketik nama produk
                  lain untuk mengganti pilihan Anda.
                </p>
              </div>
            ),
          },
        ]);
      }

      if (data.currentStep) setCurrentStep(data.currentStep);

      if (data.nextStep === "menu_utama") {
        setCurrentStep(null);
        setDisplayedProducts([]);
        setProduct(null);
        setCustomProduct(null);
      } else if (data.nextStep) {
        setCurrentStep(data.nextStep);
      }
    } catch (error) {
      console.error("Error:", error.message);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", content: "Maaf, terjadi kesalahan pada server." },
      ]);
    } finally {
      setInput("");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header dengan Tombol Back */}
      <div className="flex items-center justify-between bg-lightBlue text-darkBlue p-4 text-center shadow-md sticky top-0 z-10">
        <Link
          href={"/"} // Navigasi ke halaman utama
          className="bg-blue-500 text-black/50 px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Kembali
        </Link>
        <h2 className="text-2xl font-bold text-darkBlue">Chatbot E-Catalog</h2>
      </div>

      {/* Header */}
      {/* <header className="bg-lightBlue text-darkBlue p-4 text-center shadow-md sticky top-0 z-10">
        <h1 className="text-2xl font-bold">Chatbot E-Catalog</h1>
      </header> */}

      {/* Chat Area */}
      {/* <div className="flex-grow p-6 overflow-auto space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-lg shadow-sm ${
              msg.sender === "user"
                ? "bg-lightBlue text-black ml-auto max-w-xs"
                : "bg-lightBlue/50 text-gray-800 mr-auto max-w-full"
            }`}
          >
            <p className="font-semibold mb-1">
              {msg.sender === "user" ? "Anda" : "Bot"}:
            </p>
            <div>{msg.content}</div>
          </div>
        ))}
      </div> */}
      <div className="flex-grow p-6 overflow-auto space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${
              msg.sender === "user" ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`relative p-5 rounded-3xl shadow-sm ${
                msg.sender === "user"
                  ? "bg-darkBlue text-white"
                  : "bg-lightBlue/50 text-gray-800"
              }`}
              style={{
                borderTopRightRadius: msg.sender === "user" ? "0" : "20px",
                borderTopLeftRadius: msg.sender === "user" ? "20px" : "0",
              }}
            >
              <p>{msg.content}</p>
              {/* Timestamp */}
              <span
                className={`absolute bottom-0 right-4 text-xs  ${
                  msg.sender === "user" ? "text-gray-200" : "text-gray-400"
                }`}
              >
                {new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <footer className="bg-white p-4 border-t fixed bottom-0 w-full  text-center  sticky ">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tulis pesan Anda..."
            className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            className={`bg-darkBlue text-white p-3 rounded-lg hover:bg-blue-600 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Mengirim..." : "Kirim"}
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ChatbotPage;
