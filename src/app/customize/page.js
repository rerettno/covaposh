// app/customize/page.js
"use client";

import { useState, useEffect } from "react";
import CustomizeElement from "src/components/layouts/customizeElement";
import PreviewElement from "src/components/layouts/previewElement";
import KalkulasiElement from "src/components/layouts/kalkulasiElement";

export default function CustomizePage() {
  const [selectedWrap, setSelectedWrap] = useState(null);
  const [selectedFlowers, setSelectedFlowers] = useState([]);

  useEffect(() => {
    const savedWrap = JSON.parse(localStorage.getItem("selectedWrap"));
    if (savedWrap) setSelectedWrap(savedWrap);
  }, []);

  const handleWrapSelect = (wrap) => {
    setSelectedWrap(wrap);
    localStorage.setItem("selectedWrap", JSON.stringify(wrap));
  };

  const handleFlowerSelect = (flower) => {
    setSelectedFlowers((prevFlowers) => [...prevFlowers, flower]);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Customize Page</h1>

      <div className="flex flex-row justify-between w-full max-w-4xl">
        <CustomizeElement
          onSelectWrap={handleWrapSelect}
          selectedWrap={selectedWrap}
          onSelectFlower={handleFlowerSelect}
        />
        <PreviewElement
          selectedWrap={selectedWrap}
          selectedFlowers={selectedFlowers}
        />
      </div>

      <KalkulasiElement
        selectedWrap={selectedWrap}
        selectedFlowers={selectedFlowers}
      />
    </div>
  );
}
