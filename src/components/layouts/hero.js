"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Hero() {
  return (
    <>
      <div className="mt-[50px] md:mt-[80px] relative w-full h-auto md:h-[500px] bg-gray-100 flex flex-col md:flex-row items-center justify-center px-4 md:px-8 py-8">
        {/* Left Side: Title & Description */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center space-y-2 md:space-y-4 text-center ">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black">
            Explore the Beauty of Nature
          </h1>
          <p className="text-xxs sm:text-xs md:text-sm text-black/50">
            Discover our exclusive collection of the freshest and most beautiful
            flowers for all occasions.
          </p>
          <ul className="mt-8 flex justify-center gap-6 sm:mt-0 lg:justify-end">
            <li>
              <a
                href="#"
                rel="noreferrer"
                target="_blank"
                className=" transition hover:opacity-75"
              >
                <span className="sr-only">WhatsApp</span>
                {/* WhatsApp Icon with Image */}
                <img
                  src="/images/whatsapp.png"
                  alt="WhatsApp"
                  className="w-6 h-6 "
                />
              </a>
            </li>

            <li>
              <a
                href="#"
                rel="noreferrer"
                target="_blank"
                className="text-black transition hover:opacity-75"
              >
                <span className="sr-only">Instagram</span>
                <svg
                  className="size-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>

            <li>
              <a
                href="#"
                rel="noreferrer"
                target="_blank"
                className="text-gray-700 transition hover:opacity-75"
              >
                <span className="sr-only">Maps</span>
                {/* Maps Icon with Image */}
                <img src="/images/map.png" alt="Maps" className="w-6 h-6" />
              </a>
            </li>
          </ul>

          <Link
            href="/catalog"
            class="text-darkBlue bg-lightBlue hover:bg-darkBlue hover:text-white rounded-product drop-shadow-[2px_2px_2px_rgba(0,0,255,0.2)]  text-sm px-5 py-2.5 w-fit flex items-center transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-blue"
          >
            Go To Catalog
            <svg
              className="w-4 h-4 ms-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
        </div>

        {/* Right Side: Image Slider */}
        <div className="w-full md:w-1/2 relative h-72 md:h-96 mt-8 md:mt-0 flex items-center justify-center">
          {/* Image 1 */}
          <img
            src="/images/hero1.png"
            className={`absolute w-fit transition-opacity duration-1000  
            }`}
            alt="Flower 1"
          />
        </div>
      </div>
      <div className="bg-blue h-5 md:mt-4"></div>
    </>
  );
}
