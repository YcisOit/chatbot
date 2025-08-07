'use client';
import Link from 'next/link';
import { useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { Heart, Menu, X, ChevronDown } from 'lucide-react'; // ✅ ADD ChevronDown

export default function MenuBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <nav className="text-black font-medium text-[17px] bg-white shadow-sm relative z-30">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center px-4 py-4">
        {/* Toggle Button for Mobile */}
        <button
          className="sm:hidden text-black focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Links and Buttons */}
        <div
          className={`w-full sm:flex sm:items-center sm:justify-between ${
            isOpen ? 'block' : 'hidden'
          } sm:w-auto`}
        >
          {/* Left Menu */}
          <div className="space-y-3 sm:space-y-0 sm:space-x-8 sm:flex items-center mt-4 sm:mt-0">
            <Link href="/" className="block hover:text-teal-500 transition">
              Home
            </Link>

            {/* Clickable Dropdown */}
            <div className="relative inline-block">
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-1 hover:text-teal-500 transition focus:outline-none"
              >
                Products
                <ChevronDown size={18} className={`${dropdownOpen ? 'rotate-180' : ''} transition-transform`} />
              </button>

              {dropdownOpen && (
                <div
                  className="absolute bg-white border text-black shadow-md mt-2 rounded-md z-20 w-44"
                  onMouseLeave={closeDropdown}
                >
                  <ul className="py-2">
                    <li>
                      <Link
                        href="/product#shop"
                        className="block px-4 py-2 hover:bg-teal-100 transition"
                        onClick={closeDropdown}
                      >
                        Stationery
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/product_sport"
                        className="block px-4 py-2 hover:bg-teal-100 transition"
                        onClick={closeDropdown}
                      >
                        Sports
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <Link href="/about" className="block hover:text-teal-500 transition">
              About
            </Link>
            <Link href="/contact" className="block hover:text-teal-500 pr-4 transition">
              Contact
            </Link>
          </div>

          {/* Right Buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center mt-4 sm:mt-0 space-y-3 sm:space-y-0 sm:space-x-6">
            <Link href="/wishlist">
              <button className="relative flex items-center overflow-hidden rounded-md bg-gray-600 group transition-all duration-300 hover:shadow-lg">
                <span className="absolute top-0 left-0 h-full w-0 bg-pink-600 transform -skew-x-20 transition-all duration-300 group-hover:w-10 z-10" />
                <span className="relative z-10 w-10 h-10 flex items-center justify-center text-white">
                  <Heart className="w-5 h-5" fill="currentColor" />
                </span>
                <span className="relative z-10 px-3 py-2 text-white text-sm font-semibold">
                  Wishlist
                </span>
              </button>
            </Link>

            <Link href="/login">
              <button className="bg-[#06bbcc] hover:bg-gray-700 px-5 py-2 rounded-md text-white font-semibold text-base flex items-center gap-2 transition">
                Login <CgProfile size={20} />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
