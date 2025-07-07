"use client";
import React, { useState } from "react";
import image6 from "../../assets/images/pexels-markusspiske-131772.jpg";
import image7 from "../../assets/images/pexels-pixabay-248420.jpg";
import image8 from "../../assets/images/pexels-wendywei-1656663.jpg";
import image9 from "../../assets/images/trees-2900064_1920.jpg";

// FarmerCard Component
function FarmerCard({ farmer }) {
  return (
    <div
      onClick={() => alert(`Viewing profile of ${farmer.farm_name}`)}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 ease-in-out"
    >
      {/* Standard <img> tag instead of Next.js Image */}
      <img
        src={farmer.profile_image || "/images/default-farm.jpg"}
        alt={`${farmer.farm_name} farm view`}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800">{farmer.farm_name}</h3>
        <p className="text-sm text-gray-600 mt-2">{farmer.location}</p>

        {/* Rating */}
        <div className="flex items-center mt-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-yellow-400 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
          <span className="text-sm text-gray-600">
            {farmer.rating || "4.5"} ({farmer.review_count || "0"} reviews)
          </span>
        </div>

        {/* Specialties */}
        <div className="mt-4 flex flex-wrap gap-2">
          {(farmer.specialties || ["Organic Farming"]).map((specialty) => (
            <span
              key={specialty}
              className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
            >
              {specialty}
            </span>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            alert(`Navigating to profile of ${farmer.farm_name}`);
          }}
          className="mt-6 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors duration-300"
        >
          View Profile
        </button>
      </div>
    </div>
  );
}

// Main Component
export default function Mock() {
  const [categories] = useState([
    { id: 1, name: "Vegetables", icon: "leaf" },
    { id: 2, name: "Fruits", icon: "apple-alt" },
    { id: 3, name: "Grains", icon: "wheat-awn" },
    { id: 4, name: "Dairy", icon: "milk" },
  ]);

  const [featuredFarmers] = useState([
    {
      id: 1,
      farm_name: "Green Acres Farm",
      location: "Springfield Valley",
      profile_image: image8,
      rating: 4.8,
      review_count: 124,
      specialties: ["Organic Vegetables", "Herbs", "Fruits"],
    },
    {
      id: 2,
      farm_name: "Sunrise Valley Farm",
      profile_image: image7,
      location: "Mountain View",
      specialties: ["Free-range Eggs", "Dairy"],
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-600">FarmConnect</h1>
          <ul className="flex space-x-6">
            {categories.map((category) => (
              <li key={category.id}>
                <a
                  href="#"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  {category.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="container mx-auto py-12 px-4">
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Featured Farmers
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredFarmers.map((farmer) => (
              <FarmerCard key={farmer.id} farmer={farmer} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
