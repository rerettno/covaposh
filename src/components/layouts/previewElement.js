"use client";

import React from "react";

// Template tata letak dasar
const baseTemplate = [
  { type: "flower", id: 5, top: "20px", left: "80px", zIndex: 2 },
  { type: "decoration", id: 1, top: "40px", left: "120px", zIndex: 1 },
  { type: "flower", id: 4, top: "20px", left: "160px", zIndex: 2 },
  { type: "decoration", id: 2, top: "60px", left: "100px", zIndex: 1 },
  { type: "flower", id: 3, top: "80px", left: "120px", zIndex: 2 },
  { type: "decoration", id: 3, top: "100px", left: "60px", zIndex: 1 },
  { type: "flower", id: 2, top: "140px", left: "80px", zIndex: 2 },
  { type: "decoration", id: 4, top: "120px", left: "160px", zIndex: 1 },
  { type: "flower", id: 1, top: "140px", left: "160px", zIndex: 2 },
];

// Elemen tambahan untuk ukuran yang lebih besar
const sizeAdditions = {
  medium: [
    { type: "decoration", id: 5, top: "20px", left: "40px", zIndex: 1 },
    { type: "flower", id: 9, top: "20px", left: "120px", zIndex: 2 },
    { type: "decoration", id: 6, top: "20px", left: "200px", zIndex: 1 },
    { type: "flower", id: 6, top: "100px", left: "40px", zIndex: 2 },
    { type: "flower", id: 8, top: "100px", left: "200px", zIndex: 2 },
    { type: "flower", id: 7, top: "180px", left: "120px", zIndex: 2 },
  ],
  large: [
    { type: "flower", id: 12, top: "0px", left: "60px", zIndex: 2 },
    { type: "decoration", id: 7, top: "0px", left: "100px", zIndex: 1 },
    { type: "flower", id: 11, top: "0px", left: "140px", zIndex: 2 },
    { type: "flower", id: 13, top: "60px", left: "40px", zIndex: 2 },
    { type: "decoration", id: 8, top: "60px", left: "200px", zIndex: 1 },
    { type: "flower", id: 10, top: "100px", left: "220px", zIndex: 2 },
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
  const sizeMap = {
    5: "small",
    6: "medium",
    7: "large",
  };

  const size = sizeMap[selectedWrap?.size_id] || "small";
  const layout = generateTemplate(size);

  return (
    <div className="relative w-[400px] h-[400px] mx-auto bg-gray-100 rounded-md shadow-md">
      {/* Wrap Style */}
      {selectedWrap && (
        <img
          src={selectedWrap.wrap_image || "/images/placeholder.jpg"}
          alt="Wrap Style"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      )}

      {/* Flowers */}
      {layout
        .filter((item) => item.type === "flower")
        .map((flowerPosition, index) => {
          const flower = selectedFlowers[index];
          return flower ? (
            <div
              key={`flower-${index}`}
              className="absolute"
              style={{
                top: flowerPosition.top,
                left: flowerPosition.left,
                zIndex: flowerPosition.zIndex,
              }}
            >
              <img
                src={flower.flower_image || "/images/placeholder.jpg"}
                alt={`Flower ${index + 1}`}
                className="w-10 h-10 object-cover rounded-full"
              />
            </div>
          ) : null;
        })}

      {/* Decorations */}
      {selectedDecoration &&
        layout
          .filter((item) => item.type === "decoration")
          .map((decoPosition, index) => (
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
                className="w-8 h-8 object-cover"
              />
            </div>
          ))}

      {/* Ribbon */}
      {selectedRibbon && (
        <div
          className="absolute"
          style={{
            top: "300px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 3,
          }}
        >
          <img
            src={selectedRibbon.ribbon_image || "/images/placeholder.jpg"}
            alt="Ribbon"
            className="w-32 h-10 object-cover rounded-md"
          />
        </div>
      )}
    </div>
  );
}
