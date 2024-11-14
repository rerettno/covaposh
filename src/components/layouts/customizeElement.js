"use client";

import { useState, useEffect } from "react";

export default function CustomizeElement({
  onSelectWrap,
  onAddFlower,
  onRemoveFlower,
  onSelectRibbon,
  onSelectDecoration,
}) {
  const [wrapStyles, setWrapStyles] = useState([]);
  const [flowers, setFlowers] = useState([]);
  const [ribbons, setRibbons] = useState([]);
  const [decorations, setDecorations] = useState([]);

  useEffect(() => {
    const fetchData = async (type, setData) => {
      try {
        const response = await fetch(`/api/elements?type=${type}`);
        if (!response.ok) throw new Error(`Failed to fetch ${type}`);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error(`Error fetching ${type}:`, error);
      }
    };

    // Fetch wrap styles berdasarkan kategori dan ukuran yang dipilih
    const fetchWrapStyles = async () => {
      const wrapData = JSON.parse(localStorage.getItem("selectedWrap"));
      if (!wrapData || !wrapData.category_id || !wrapData.size_id) return;

      try {
        const response = await fetch(
          `/api/wrapStyle?category_id=${wrapData.category_id}&size_id=${wrapData.size_id}`
        );
        const data = await response.json();
        setWrapStyles(data);
      } catch (error) {
        console.error("Error fetching wrap styles:", error);
      }
    };

    fetchWrapStyles();
    fetchData("flower", setFlowers);
    fetchData("ribbon", setRibbons);
    fetchData("decoration", setDecorations);
  }, []);

  return (
    <div className="w-1/2 border-r border-gray-300 pr-4">
      <h3 className="text-lg font-semibold mb-4">Pilih Wrap Style Lain</h3>
      <div className="flex flex-wrap gap-4 justify-start">
        {wrapStyles.map((wrap) => (
          <div
            key={wrap.wrap_id}
            onClick={() => onSelectWrap(wrap)}
            className="p-2 border rounded-md cursor-pointer"
          >
            <img
              src={wrap.wrap_image || "/images/placeholder.jpg"}
              className="h-20 w-20 object-cover"
            />
          </div>
        ))}
      </div>

      <h3 className="text-lg font-semibold mt-6">Pilih Bunga</h3>
      <div className="flex flex-wrap gap-4">
        {flowers.map((flower) => (
          <div
            key={flower.flower_id}
            className="p-2 border rounded-md cursor-pointer"
          >
            <img
              src={flower.flower_image || "/images/placeholder.jpg"}
              className="h-16 w-16 object-cover"
              alt={flower.flower_name}
              onClick={() => onAddFlower(flower)}
            />
          </div>
        ))}
      </div>

      <h3 className="text-lg font-semibold mt-6">Pilih Ribbon</h3>
      <div className="flex flex-wrap gap-4">
        {ribbons.map((ribbon) => (
          <div
            key={ribbon.ribbon_id}
            onClick={() => onSelectRibbon(ribbon)}
            className="p-2 border rounded-md cursor-pointer"
          >
            <img
              src={ribbon.ribbon_image || "/images/placeholder.jpg"}
              className="h-16 w-16 object-cover"
            />
          </div>
        ))}
      </div>

      <h3 className="text-lg font-semibold mt-6">Pilih Dekorasi</h3>
      <div className="flex flex-wrap gap-4">
        {decorations.map((decoration) => (
          <div
            key={decoration.decoration_id}
            onClick={() => onSelectDecoration(decoration)}
            className="p-2 border rounded-md cursor-pointer"
          >
            <img
              src={decoration.decoration_image || "/images/placeholder.jpg"}
              className="h-16 w-16 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
