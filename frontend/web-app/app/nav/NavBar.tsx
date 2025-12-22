"use client";

import { useState } from "react";
import Link from "next/link";
import { AiOutlineCar } from "react-icons/ai";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Daftar Mobil", href: "/cars" },
    { name: "Cara Kerja", href: "/how-it-works" },
    { name: "Tentang Kami", href: "/about" },
    { name: "Kontak", href: "/contact" },
  ];

  return (
    <header className="bg-linear-to-r from-sky-50 to-blue-50 shadow-md sticky top-0 z-50 w-full">
      <nav className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-linear-to-br from-sky-400 to-blue-500 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <span className="text-white font-bold text-lg">
                <AiOutlineCar size={30} />
              </span>
            </div>
            <span className="text-xl font-bold text-gray-800 inline">
              Lemobil
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-sky-400 to-blue-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button className="px-5 py-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors">
              Masuk
            </button>
            <button className="px-5 py-2 bg-linear-to-r from-sky-400 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg hover:from-sky-500 hover:to-blue-600 transition-all duration-200">
              Daftar
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-gray-700 hover:bg-blue-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className={`w-6 h-6 transition-transform duration-300 ${
                isOpen ? "rotate-90" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden absolute left-0 right-0 top-16 bg-white border-t border-gray-200 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block px-4 py-3 text-gray-700 hover:bg-sky-50 hover:text-blue-600 font-medium rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-2 border-t border-gray-200 mt-2 space-y-2">
                <button className="w-full px-4 py-2 text-blue-600 font-semibold hover:bg-sky-50 rounded-lg transition-colors">
                  Masuk
                </button>
                <button className="w-full px-4 py-2 bg-linear-to-r from-sky-400 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200">
                  Daftar
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
