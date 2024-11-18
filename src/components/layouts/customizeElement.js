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
  const [flowerColors, setFlowerColors] = useState([]); // Warna bunga berdasarkan pilihan bunga
  const [selectedFlower, setSelectedFlower] = useState(null); // Bunga yang dipilih dari dropdown
  const [ribbons, setRibbons] = useState([]);
  const [decorations, setDecorations] = useState([]);
  const [maxFlowers, setMaxFlowers] = useState(0); // Batas maksimum bunga
  const [selectedFlowers, setSelectedFlowers] = useState([]); // Bunga yang sudah dipilih

  useEffect(() => {
    const fetchData = async (type, setData) => {
      try {
        const response = await fetch(`/api/getElementsCustom?type=${type}`);
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

        // Set batas maksimum bunga berdasarkan size
        const sizeResponse = await fetch(
          `/api/selectedType?selectedType=size&category_id=${wrapData.category_id}`
        );
        const sizes = await sizeResponse.json();
        const currentSize = sizes.find(
          (size) => size.size_id === wrapData.size_id
        );
        setMaxFlowers(currentSize?.flower_count || 0);
      } catch (error) {
        console.error("Error fetching wrap styles or sizes:", error);
      }
    };

    fetchWrapStyles();
    fetchData("flower", setFlowers);
    fetchData("ribbon", setRibbons);
    fetchData("decoration", setDecorations);
  }, []);

  // Fetch warna bunga berdasarkan bunga yang dipilih
  const handleFlowerSelect = async (flowerId) => {
    setSelectedFlower(flowerId);
    try {
      const response = await fetch(
        `/api/getElementsCustom?type=flower_color&flower_id=${flowerId}`
      );
      const data = await response.json();
      setFlowerColors(data);
    } catch (error) {
      console.error("Error fetching flower colors:", error);
    }
  };

  // Tambah bunga ke dalam daftar
  const handleAddFlower = (flower) => {
    if (selectedFlowers.length < maxFlowers) {
      const updatedFlowers = [...selectedFlowers, flower];
      setSelectedFlowers(updatedFlowers);
      onAddFlower(updatedFlowers); // Kirim data ke komponen induk
    }
  };
  // Hapus bunga dari daftar berdasarkan urutan terakhir
  const handleRemoveLastFlower = () => {
    if (selectedFlowers.length > 0) {
      const updatedFlowers = selectedFlowers.slice(0, -1); // Hapus bunga terakhir
      setSelectedFlowers(updatedFlowers);
      onRemoveFlower(updatedFlowers); // Kirim data ke komponen induk
    }
  };

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
      <p className="text-gray-600 mb-2">
        {selectedFlowers.length}/{maxFlowers} Bunga Dipilih
      </p>

      <div className="flex flex-wrap gap-4">
        {flowers.map((flower) => (
          <div
            key={flower.flower_id}
            className={`p-2 border rounded-md cursor-pointer ${
              selectedFlowers.length >= maxFlowers
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            onClick={() => handleAddFlower(flower)}
          >
            <img
              src={flower.flower_image || "/images/placeholder.jpg"}
              className="h-16 w-16 object-cover"
              alt={flower.flower_name}
            />
          </div>
        ))}
      </div>

      <h3 className="text-lg font-semibold mt-6">Bunga yang Dipilih</h3>
      <div className="flex flex-wrap gap-4">
        {selectedFlowers.map((flower, index) => (
          <div key={index} className="p-2 border rounded-md cursor-pointer">
            <img
              src={flower.flower_image || "/images/placeholder.jpg"}
              className="h-16 w-16 object-cover"
              alt={flower.flower_name}
            />
          </div>
        ))}
        <button
          onClick={handleRemoveLastFlower}
          className="bg-red-500 text-white py-2 px-4 rounded-md disabled:opacity-50"
          disabled={selectedFlowers.length === 0}
        >
          Hapus Bunga Terakhir
        </button>
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
