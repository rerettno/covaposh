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
    // Reset all selected elements when a new wrap style is selected
    setSelectedWrap(wrap);
    setSelectedFlowers([]); // Reset flowers
    setSelectedRibbon(null); // Reset ribbon
    setSelectedDecoration(null); // Reset decoration
    localStorage.setItem("selectedWrap", JSON.stringify(wrap));
  };

  const handleAddFlower = (flower) => {
    if (selectedWrap && selectedFlowers.length < selectedWrap.flower_count) {
      setSelectedFlowers((prev) => [...prev, flower]);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Customize Page</h1>

      <div className="flex flex-row justify-between w-full max-w-4xl">
        <CustomizeElement
          onSelectWrap={setSelectedWrap}
          onAddFlower={handleAddFlower}
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
