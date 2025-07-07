"use client";
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  // Simulate authentication state
  const isAuthenticated = true; // Replace with actual auth logic
  const user = { name: "John Doe", role: "restaurant" }; // Replace with actual user data

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo/Brand Name */}
     <div className="flex items-center space-x-2">
          <img
            src="/images/logo.png"
            alt="App Logo"
            className="w-10 h-10 rounded-full"
          />
          <h1 className="text-xl font-bold text-green-600">AgroConnect</h1>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <a href="/dashboard" className="hover:text-green-600">
            Dashboard
          </a>
          <a href="/contracts" className="sm:hidden hover:text-green-600">
            Contracts
          </a>
          
          <a href="/restaurants" className="hover:text-green-600">
            Restaurants
          </a>
          
        </div>

        {/* Search Bar */}
        <div className="flex-grow max-w-sm hidden md:block">
          <input
            type="text"
            placeholder="Search contracts, farmers, or produce..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* User Profile Section */}
         <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="relative">
              <Link to ="/farmer-profile/:id" > 
              <button className="flex items-center space-x-2">
                <img
                  src="/images/user-avatar.jpg"
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-gray-700 font-medium">{user.name}</span>
                <i className="fas fa-chevron-down text-gray-500"></i>
              </button>
              </Link>
              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg hidden">
                <a
                  href="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-green-100"
                >
                  Profile
                </a>
                <a
                  href="/settings"
                  className="block px-4 py-2 text-gray-700 hover:bg-green-100"
                >
                  Settings
                </a>
                <a
                  href="/logout"
                  className="block px-4 py-2 text-red-600 hover:bg-red-100"
                >
                  Logout
                </a>
              </div>
            </div>
          ) : (
            <div className="space-x-2">
              <a
                href="/login"
                className="text-green-600 font-medium hover:text-green-700"
              >
                Login
              </a>
              <a
                href="/register"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Register
              </a>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-700">
          <i className="fas fa-bars text-2xl"></i>
        </button>
      </div>
    </nav>
  );
}