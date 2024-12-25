import { useRouter } from "next/navigation";

export default function CardProduct({ product }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/api/products/${product.product_id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer group w-[45%] md:w-[30%] lg:w-[22%] xl:w-[18%] bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg hover:scale-[1.03] transition-transform duration-300 ease-in-out dark:bg-black-800 dark:border-gray-700"
    >
      {/* Image Section */}
      <div className="w-full aspect-[4/4] overflow-hidden rounded-t-lg">
        <img
          src={product.product_image || "/images/placeholder.jpg"}
          alt={product.product_name}
          className="w-full h-full object-cover transition-transform group-hover:scale-110"
        />
      </div>

      {/* Content Section */}
      <div className="p-2 md:p-4 flex flex-col justify-between h-fit">
        <div>
          <h3 className="text-xs md:text-base font-semibold text-gray-800 dark:text-white truncate">
            {product.product_name}
          </h3>
          <p className="text-xxs text-gray-500 dark:text-gray-400 italic mt-1">
            {product.category_name} / {product.size_name}
          </p>
        </div>

        <p className="text-darkBlue dark:text-gray-300 text-xs md:text-base font-bold mt-3">
          Rp.{" "}
          {Number(product.price).toLocaleString("id-ID", {
            maximumFractionDigits: 0,
          })}
          ,00
        </p>
      </div>
    </div>
  );
}
