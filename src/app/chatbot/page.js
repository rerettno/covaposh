"use client";

import { useState } from "react";
import CardProduct from "src/components/elements/cardProduct";

const ChatbotPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [currentStep, setCurrentStep] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentOffset, setCurrentOffset] = useState(0); // Offset untuk query
  const [displayedProducts, setDisplayedProducts] = useState([]); // Produk yang sudah ditampilkan

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
          : "/api/chatbot/intent";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          offset: currentOffset,
          displayedProducts:
            currentStep === "rekomendasi" ? displayedProducts : [],
        }),
      });

      const data = await response.json();

      setMessages((prev) => [...prev, { sender: "bot", content: data.reply }]);

      if (data.nextStep) {
        setCurrentStep(data.nextStep);
      }

      if (data.products && data.products.length > 0) {
        const productCards = data.products.map((product) => (
          <CardProduct key={product.product_id} product={product} />
        ));
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            content: <div className="flex flex-wrap">{productCards}</div>,
          },
        ]);
        setDisplayedProducts((prev) => [
          ...prev,
          ...data.products.map((p) => p.product_id),
        ]);
        setCurrentOffset(data.nextOffset); // Perbarui offset
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
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Chatbot E-Catalog</h2>
      <div className="border p-4 h-96 overflow-auto space-y-4 rounded-lg">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={msg.sender === "user" ? "text-right" : "text-left"}
          >
            <p className="font-bold">
              {msg.sender === "user" ? "Anda" : "Bot"}:
            </p>
            <p>{msg.content}</p>
          </div>
        ))}
      </div>
      <div className="flex mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tulis pesan Anda..."
          className="flex-1 border rounded p-2"
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-blue-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Mengirim..." : "Kirim"}
        </button>
      </div>
    </div>
  );
};

export default ChatbotPage;
