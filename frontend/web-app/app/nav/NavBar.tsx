"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AiOutlineCar } from "react-icons/ai";
import Search from "./Search";
import Logo from "./Logo";
import LoginButton from "./LoginButton";
import { getCurrentUser } from "../action/authActions";
import UserActions from "./UserActions";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getCurrentUser();
      setUser(userData);
      setLoading(false);
    };
    fetchUser();
  }, []);

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
    <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 shadow-lg">
      <nav className="px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 md:h-18">
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-3 sm:px-4 py-2 text-white hover:text-blue-100 font-semibold transition-all duration-200 relative group text-sm sm:text-base"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-1 bg-orange-400 group-hover:w-full transition-all duration-300 rounded-full"></span>
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-2 sm:gap-3">
            {user ? (
              <UserActions user={user} />
            ) : (
              <>
                <LoginButton />
                <button className="px-4 sm:px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 text-sm sm:text-base">
                  Daftar
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-white hover:bg-blue-700 transition-colors"
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

        {/* Search Bar Below Navbar */}
        <div className="py-2 sm:py-3 md:py-4 border-t border-blue-400 hidden sm:block">
          <div className="w-full md:w-2/3 lg:w-1/2 mx-auto">
            <Search />
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="lg:hidden absolute left-0 right-0 top-full bg-white border-t-4 border-orange-400 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="px-3 sm:px-4 py-3 sm:py-4 space-y-2">
              <div className="py-2 sm:py-3 md:py-4 mb-3 border-b border-gray-200">
                <Search />
              </div>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block px-4 py-2 sm:py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 font-semibold rounded-lg transition-all duration-200 text-sm sm:text-base"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-3 border-t border-gray-200 mt-3 space-y-2">
                <LoginButton />
                <button className="w-full px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-700 text-white font-bold rounded-lg hover:shadow-lg transition-all duration-200 text-sm sm:text-base">
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
