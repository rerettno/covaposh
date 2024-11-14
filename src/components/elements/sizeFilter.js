export default function SizeFillter() {
  return (
    <span className="flex justify-between -space-x-px overflow-hidden border border-blue bg-white shadow-sm w-full">
      <button className="inline-block px-4 py-2 text-sm font-medium text-black/50  hover:bg-blue hover:text-black focus:relative border border-blue w-full">
        Kecil
      </button>

      <button className="inline-block px-4 py-2 text-sm font-medium text-black/50  hover:bg-blue hover:text-black focus:relative border border-blue w-full">
        Sedang
      </button>

      <button className="inline-block px-4 py-2 text-sm font-medium text-black/50  hover:bg-blue hover:text-black focus:relative border border-blue w-full">
        Besar
      </button>
    </span>
  );
}
