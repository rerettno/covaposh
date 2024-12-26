"use client";

import React, { useRef } from "react";
import { toPng } from "html-to-image";

// Template tata letak dasar
const baseTemplate = [
  { type: "flower", id: 5, top: "400px", left: "240px", zIndex: 4 },
  { type: "flower", id: 4, top: "370px", left: "300px", zIndex: 3 },
  { type: "flower", id: 3, top: "405px", left: "360px", zIndex: 3 },
  { type: "flower", id: 2, top: "320px", left: "350px", zIndex: 2 },
  { type: "flower", id: 1, top: "320px", left: "250px", zIndex: 2 },
  { type: "flower", id: 9, top: "350px", left: "190px", zIndex: 2 },
  { type: "flower", id: 6, top: "440px", left: "300px", zIndex: 4 },
  { type: "flower", id: 8, top: "350px", left: "420px", zIndex: 2 },
  { type: "flower", id: 7, top: "270px", left: "300px", zIndex: 2 },
  { type: "decoration", id: 1, top: "315px", left: "195px", zIndex: 3 },
  { type: "decoration", id: 2, top: "360px", left: "250px", zIndex: 3 },
  { type: "decoration", id: 3, top: "320px", left: "310px", zIndex: 2 },
  { type: "decoration", id: 4, top: "280px", left: "250px", zIndex: 2 },
  { type: "decoration", id: 5, top: "340px", left: "140px", zIndex: 2 },
  { type: "decoration", id: 6, top: "360px", left: "360px", zIndex: 2 },
  { type: "decoration", id: 7, top: "230px", left: "190px", zIndex: 1 },
  { type: "decoration", id: 8, top: "230px", left: "320px", zIndex: 1 },
];

// Elemen tambahan untuk ukuran yang lebih besar
const sizeAdditions = {
  medium: [
    { type: "flower", id: 12, top: "260px", left: "180px", zIndex: 1 },
    { type: "flower", id: 11, top: "220px", left: "240px", zIndex: 1 },
    { type: "flower", id: 13, top: "230px", left: "370px", zIndex: 1 },
    { type: "flower", id: 10, top: "280px", left: "450px", zIndex: 1 },
    { type: "decoration", id: 9, top: "260px", left: "130px", zIndex: 1 },
    { type: "decoration", id: 10, top: "180px", left: "250px", zIndex: 1 },
    { type: "decoration", id: 11, top: "270px", left: "380px", zIndex: 1 },
  ],
  large: [
    { type: "flower", id: 14, top: "380px", left: "120px", zIndex: 3 },
    { type: "flower", id: 15, top: "300px", left: "100px", zIndex: 2 },
    { type: "flower", id: 16, top: "210px", left: "120px", zIndex: 1 },
    { type: "flower", id: 17, top: "170px", left: "320px", zIndex: 2 },
    { type: "flower", id: 18, top: "200px", left: "450px", zIndex: 0 },
    { type: "flower", id: 19, top: "340px", left: "500px", zIndex: 2 },
    { type: "flower", id: 20, top: "420px", left: "460px", zIndex: 3 },
    { type: "decoration", id: 12, top: "290px", left: "90px", zIndex: 2 },
    { type: "decoration", id: 13, top: "220px", left: "80px", zIndex: 1 },
    { type: "decoration", id: 14, top: "140px", left: "340px", zIndex: 0 },
    { type: "decoration", id: 15, top: "200px", left: "380px", zIndex: 0 },
    { type: "decoration", id: 16, top: "330px", left: "420px", zIndex: 2 },
  ],
};

// Menghasilkan template berdasarkan ukuran
const generateTemplate = (size) => {
  let template = [...baseTemplate];
  if (size === "medium") {
    template = [...template, ...sizeAdditions.medium];
  } else if (size === "large") {
    template = [...template, ...sizeAdditions.medium, ...sizeAdditions.large];
  }
  return template;
};

export default function PreviewElement({
  selectedWrap,
  selectedFlowers,
  selectedRibbon,
  selectedDecoration,
}) {
  const previewRef = useRef();

  const handleDownload = async () => {
    if (previewRef.current) {
      try {
        const dataUrl = await toPng(previewRef.current, { quality: 1 });
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "customized-bouquet.png";
        link.click();
      } catch (error) {
        console.error("Error generating image:", error);
      }
    }
  };

  const sizeMap = {
    5: "small",
    6: "medium",
    7: "large",
  };

  const size = sizeMap[selectedWrap?.size_id] || "small";
  const layout = generateTemplate(size);

  return (
    <div className="relative w-[600px] h-[720px] mx-auto border">
      {/* Area yang akan diambil sebagai gambar */}
      <div ref={previewRef} className="relative w-full h-full bg-white">
        {selectedWrap && (
          <img
            src={selectedWrap.wrap_image || "/images/placeholder.jpg"}
            alt="Wrap Style"
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 object-cover z-0"
          />
        )}
        {/* Wrap Style */}
        {selectedWrap && (
          <img
            src={selectedWrap.wrap_image || "/images/placeholder.jpg"}
            alt="Wrap Style"
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 object-cover z-0"
          />
        )}

        {/* Flowers */}
        {layout
          .filter((item) => item.type === "flower")
          .map((flowerPosition, index) => {
            const flower = selectedFlowers[index];
            return (
              <div
                key={`flower-${index}`}
                className="absolute flex justify-center items-center text-center"
                style={{
                  top: flowerPosition.top,
                  left: flowerPosition.left,
                  zIndex: flowerPosition.zIndex,
                  transform: "translate(-50%, -50%)", // Pastikan bunga terpusat
                }}
              >
                {flower ? (
                  <img
                    src={flower.flower_image || "/images/placeholder.jpg"}
                    alt={`Flower ${index + 1}`}
                    className="w-[80px] h-[80px] object-cover rounded-full"
                  />
                ) : (
                  <span className="text-sm font-bold text-gray-500 flex justify-center items-center w-10 h-10 rounded-full border-2 border-dashed border-gray-400">
                    {index + 1}
                  </span>
                )}
              </div>
            );
          })}

        {/* Decorations */}
        {layout
          .filter((item) => item.type === "decoration")
          .map(
            (decoPosition, index) =>
              selectedDecoration && (
                <div
                  key={`decoration-${index}`}
                  className="absolute"
                  style={{
                    top: decoPosition.top,
                    left: decoPosition.left,
                    zIndex: decoPosition.zIndex,
                  }}
                >
                  <img
                    src={selectedDecoration.decoration_image}
                    alt="Decoration"
                    className="w-[100px] h-[100px] object-cover"
                  />
                </div>
              )
          )}

        {/* Ribbon */}
        {selectedRibbon && (
          <div className="absolute bottom-[2%] left-1/2 transform -translate-x-1/2 z-10 flex justify-center items-center">
            <img
              src={selectedRibbon?.ribbon_image || "/images/placeholder.jpg"}
              alt="Ribbon"
              className="w-1/2 h-auto object-cover rounded-md"
            />
          </div>
        )}
      </div>
      {/* Tombol Unduh */}
      <button
        onClick={handleDownload}
        className="absolute top-4 right-4 bg-blue-500 text-black py-2 px-4 rounded-md"
      >
        Unduh Gambar
      </button>
    </div>
  );
}
