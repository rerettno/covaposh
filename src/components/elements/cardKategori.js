export default function CardKategori({ category_name, category_image }) {
  return (
    <div className="card bg-lightBlue p-1 min-w-[120px] lg:w-[18%] h-auto rounded-product drop-shadow-[2px_4px_2px_rgba(0,0,255,0.1)] ">
      <div className="card-body p-2 flex flex-col justify-between  group">
        <img
          src={category_image}
          alt={category_name}
          className="h-20 lg:h-32 object-contain transition duration-500 group-hover:scale-110"
        />
        <p className="text-xs md:text-sm text-black italic text-center ">
          {category_name}
        </p>
      </div>
    </div>
  );
}
