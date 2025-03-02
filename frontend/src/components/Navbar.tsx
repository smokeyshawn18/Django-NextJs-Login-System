"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // Install react-icons for hamburger/close icons

export default function Navbar() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu toggle

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    handleStorageChange();
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("authChange", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("authChange", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("authChange"));
    setIsMenuOpen(false); // Close menu on logout
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Brand */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight hover:text-gray-300 transition-colors"
        >
          My Blog
        </Link>

        {/* Hamburger Menu Button (Visible on Mobile) */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 items-center">
          <li>
            <Link
              href="/"
              className={`text-lg hover:text-gray-300 transition-colors ${
                pathname === "/" ? "underline" : ""
              }`}
            >
              Home
            </Link>
          </li>
          {isLoggedIn ? (
            <li>
              <button
                onClick={handleLogout}
                className="text-lg hover:text-gray-300 transition-colors bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link
                  href="/login"
                  className={`text-lg hover:text-gray-300 transition-colors ${
                    pathname === "/login" ? "underline" : ""
                  }`}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className={`text-lg hover:text-gray-300 transition-colors ${
                    pathname === "/signup" ? "underline" : ""
                  }`}
                >
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Menu (Visible when toggled) */}
        <div
          className={`fixed inset-0 bg-gray-900 bg-opacity-95 z-50 transform transition-transform md:hidden ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-end p-4">
            <button
              className="text-2xl focus:outline-none"
              onClick={toggleMenu}
              aria-label="Close menu"
            >
              <FaTimes />
            </button>
          </div>
          <ul className="flex flex-col items-center space-y-6 mt-20">
            <li>
              <Link
                href="/"
                onClick={toggleMenu}
                className={`text-xl hover:text-gray-300 transition-colors ${
                  pathname === "/" ? "underline" : ""
                }`}
              >
                Home
              </Link>
            </li>
            {isLoggedIn ? (
              <li>
                <button
                  onClick={handleLogout}
                  className="text-xl hover:text-gray-300 transition-colors bg-red-600 px-6 py-2 rounded-lg hover:bg-red-700"
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    href="/login"
                    onClick={toggleMenu}
                    className={`text-xl hover:text-gray-300 transition-colors ${
                      pathname === "/login" ? "underline" : ""
                    }`}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/signup"
                    onClick={toggleMenu}
                    className={`text-xl hover:text-gray-300 transition-colors ${
                      pathname === "/signup" ? "underline" : ""
                    }`}
                  >
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
