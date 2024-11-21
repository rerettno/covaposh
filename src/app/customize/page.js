"use client";

import { useState, useEffect } from "react";
import CustomizeElement from "src/components/layouts/customizeElement";
import PreviewElement from "src/components/layouts/previewElement";
import KalkulasiElement from "src/components/layouts/kalkulasiElement";

export default function CustomizePage() {
  const [selectedWrap, setSelectedWrap] = useState(null);
  const [selectedFlowers, setSelectedFlowers] = useState([]);
  const [selectedRibbon, setSelectedRibbon] = useState(null);
  const [selectedDecoration, setSelectedDecoration] = useState(null);

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
    <div className="relative w-full min-h-screen bg-gray-100 flex justify-center items-center">
      {/* Preview di Tengah */}
      <div className="absolute w-full max-w-3xl z-0 flex justify-center">
        <PreviewElement
          selectedWrap={selectedWrap}
          selectedFlowers={selectedFlowers}
          selectedRibbon={selectedRibbon}
          selectedDecoration={selectedDecoration}
        />
      </div>

      {/* Customize di Kiri */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-4 border border-gray-800 bg-white shadow-md rounded-lg max-h-[90vh] overflow-auto">
        <CustomizeElement
          onSelectWrap={handleWrapSelect}
          onAddFlower={setSelectedFlowers}
          onRemoveFlower={setSelectedFlowers}
          onSelectRibbon={setSelectedRibbon}
          onSelectDecoration={setSelectedDecoration}
          selectedWrap={selectedWrap}
        />
      </div>

      {/* Kalkulasi di Kanan */}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-4 bg-white shadow-md rounded-lg max-h-[90vh] overflow-auto">
        <KalkulasiElement
          selectedWrap={selectedWrap}
          selectedFlowers={selectedFlowers}
          selectedRibbon={selectedRibbon}
          selectedDecoration={selectedDecoration}
        />
      </div>
    </div>
  );
}
