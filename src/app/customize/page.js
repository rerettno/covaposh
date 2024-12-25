"use client";

import { useState, useEffect } from "react";
import CustomizeElement from "src/components/layouts/customizeElement";
import PreviewElement from "src/components/layouts/previewElement";
import KalkulasiElement from "src/components/layouts/kalkulasiElement";
import { useRouter } from "next/navigation";

export default function CustomizePage() {
  const [selectedWrap, setSelectedWrap] = useState(null);
  const [selectedFlowers, setSelectedFlowers] = useState([]);
  const [selectedRibbon, setSelectedRibbon] = useState(null);
  const [selectedDecoration, setSelectedDecoration] = useState(null);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [isKalkulasiOpen, setIsKalkulasiOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedWrap = JSON.parse(localStorage.getItem("selectedWrap"));
    if (savedWrap) setSelectedWrap(savedWrap);
  }, []);

  const handleWrapSelect = (wrap) => {
    setSelectedWrap(wrap);
    setSelectedFlowers([]); // Reset bunga saat wrap berubah
    setSelectedRibbon(null);
    setSelectedDecoration(null);
  };

  return (
    <div className="relative w-full min-h-screen flex items-start overflow-auto">
      {/* Tombol Hamburger Customize */}
      <button
        className="absolute top-4 left-4 z-40 bg-transparent text-black p-2 rounded-md md:hidden"
        onClick={() => setIsCustomizeOpen((prev) => !prev)}
      >
        {isCustomizeOpen ? "❌" : "☰"}
      </button>
      {/* Customize di Kiri */}
      <div
        className={`fixed top-0 left-0 h-full z-30 w-[300px] p-4 transform transition-transform duration-300 md:relative md:transform-none ${
          isCustomizeOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Tombol Back */}
        <button
          className="absolute top-6 left-6 bg-blue-600 text-black p-2 rounded-md"
          onClick={() => router.push("/catalog")}
        >
          &larr;
        </button>
        <div className="p-4 max-h-[90vh] overflow-auto  bg-white shadow-md rounded-lg border border-gray-300  ">
          <h2 className="text-xl font-bold text-indigo-700 mb-4 text-center">
            Kustomisasi Buket
          </h2>
          <CustomizeElement
            onSelectWrap={handleWrapSelect}
            onAddFlower={setSelectedFlowers}
            onRemoveFlower={setSelectedFlowers}
            onSelectRibbon={setSelectedRibbon}
            onSelectDecoration={setSelectedDecoration}
            selectedWrap={selectedWrap}
          />
        </div>
      </div>
      {/* Preview di Tengah */}
      <div className="relative flex-grow flex justify-center items-center z-10">
        <div className="w-[600px] max-w-full">
          <PreviewElement
            selectedWrap={selectedWrap}
            selectedFlowers={selectedFlowers}
            selectedRibbon={selectedRibbon}
            selectedDecoration={selectedDecoration}
          />
        </div>
      </div>
      {/* Tombol Hamburger Kalkulasi */}
      <button
        className="absolute top-4 right-4 z-40 bg-transparent text-black p-2 rounded-md md:hidden"
        onClick={() => setIsKalkulasiOpen((prev) => !prev)}
      >
        {isKalkulasiOpen ? "❌" : "☰"}
      </button>
      {/* Kalkulasi di Kanan */}
      <div
        className={`fixed top-0 right-0 h-full z-30 w-[300px] p-4 transform transition-transform duration-300 md:relative md:transform-none ${
          isKalkulasiOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 max-h-[90vh] overflow-auto  bg-white shadow-md rounded-lg border border-gray-300  ">
          <h2 className="text-xl font-bold text-indigo-700 mb-4 text-center">
            Kalkulasi Harga
          </h2>
          <KalkulasiElement
            selectedWrap={selectedWrap}
            selectedFlowers={selectedFlowers}
            selectedRibbon={selectedRibbon}
            selectedDecoration={selectedDecoration}
          />
        </div>
      </div>
    </div>
  );
}
