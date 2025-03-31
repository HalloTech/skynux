"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      window.addEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <nav className="flex justify-between items-center px-6 py-4 max-w-6xl mx-auto">
        {/* Mobile Menu Button */}
        <div
          className="text-3xl cursor-pointer lg:hidden"
          onClick={toggleMobileMenu}
        >
          &#9776;
        </div>

        {/* Logo */}
        <div className="lg:flex lg:items-center lg:space-x-3 lg:relative absolute left-1/2 transform -translate-x-1/2 lg:left-0 lg:translate-x-0">
          <Link href="/" className="block">
            <Image
              src="/images/logo/skynux-logo.png"
              alt="Logo"
              width={144} // Adjust based on the actual size
              height={48}
              className="w-[9rem] h-12 object-cover"
            />
          </Link>
        </div>

        {/* Search Input (Desktop) */}
        <div className="hidden lg:flex flex-1 justify-center">
          <input
            type="text"
            placeholder="Search for jobs, projects..."
            className="w-72 px-3 py-2 border border-black rounded-full outline-none"
          />
        </div>

        {/* Navigation Links */}
        <ul className="hidden lg:flex space-x-4">
          <li>
            <Link href="/" className="text-gray-800 hover:text-violet-700 transition">
              Home
            </Link>
          </li>
          <li>
            <Link href="/post-jobs" className="text-gray-800 hover:text-violet-700 transition">
              Post Jobs
            </Link>
          </li>
          <li>
            <Link href="/browse-jobs" className="text-gray-800 hover:text-violet-700 transition">
              Browse Projects
            </Link>
          </li>
          <li>
            <Link href="/browse-talents" className="text-gray-800 hover:text-violet-700 transition">
              Browse Talents
            </Link>
          </li>
          <li>
            <Link href="/login-signup" className="bg-violet-800 text-white py-1.5 px-6 rounded-full text-[15px] font-light hover:bg-violet-950 transition duration-300">
              Login/Signup
            </Link>
          </li>
        </ul>

        {/* Mobile Login Button */}
        <div className="ml-auto lg:hidden">
          <Link href="/login-signup" className="bg-violet-800 text-white py-2 px-4 rounded-full text-[15px] hover:bg-violet-950 transition duration-300">
            Login
          </Link>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          {/* Close Button */}
          <button
            className="text-3xl mb-4 cursor-pointer text-right"
            onClick={toggleMobileMenu}
          >
            &times;
          </button>

          {/* Mobile Menu Links */}
          <ul className="space-y-4 flex-grow">
            <li>
              <Link href="/" className="text-gray-800 hover:text-violet-700 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/post-jobs" className="text-gray-800 hover:text-violet-700 transition">
                Post Jobs
              </Link>
            </li>
            <li>
              <Link href="/browse-jobs" className="text-gray-800 hover:text-violet-700 transition">
                Browse Projects
              </Link>
            </li>
            <li>
              <Link href="/browse-talents" className="text-gray-800 hover:text-violet-700 transition">
                Browse Talents
              </Link>
            </li>
            <li>
              <Link href="/login-signup" className="block bg-violet-800 text-white py-1.5 text-center rounded-full text-md font-light hover:bg-violet-950 transition duration-300">
                Login/Signup
              </Link>
            </li>
            <li>
              <div className="mt-6">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-3 py-2 border border-black rounded-full outline-none"
                />
              </div>
            </li>
          </ul>

          {/* Social Icons */}
          <div className="mt-8 text-center">
            <div className="flex justify-center gap-4 mb-4">
              <a href="#" className="text-gray-700 hover:text-blue-600 transition">
                <i className="fab fa-linkedin text-2xl"></i>
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-500 transition">
                <i className="fab fa-twitter text-2xl"></i>
              </a>
              <a href="#" className="text-gray-700 hover:text-pink-500 transition">
                <i className="fab fa-instagram text-2xl"></i>
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 transition">
                <i className="fab fa-github text-2xl"></i>
              </a>
            </div>
            <p className="text-xs text-gray-600">&copy; 2025 Skynux. All rights reserved.</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
