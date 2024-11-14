// app/customize/CustomizeElement.js
"use client";

import { useState, useEffect } from "react";

export default function CustomizeElement({
  onSelectWrap,
  selectedWrap,
  onSelectFlower,
}) {
  const [wrapStyles, setWrapStyles] = useState([]);
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    const fetchWrapStyles = async () => {
      try {
        const wrapData =
          selectedWrap || JSON.parse(localStorage.getItem("selectedWrap"));
        if (!wrapData || !wrapData.category_id || !wrapData.size_id) return;

        const response = await fetch(
          `/api/wrapStyle?category_id=${wrapData.category_id}&size_id=${wrapData.size_id}`
        );
        if (!response.ok) throw new Error("Gagal mengambil data wrap styles");

        const data = await response.json();
        setWrapStyles(data);
      } catch (error) {
        console.error("Error fetching wrap styles:", error);
      }
    };

    const fetchFlowers = async () => {
      try {
        const response = await fetch("/api/flowers");
        if (!response.ok) throw new Error("Gagal mengambil data bunga");

        const data = await response.json();
        setFlowers(data);
      } catch (error) {
        console.error("Error fetching flowers:", error);
      }
    };

    fetchWrapStyles();
    fetchFlowers();
  }, [selectedWrap]);

  return (
    <div className="w-1/2 border-r border-gray-300 pr-4">
      <h3 className="text-lg font-semibold mb-4">Pilih Wrap Style Lain</h3>
      <div className="flex flex-wrap gap-4 justify-start">
        {wrapStyles.map((wrap) => (
          <div
            key={wrap.wrap_id}
            className={`p-2 border rounded-md ${
              selectedWrap?.wrap_id === wrap.wrap_id
                ? "border-blue-500"
                : "border-gray-300"
            }`}
            onClick={() => onSelectWrap(wrap)}
          >
            <img
              src={wrap.wrap_image || "/images/placeholder.jpg"}
              className="h-20 w-20 object-cover cursor-pointer"
              alt={wrap.wrap_name}
            />
          </div>
        ))}
      </div>

      <h3 className="text-lg font-semibold mt-8 mb-4">Pilih Bunga</h3>
      <div className="flex flex-wrap gap-4 justify-start">
        {flowers.map((flower) => (
          <div key={flower.flower_id} className="flex flex-col items-center">
            <h4 className="text-sm font-medium">{flower.flower_name}</h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {flower.colors.map((color) => (
                <div
                  key={color.color_id}
                  className="p-2 border rounded-md"
                  onClick={() => onSelectFlower(color)}
                >
                  <img
                    src={color.flower_image || "/images/placeholder.jpg"}
                    alt={color.color_name}
                    className="h-20 w-20 object-cover cursor-pointer"
                  />
                  <p className="text-xs text-center mt-1">{color.color_name}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
