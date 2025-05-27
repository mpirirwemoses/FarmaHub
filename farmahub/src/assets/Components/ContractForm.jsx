"use client";
import React from "react";

function ContractForm({ farmer }) {
  if (!farmer) {
    return <div className="text-gray-500">No farmer data available</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 cursor-pointer hover:shadow-xl transition-shadow">
      <img
        src={farmer.profile_image || "https://via.placeholder.com/400x300"}
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
      <div className="mt-2 flex flex-wrap gap-2">
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
        className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
        onClick={() => (window.location.href = `/farmers/${farmer.id}`)}
        aria-label={`View profile of ${farmer.farm_name}`}
      >
        View Profile
      </button>
    </div>
  );
}

export default function ContractApply() {
  const sampleFarmer = {
    id: 1,
    farm_name: "Green Acres Farm",
    location: "Springfield Valley",
    profile_image: "/images/farm1.jpg",
    rating: 4.8,
    review_count: 124,
    specialties: ["Organic Vegetables", "Herbs", "Fruits"],
  };
  const sampleFarmerNoImage = {
    id: 2,
    farm_name: "Sunrise Valley Farm",
    location: "Mountain View",
    specialties: ["Free-range Eggs", "Dairy"],
  };

  return (
    <div className="bg-gray-50 p-4 space-y-8">
      <div className="max-w-sm">
        <h3 className="text-lg font-bold mb-4">Default View</h3>
        <ContractForm farmer={sampleFarmer} />
      </div>
      <div className="max-w-sm">
        <h3 className="text-lg font-bold mb-4">Without Image</h3>
        <ContractForm farmer={sampleFarmerNoImage} />
      </div>
      <div className="max-w-sm">
        <h3 className="text-lg font-bold mb-4">No Farmer Data</h3>
        <ContractForm farmer={null} />
      </div>
    </div>
  );
}