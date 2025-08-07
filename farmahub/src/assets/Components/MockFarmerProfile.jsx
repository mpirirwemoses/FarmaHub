"use client";
import React, { useState, useEffect } from "react";
import ProductDisplay from "./ProductDisplay";
import axios from 'axios';

function ProductList({ farmerId }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!farmerId) return;
    setLoading(true);
    axios.get(`/api/products?farmerId=${farmerId}`)
      .then(res => setProducts(res.data))
      .catch(err => setError('Failed to load products'))
      .finally(() => setLoading(false));
  }, [farmerId]);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>{error}</div>;
  if (!products.length) return <div>No products found.</div>;

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <div key={product.id} className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold">{product.name}</h3>
          <p className="text-gray-600">
            ${product.price}/{product.unit}
          </p>
        </div>
      ))}
    </div>
  );
}

function FarmerProfile({ farmerId }) {
  const [farmer, setFarmer] = useState(null);
  const [activeTab, setActiveTab] = useState("about");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!farmerId) return;
    setLoading(true);
    axios.get(`/api/farmers/${farmerId}`)
      .then(res => setFarmer(res.data))
      .catch(err => setError('Unable to load farmer profile. Please try again later.'))
      .finally(() => setLoading(false));
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
                          {specialty.name || specialty}
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
          {activeTab === "products" && <ProductList farmerId={farmer.id} />}
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

export default function FarmerProf() {
  return (
    <div className="bg-gray-50 p-4 space-y-8">
      <div>
        <h3 className="text-lg font-bold mb-4">With Farmer Data</h3>
        <FarmerProfile farmerId={1} />
      </div>
    </div>
  );
}