"use client";

export default function PreviewElement({
  selectedWrap,
  selectedFlowers,
  selectedRibbon,
  selectedDecoration,
}) {
  return (
    <div className="w-1/2 pl-4">
      <h3 className="text-lg font-semibold mb-4">Pratinjau Kustomisasi</h3>

      {selectedWrap && (
        <div className="text-center mb-6">
          <img
            src={selectedWrap.wrap_image || "/images/placeholder.jpg"}
            alt="Wrap Style"
            className="w-full max-w-md mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold">
            Wrap: {selectedWrap.wrap_name}
          </h2>
        </div>
      )}

      {selectedFlowers.map((flower, index) => (
        <div key={index} className="text-center mb-6">
          <img
            src={flower.flower_image || "/images/placeholder.jpg"}
            alt="Flower"
            className="w-24 h-24 mx-auto mb-2 object-cover"
          />
        </div>
      ))}

      {selectedRibbon && (
        <div className="text-center mb-6">
          <img
            src={selectedRibbon.ribbon_image || "/images/placeholder.jpg"}
            alt="Ribbon"
            className="w-24 h-24 mx-auto mb-2 object-cover"
          />
          <p>Ribbon: {selectedRibbon.ribbon_name}</p>
        </div>
      )}

      {selectedDecoration && (
        <div className="text-center mb-6">
          <img
            src={
              selectedDecoration.decoration_image || "/images/placeholder.jpg"
            }
            alt="Decoration"
            className="w-24 h-24 mx-auto mb-2 object-cover"
          />
          <p>Decoration: {selectedDecoration.decoration_name}</p>
        </div>
      )}
    </div>
  );
}
