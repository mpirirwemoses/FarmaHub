"use client";
import React, { useState, useEffect } from "react";
import image4 from "../../assets/images/pexels-jill-wellington-1638660-413735.jpg";
import image5 from "../../assets/images/pexels-joaojesusdesign-1084540.jpg";
import "./ProductDisplay"
import ProductDisplay from "./ProductDisplay";
// Sample ProductList Component (Inline for simplicity)
function ProductList({ farmerId }) {
  const mockProducts = [
    { id: 1, name: "Tomatoes", price: 2.5, unit: "kg" },
    { id: 2, name: "Carrots", price: 1.8, unit: "kg" },
    { id: 3, name: "Apples", price: 3.0, unit: "kg" },
  ];

  return (
    <div className="space-y-4">
      {mockProducts.map((product) => (
        <div key={product.id} onClick={<ProductDisplay/>} className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold">{product.name}</h3>
          <p className="text-gray-600">
            ${product.price}/{product.unit}
          </p>
        </div>
      ))}
    </div>
  );
}

// FarmerProfile Component
function FarmerProfile({ farmerId }) {
  const [farmer, setFarmer] = useState(null);
  const [activeTab, setActiveTab] = useState("about");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFarmer = async () => {
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock API response based on farmerId
        if (farmerId === 1) {
          setFarmer({
            id: 1,
            farm_name: "Green Acres Farm",
            location: "Springfield Valley",
            profile_image:image5 ,
            email: "farmer@greenacres.com",
            description:
              "We are a family-owned farm specializing in organic produce and sustainable farming practices.",
            specialties: ["Organic Vegetables", "Herbs", "Fruits"],
          });
        } else {
          throw new Error("Farmer not found");
        }
      } catch (err) {
        console.error("Failed to fetch farmer:", err);
        setError("Unable to load farmer profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (farmerId) {
      fetchFarmer();
    }
  }, [farmerId]);

  if (loading) {
    return (
      <div className="container mx-auto p-6 text-center">
        <i className="fas fa-spinner fa-spin text-2xl text-blue-500"></i>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (!farmer) {
    return (
      <div className="container mx-auto p-6 text-center text-gray-500">
        Farmer not found
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative h-48 bg-green-500">
          <img
            src={farmer.profile_image || "/images/default-farm-cover.jpg"}
            alt={`${farmer.farm_name} farm cover`}
            className="w-full h-full object-cover"
          />
          <img
            src={farmer.profile_image || "/images/default-farmer.jpg"}
            alt={farmer.farm_name}
            className="absolute -bottom-16 left-6 w-32 h-32 rounded-full border-4 border-white object-cover"
          />
        </div>
        <div className="mt-20 p-6">
          <h1 className="text-3xl font-bold mb-2 font-roboto">
            {farmer.farm_name}
          </h1>
          <p className="text-gray-600 mb-4">{farmer.location}</p>
          <div className="flex mb-6 space-x-4">
            <button
              className={`px-4 py-2 rounded transition-colors ${
                activeTab === "about"
                  ? "bg-green-500 text-white"
                  : "bg-gray-100"
              }`}
              onClick={() => setActiveTab("about")}
            >
              About
            </button>
            <button
              className={`px-4 py-2 rounded transition-colors ${
                activeTab === "products"
                  ? "bg-green-500 text-white"
                  : "bg-gray-100"
              }`}
              onClick={() => setActiveTab("products")}
            >
              Products
            </button>
            <button
              className={`px-4 py-2 rounded transition-colors ${
                activeTab === "reviews"
                  ? "bg-green-500 text-white"
                  : "bg-gray-100"
              }`}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews
            </button>
          </div>
          {activeTab === "about" && (
            <div>
              <h2 className="text-xl font-semibold mb-4 font-roboto">
                About Us
              </h2>
              <p className="text-gray-600 mb-4">
                {farmer.description || "No description available."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Specialties</h3>
                  <ul className="list-disc list-inside">
                    {(farmer.specialties || ["Organic Farming"]).map(
                      (specialty, index) => (
                        <li key={index} className="text-gray-600">
                          {specialty}
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Contact</h3>
                  <p className="text-gray-600">{farmer.email}</p>
                </div>
              </div>
            </div>
          )}
          {activeTab === "products" && <ProductList farmerId={farmerId} />}
          {activeTab === "reviews" && (
            <div className="text-center text-gray-500">
              Reviews coming soon...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Main Component for Testing
export default function FarmerProf() {
  return (
    <div className="bg-gray-50 p-4 space-y-8">
      {/* Loading State */}
      <div>
        <h3 className="text-lg font-bold mb-4">Loading State</h3>
        <FarmerProfile farmerId={null} />
      </div>

      {/* With Farmer Data */}
      <div>
        <h3 className="text-lg font-bold mb-4">With Farmer Data</h3>
        <FarmerProfile farmerId={1} />
      </div>

      {/* Error State */}
      <div>
        <h3 className="text-lg font-bold mb-4">Error State</h3>
        <FarmerProfile farmerId={999} />
      </div>
    </div>
  );
}