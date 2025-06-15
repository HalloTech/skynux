"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const profileDropdownRef = useRef<HTMLDivElement | null>(null);
  const { data: session } = useSession();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleProfileDropdown = () => setIsProfileDropdownOpen(!isProfileDropdownOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };

    if (isMobileMenuOpen || isProfileDropdownOpen) {
      window.addEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isMobileMenuOpen, isProfileDropdownOpen]);

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <nav className="flex justify-between items-center px-6 py-4 max-w-6xl mx-auto">
        {/* Mobile Menu Icon */}
        <div className="text-3xl cursor-pointer lg:hidden" onClick={toggleMobileMenu}>
          &#9776;
        </div>

        {/* Logo */}
        <div className="lg:flex lg:items-center lg:space-x-3 lg:relative absolute left-1/2 transform -translate-x-1/2 lg:left-0 lg:translate-x-0">
          <Link href="/">
            <Image
              src="/images/logo/skynux-logo.png"
              alt="Logo"
              width={144}
              height={48}
              className="w-[9rem] h-12 object-cover"
            />
          </Link>
        </div>

        {/* Search Box */}
        <div className="hidden lg:flex flex-1 justify-center">
          <input
            type="text"
            placeholder="Search for jobs, projects..."
            className="w-72 px-3 py-2 border border-black rounded-full outline-none"
          />
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden lg:flex items-center space-x-4 ml-auto">
          <li>
            <Link href="/" className="text-gray-800 hover:text-violet-700 transition">Home</Link>
          </li>
          <li>
            <Link href="/post-jobs" className="text-gray-800 hover:text-violet-700 transition">Post Jobs</Link>
          </li>
          <li>
            <Link href="/browse-jobs" className="text-gray-800 hover:text-violet-700 transition">Browse Projects</Link>
          </li>
          <li>
            <Link href="/browse-talents" className="text-gray-800 hover:text-violet-700 transition">Browse Talents</Link>
          </li>
          
          {session ? (
            <li className="relative" ref={profileDropdownRef}>
              <button
                onClick={toggleProfileDropdown}
                className="focus:outline-none"
                aria-label="Toggle profile dropdown"
              >
                <Image
                  src={session.user?.image || "/images/default-avatar.png"}
                  alt="User Profile"
                  width={36}
                  height={36}
                  className="rounded-full border border-violet-600 hover:ring-2 ring-violet-400 transition"
                />
              </button>

              {isProfileDropdownOpen && (
                <div className="absolute right-0 top-12 bg-white shadow-lg rounded-lg py-2 w-48 z-50">
                  <Link href="/user-profile" className="block px-4 py-2 hover:bg-gray-100">Dashboard</Link>
                  <Link href="/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</Link>
                  <hr className="my-1" />
                  <button
                    onClick={() => signOut({ callbackUrl: "/login-signup" })}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </li>
          ) : (
            <li>
              <Link
                href="/login-signup"
                className="bg-violet-800 text-white py-1.5 px-6 rounded-full text-[15px] font-light hover:bg-violet-950 transition"
              >
                Login/Signup
              </Link>
            </li>
          )}
        </ul>

        {/* Mobile User Icon or Login */}
        <div className="ml-auto lg:hidden">
          {session ? (
            <div className="relative" ref={profileDropdownRef}>
              <button onClick={toggleProfileDropdown} className="flex items-center">
                <Image
                  src={session.user?.image || "/images/default-avatar.png"}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-violet-600"
                />
              </button>
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                  <Link href="/user-profile" className="block px-4 py-2 text-gray-800 hover:bg-violet-50">Dashboard</Link>
                  <Link href="/settings" className="block px-4 py-2 text-gray-800 hover:bg-violet-50">Settings</Link>
                  <hr className="my-2" />
                  <button
                    onClick={() => signOut({ callbackUrl: "/login-signup" })}
                    className="w-full text-left px-4 py-2 text-gray-800 hover:bg-violet-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login-signup"
              className="bg-violet-800 text-white py-2 px-4 rounded-full text-[15px] hover:bg-violet-950 transition duration-300"
            >
              Login
            </Link>
          )}
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          <button className="text-3xl mb-4 cursor-pointer text-right" onClick={toggleMobileMenu}>
            &times;
          </button>

          <ul className="space-y-4 flex-grow">
            <li><Link href="/" className="text-gray-800 hover:text-violet-700 transition">Home</Link></li>
            <li><Link href="/post-jobs" className="text-gray-800 hover:text-violet-700 transition">Post Jobs</Link></li>
            <li><Link href="/browse-jobs" className="text-gray-800 hover:text-violet-700 transition">Browse Projects</Link></li>
            <li><Link href="/browse-talents" className="text-gray-800 hover:text-violet-700 transition">Browse Talents</Link></li>
          </ul>

          <div className="mt-8 text-center">
            <div className="flex justify-center gap-4 mb-4">
              <a href="#" className="text-gray-700 hover:text-blue-600 transition"><i className="fab fa-linkedin text-2xl"></i></a>
              <a href="#" className="text-gray-700 hover:text-blue-500 transition"><i className="fab fa-twitter text-2xl"></i></a>
              <a href="#" className="text-gray-700 hover:text-pink-500 transition"><i className="fab fa-instagram text-2xl"></i></a>
              <a href="#" className="text-gray-700 hover:text-gray-900 transition"><i className="fab fa-github text-2xl"></i></a>
            </div>
            <p className="text-xs text-gray-600">&copy; 2025 Skynux. All rights reserved.</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
