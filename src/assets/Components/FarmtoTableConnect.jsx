"use client";
import React, { useState, useEffect } from "react";

// Sample FarmerCard Component (Inline for simplicity)
function FarmerCard({ farmer }) {
  return (
    <div
      onClick={() => (window.location.href = `/farmers/${farmer.id}`)}
      className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
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
        onClick={(e) => {
          e.stopPropagation();
          window.location.href = `/farmers/${farmer.id}`;
        }}
      >
        View Profile
      </button>
    </div>
  );
}

// Main Component
export default function FarmerConnections() {
  const [featuredFarmers, setFeaturedFarmers] = useState([]);
  const [categories, setCategories] = useState([
    { id: 1, name: "Vegetables", icon: "leaf" },
    { id: 2, name: "Fruits", icon: "apple-alt" },
    { id: 3, name: "Grains", icon: "wheat-awn" },
    { id: 4, name: "Dairy", icon: "milk" },
  ]);
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [farmersRes, contractsRes] = await Promise.all([
          fetch("/api/get-featured-farmers", { method: "POST" }),
          fetch("/api/get-recent-contracts", { method: "POST" }),
        ]);

        if (!farmersRes.ok || !contractsRes.ok) {
          throw new Error(`Error: ${farmersRes.status} ${contractsRes.status}`);
        }

        const [{ farmers }, { contracts: contractsData }] = await Promise.all([
          farmersRes.json(),
          contractsRes.json(),
        ]);

        setFeaturedFarmers(farmers);
        setContracts(contractsData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Unable to load content. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filterAndSortContracts = () => {
    let filtered = [...contracts];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (c) =>
          c.produce_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.farm_name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((c) => c.renewal_status === statusFilter);
    }

    // Sort by selected criteria
    switch (sortBy) {
      case "oldest":
        filtered.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        break;
      case "price-high":
        filtered.sort((a, b) => b.price * b.quantity - a.price * a.quantity);
        break;
      case "price-low":
        filtered.sort((a, b) => a.price * a.quantity - b.price * b.quantity);
        break;
      default:
        filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    return filtered;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <i className="fas fa-spinner fa-spin text-3xl text-green-500"></i>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

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

       
        

        {/* Recent Contracts Section */}
        <section className="bg-white rounded-lg shadow-lg p-6 mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h2 className="text-3xl font-bold font-roboto">Recent Contracts</h2>
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <input
                type="text"
                placeholder="Search contracts..."
                className="px-4 py-2 border rounded-lg w-full md:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <select
                className="px-4 py-2 border rounded-lg"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
              <select
                className="px-4 py-2 border rounded-lg"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-high">Price: High to Low</option>
                <option value="price-low">Price: Low to High</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterAndSortContracts().map((contract) => (
              <div
                key={contract.id}
                className="bg-white border rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-lg">{contract.produce_name}</h3>
                    <p className="text-gray-600">{contract.farm_name}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      contract.renewal_status === "active"
                        ? "bg-green-100 text-green-800"
                        : contract.renewal_status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {contract.renewal_status}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Quantity:</span>
                    <span className="font-medium">{contract.quantity}kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-medium">${contract.price}/kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Value:</span>
                    <span className="font-medium">
                      ${(contract.quantity * contract.price).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Start Date:</span>
                    <span className="font-medium">
                      {new Date(contract.start_date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => (window.location.href = `/contracts/${contract.id}`)}
                  className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}