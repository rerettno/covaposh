"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="mt-12 md:mt-20 w-full bg-gray-100 mb-2 sm:-10 md:mb-20">
      <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between py-12 md:py-16 gap-8">
        {/* Left Side: Title & Description */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <h1 className="text-3xl sm:text-4xl  font-bold text-black leading-tight text-center">
            Every Bouquet Tells a Story
          </h1>
          <p className="text-sm sm:text-base  text-black/60 text-center mt-4">
            Find a design that speaks to your heart or create one that’s all
            your own.
          </p>
          <Link
            href="/catalog?category=Kustom%20Buket" // Tambahkan query parameter untuk filter
            className="text-darkBlue bg-lightBlue hover:bg-darkBlue hover:text-white rounded-lg shadow-lg text-sm px-6 py-3 flex items-center justify-center transition transform hover:scale-105"
          >
            Custom Your Product
            <svg
              className="w-4 h-4 ml-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
        </div>

        {/* Right Side: Image */}
        <div className="flex-[5%] h-72 md:h-96 relative flex items-center justify-center">
          <img
            src="/images/hero1.png"
            alt="Hero"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      <div className="bg-blue h-2 sm:h-8 md:h-16 absolute left-0 right-0 px-2 sm:px-4 lg:px-8 xl:px-14"></div>
    </section>
  );
}
