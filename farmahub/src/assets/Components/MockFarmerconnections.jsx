"use client";
import React, { useState } from "react";
import image6 from "../../assets/images/pexels-markusspiske-131772.jpg";
import image7 from "../../assets/images/pexels-pixabay-248420.jpg";
import image8 from "../../assets/images/pexels-wendywei-1656663.jpg";
import image9 from "../../assets/images/trees-2900064_1920.jpg";


// Sample FarmerCard Component (Inline for simplicity)
function FarmerCard({ farmer }) {
  return (
    <div
      onClick={() => alert(`Viewing profile of ${farmer.farm_name}`)}
      className="bg-white rounded-lg relative  shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
    >
      <img
        src={farmer.profile_image || "/images/default-farm.jpg"}
        alt={`${farmer.farm_name} farm view`}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl font-bold font-roboto">{farmer.farm_name}</h3>
      <p className="text-gray-600">{farmer.location}</p>
      <div className="flex items-center mt-2">
        <i className="fas fa-star text-yellow-400 mr-1"></i>
        <span className="text-gray-600">
          {farmer.rating || "4.5"} ({farmer.review_count || "0"} reviews)
        </span>
      </div>
      <div className="mt-2 py-4 flex flex-wrap gap-2">
        {(farmer.specialties || ["Organic Farming"]).map((specialty) => (
          <span
            key={specialty}
            className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm"
          >
            {specialty}
          </span>
        ))}
      </div>
      <button
        className="mt-4 w-full absolute bottom-4  bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          alert(`Navigating to profile of ${farmer.farm_name}`);
        }}
      >
        View Profile
      </button>
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
      {/* Navigation Bar */}
     

      {/* Main Content */}
      <div className="container mx-auto py-12 px-4">
        {/* Featured Farmers Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 font-roboto">Featured Farmers</h2>
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