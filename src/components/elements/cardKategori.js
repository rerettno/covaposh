import { useRouter } from "next/navigation";

export default function CardKategori({ category_name, category_image }) {
  const router = useRouter();

  const handleCategoryClick = () => {
    router.push(`/catalog?category=${encodeURIComponent(category_name)}`);
  };

  return (
    <div
      className="card bg-lightBlue p-1 min-w-[150px] lg:w-[18%] h-auto sm:h-[150px] md:h-[200px] lg:h-[280px] rounded-product drop-shadow-[2px_4px_2px_rgba(0,0,255,0.1)] cursor-pointer"
      onClick={handleCategoryClick} // Navigasi saat diklik
    >
      <div className="card-body p-2 items-center h-full">
        <img
          src={category_image}
          alt={category_name}
          className="h-20 sm:h-24 md:h-32 lg:h-48 object-contain transition duration-500 group-hover:scale-110"
        />
        <p className="sm:mt-1 md:mt-2 lg:mt-4 text-xs sm:text-sm md:text-base text-black italic text-center">
          {category_name}
        </p>
      </div>
    </div>
  );
}
