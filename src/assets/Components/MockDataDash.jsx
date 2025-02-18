"use client";
import React, { useState, useEffect } from "react";

// Mock API Functions
async function fetchFeaturedFarmers() {
  // Simulate fetching featured farmers
  return [
    { id: 1, farm_name: "Green Acres Farm", avg_rating: 4.8, contract_count: 12 },
    { id: 2, farm_name: "Sunshine Valley Farm", avg_rating: 4.6, contract_count: 10 },
  ];
}

async function fetchRecentContracts() {
  // Simulate fetching recent contracts
  return [
    {
      id: 1,
      produce_name: "Organic Tomatoes",
      farm_name: "Green Acres Farm",
      restaurant_name: "Fresh Bites Restaurant",
      quantity: 100,
      price: 2.5,
      created_at: "2023-10-01",
    },
    {
      id: 2,
      produce_name: "Fresh Lettuce",
      farm_name: "Sunshine Valley Farm",
      restaurant_name: "Salad Bowl Cafe",
      quantity: 50,
      price: 1.75,
      created_at: "2023-09-15",
    },
  ];
}

async function fetchContractStats() {
  // Simulate fetching contract stats
  return {
    total_contracts: 50,
    active_contracts: 30,
    pending_contracts: 10,
    cancelled_contracts: 10,
  };
}

export default function Dashboard() {
  const [featuredFarmers, setFeaturedFarmers] = useState([]);
  const [recentContracts, setRecentContracts] = useState([]);
  const [contractStats, setContractStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [farmers, contracts, stats] = await Promise.all([
          fetchFeaturedFarmers(),
          fetchRecentContracts(),
          fetchContractStats(),
        ]);
        setFeaturedFarmers(farmers);
        setRecentContracts(contracts);
        setContractStats(stats);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <i className="fas fa-spinner fa-spin text-2xl text-blue-500"></i>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Dashboard</h1>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Graphs and Stats */}
        <div className="space-y-6">
          {/* Contract Stats */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Contract Overview</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{contractStats?.total_contracts}</p>
                <p className="text-gray-600">Total Contracts</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{contractStats?.active_contracts}</p>
                <p className="text-gray-600">Active Contracts</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-600">{contractStats?.pending_contracts}</p>
                <p className="text-gray-600">Pending Contracts</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">{contractStats?.cancelled_contracts}</p>
                <p className="text-gray-600">Cancelled Contracts</p>
              </div>
            </div>
          </div>

          {/* Featured Farmers */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Featured Farmers</h2>
            <div className="space-y-4">
              {featuredFarmers.map((farmer) => (
                <div key={farmer.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900">{farmer.farm_name}</p>
                    <p className="text-sm text-gray-600">
                      Avg Rating: {farmer.avg_rating} | Contracts: {farmer.contract_count}
                    </p>
                  </div>
                  <button className="text-blue-500 hover:text-blue-600 text-sm">View Profile</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Recent Contracts and Details */}
        <div className="space-y-6">
          {/* Recent Contracts */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Recent Contracts</h2>
            <div className="space-y-4">
              {recentContracts.map((contract) => (
                <div key={contract.id} className="p-4 border rounded-lg">
                  <p className="font-medium text-gray-900">{contract.produce_name}</p>
                  <p className="text-sm text-gray-600">
                    Farmer: {contract.farm_name} | Restaurant: {contract.restaurant_name}
                  </p>
                  <p className="text-sm text-gray-600">
                    Quantity: {contract.quantity} kg | Price: ${contract.price}/kg
                  </p>
                  <p className="text-xs text-gray-500">Created: {contract.created_at}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Stats */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Detailed Stats</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-gray-700">Average Contract Value</p>
                <p className="text-green-600 font-medium">$125.00</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-700">Most Active Farmer</p>
                <p className="text-blue-600 font-medium">Green Acres Farm</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-700">Top Produce</p>
                <p className="text-yellow-600 font-medium">Organic Tomatoes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}