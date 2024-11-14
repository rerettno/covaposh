// app/customize/PreviewElement.js
"use client";

export default function PreviewElement({ selectedWrap, selectedFlowers }) {
  return (
    <div className="w-1/2 pl-4">
      <h3 className="text-lg font-semibold mb-4">Preview Buket</h3>
      <div className="text-center">
        {selectedWrap && (
          <div className="mb-6">
            <img
              src={selectedWrap.wrap_image || "/images/placeholder.jpg"}
              alt={selectedWrap.wrap_name || "Wrap Style"}
              className="w-full max-w-md mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold">
              {selectedWrap.wrap_name || "Wrap Style"}
            </h2>
          </div>
        )}

        <div className="flex flex-wrap gap-4 justify-center">
          {selectedFlowers.map((flower, index) => (
            <div key={index} className="text-center">
              <img
                src={flower.flower_image || "/images/placeholder.jpg"}
                alt={flower.color_name}
                className="h-20 w-20 object-cover mx-auto"
              />
              <p className="text-sm mt-2">{flower.color_name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
