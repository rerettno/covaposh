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
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Customize Buket</h1>
      <div className="flex w-full max-w-6xl">
        <CustomizeElement
          onSelectWrap={handleWrapSelect}
          onAddFlower={setSelectedFlowers}
          onRemoveFlower={setSelectedFlowers}
          onSelectRibbon={setSelectedRibbon}
          onSelectDecoration={setSelectedDecoration}
          selectedWrap={selectedWrap}
        />
        <PreviewElement
          selectedWrap={selectedWrap}
          selectedFlowers={selectedFlowers}
          selectedRibbon={selectedRibbon}
          selectedDecoration={selectedDecoration}
        />
      </div>
      <KalkulasiElement
        selectedWrap={selectedWrap}
        selectedFlowers={selectedFlowers}
        selectedRibbon={selectedRibbon}
        selectedDecoration={selectedDecoration}
      />
    </div>
  );
}
