import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsHash } from "react-icons/bs";

export default function Navbar() {
  return (
    <div>
      <div className="container mx-auto flex items-center justify-between  pt-4">
        <Link href={"/"} className="flex gap-2 items-center">
          <Image
            src={"/logo.svg"}
            width={100}
            height={100}
            alt="Gallerio Logo"
            className="w-10 h-10"
          />
          <p className="text-lg font-bold hover:subpixel-antialiased">
            Gallerio
          </p>
        </Link>

        <form class="md:flex items-center hidden">
          <label for="simple-search" class="sr-only">
            Search
          </label>
          <div class="relative w-full lg:w-[500px] ">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <BsHash className="w-4 h-4 text-gray-400" />
            </div>
            <input
              type="text"
              id="simple-search"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:outline-none focus:ring-gray-500 focus:border-gray-600 block w-full pl-10 p-2.5"
              placeholder="Search Image..."
              required
            />
          </div>
          <button
            type="submit"
            class="p-2.5 ml-2 text-sm font-medium text-slate-50 bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 "
          >
            <svg
              class="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span class="sr-only">Search</span>
          </button>
        </form>
        <Link href={"/"}>
          <button
            type="submit"
            class="text-neutral-900 bg-gray-200 hover:bg-gray-100 focus:ring-1 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center hover:subpixel-antialiased "
          >
            Login
          </button>
        </Link>
      </div>
    </div>
  );
}
