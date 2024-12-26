import Link from "next/link";
import React from "react";
import { HiBars3BottomLeft } from "react-icons/hi2";

export default function Navbar() {
  return (
    <div className="navbar bg-white text-darkBlue h-[10px] sm:h-[70px]  fixed top-0 left-0 right-0 px-2 sm:px-4 lg:px-8 xl:px-14 z-20 ">
      {/* Navbar Start */}
      <div className="navbar-start pl-0">
        <div className="dropdown dropdown-hover lg:hidden">
          <button
            tabIndex={0}
            className="btn btn-ghost btn-circle w-6 sm:w-8 md:w-12 text-darkBlue rounded-product hover:bg-transparent hover:text-lightBlue"
          >
            <HiBars3BottomLeft className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white rounded-product z-[1] mt-3 w-52 p-2  shadow"
          >
            <li className="rounded-button hover:bg-lightBlue">
              <Link href="/">Home</Link>
            </li>
            <li className="rounded-button hover:bg-lightBlue">
              <Link href="/catalog">Catalog</Link>
            </li>
            <li className="rounded-button hover:bg-lightBlue">
              <Link href="/catalog?category=Kustom%20Buket&from=customize">
                Customize
              </Link>
            </li>

            <li className="rounded-button hover:bg-lightBlue">
              <Link href="https://api.whatsapp.com/send/?phone=6285716261499&text&type=phone_number&app_absent=0">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Menu Horizontal untuk layar besar */}
        <div className="hidden lg:block">
          <ul className="menu menu-horizontal p-0 space-x-1 lg:space-x-3 tracking-wide text-base">
            <li className="relative group ">
              <Link href="/" className="relative z-10  hover:bg-lightBlue">
                Home
              </Link>
              <span className="absolute -top-[18px] left-0 h-[100%] w-full bg-lightBlue hover:bg-transparent transform scale-0 group-hover:scale-100 transition ease-in-out duration-100  rounded-none"></span>
            </li>
            <li className="relative group">
              <Link
                href="/catalog"
                className="relative z-10  hover:bg-lightBlue"
              >
                Catalog
              </Link>
              <span className="absolute -top-[18px] left-0 h-[100%] w-full bg-lightBlue hover:bg-transparent transform scale-0 group-hover:scale-100 transition ease-in-out duration-100  rounded-none"></span>
            </li>
            <li className="relative group">
              <Link
                href="/catalog?category=Kustom%20Buket&from=customize"
                className="relative z-10  hover:bg-lightBlue"
              >
                Customize
              </Link>
              <span className="absolute -top-[18px] left-0 h-[100%] w-full bg-lightBlue hover:bg-transparent transform scale-0 group-hover:scale-100 transition ease-in-out duration-100  rounded-none"></span>
            </li>
            <li className="text-darkBlue border border-darkBlue hover:bg-darkBlue hover:text-white rounded-product ">
              <Link href="https://api.whatsapp.com/send/?phone=6285716261499&text&type=phone_number&app_absent=0">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Navbar End */}
      <div className="navbar-end flex flex-col items-end ">
        <a className="text-xxs sm:text-sm leading-none">Yogyakarta Bouquet</a>
        <a className="text-base sm:text-xl md:text-2xl font-semibold leading-none">
          COVAPOSH
        </a>
      </div>
    </div>
  );
}
