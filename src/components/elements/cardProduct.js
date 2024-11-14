import { useRouter } from "next/navigation";

export default function CardProduct({ product }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/api/products/${product.product_id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer w-[48%] md:w-[28%] lg:w-[18%] h-auto bg-white border-[1px] md:border-[2px] border-blue/50 rounded-product drop-shadow-[2px_4px_2px_rgba(0,0,255,0.1)] dark:bg-black-800"
    >
      <img
        className="w-full h-48 object-cover rounded-button"
        src={product.product_image || "/images/placeholder.jpg"}
        alt={product.product_name}
      />
      <div className="p-3 h-20 md:h-24 flex flex-col justify-between border-t-[1px] md:border-t-[2px] border-t-blue/50">
        <div>
          <p className="text-sm md:text-base font-semibold md:font-bold tracking-wide text-black dark:text-white">
            {product.product_name}
          </p>
          <p className=" italic text-xxs md:text-xs text-black/50 dark:text-gray-400">
            {product.category_name}
          </p>
        </div>
        <p className="text-darkBlue text-xs md:text-sm font-medium md:font-semibold dark:text-gray-400">
          Rp.{" "}
          {product.price.toLocaleString("id-ID", { minimumFractionDigits: 2 })}
        </p>
      </div>
    </div>
  );
}
