'use client';

import React, { useState, useEffect, useCallback } from "react";
import StoryComponent from "./BookContractMock";
import { FiPlus, FiTrendingUp, FiCheckCircle, FiClock, FiXCircle, FiStar, FiDollarSign, FiUser, FiPackage } from "react-icons/fi";


// Mock API Functions (moved outside component for better organization)
const fetchFeaturedFarmers = async () => [
  { id: 1, farm_name: "Green Acres Farm", avg_rating: 4.8, contract_count: 12, image: "/farm1.jpg" },
  { id: 2, farm_name: "Sunshine Valley Farm", avg_rating: 4.6, contract_count: 10, image: "/farm2.jpg" },
];

const fetchRecentContracts = async () => [
  {
    id: 1,
    produce_name: "Organic Tomatoes",
    farm_name: "Green Acres Farm",
    restaurant_name: "Fresh Bites Restaurant",
    quantity: 100,
    price: 2.5,
    created_at: "2023-10-01",
    status: "active",
    image: "/tomatoes.jpg"
  },
  {
    id: 2,
    produce_name: "Fresh Lettuce",
    farm_name: "Sunshine Valley Farm",
    restaurant_name: "Salad Bowl Cafe",
    quantity: 50,
    price: 1.75,
    created_at: "2023-09-15",
    status: "completed",
    image: "/lettuce.jpg"
  },
];

const fetchContractStats = async () => ({
  total_contracts: 50,
  active_contracts: 30,
  pending_contracts: 10,
  cancelled_contracts: 10,
});

// Add Product Button Component
const AddProductButton = React.memo(({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className=" top-0 right-8 bg-green-600 hover:bg-green-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:shadow-xl flex items-center justify-center z-10"
      aria-label="Add new product"
    >
      <FiPlus className="text-xl" />
      <span className="ml-2 hidden sm:inline">Add Product</span>
    </button>
  );
});
AddProductButton.displayName = 'AddProductButton';

// Status Badge Component
const StatusBadge = React.memo(({ status }) => {
  const statusConfig = {
    active: { color: "bg-blue-100 text-blue-800", icon: <FiTrendingUp className="mr-1" /> },
    pending: { color: "bg-yellow-100 text-yellow-800", icon: <FiClock className="mr-1" /> },
    completed: { color: "bg-green-100 text-green-800", icon: <FiCheckCircle className="mr-1" /> },
    cancelled: { color: "bg-red-100 text-red-800", icon: <FiXCircle className="mr-1" /> },
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[status]?.color || 'bg-gray-100 text-gray-800'}`}>
      {statusConfig[status]?.icon}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
});
StatusBadge.displayName = 'StatusBadge';

// Contract Card Component
const ContractCard = React.memo(({ contract, onClick }) => {
  const formattedDate = new Date(contract.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div 
      onClick={onClick}
      className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer group"
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="h-12 w-12 rounded-md bg-gray-200 overflow-hidden">
            {contract.image ? (
              <img src={contract.image} alt={contract.produce_name} className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full bg-gray-300 flex items-center justify-center">
                <FiPackage className="text-gray-500" />
              </div>
            )}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-gray-900 truncate">{contract.produce_name}</h3>
            <StatusBadge status={contract.status} />
          </div>
          <p className="text-sm text-gray-600 truncate">
            <span className="font-medium">Farmer:</span> {contract.farm_name}
          </p>
          <p className="text-sm text-gray-600 truncate">
            <span className="font-medium">Restaurant:</span> {contract.restaurant_name}
          </p>
          <div className="flex justify-between mt-1">
            <p className="text-sm text-gray-600">
              <span className="font-medium">{contract.quantity} kg</span> at <span className="font-medium">${contract.price}/kg</span>
            </p>
            <p className="text-xs text-gray-500">{formattedDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
});
ContractCard.displayName = 'ContractCard';

// Stat Card Component
const StatCard = React.memo(({ value, label, icon, color }) => {
  return (
    <div className="text-center p-4 rounded-lg bg-white shadow-sm">
      <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full ${color.bg} mb-2`}>
        {React.cloneElement(icon, { className: `text-xl ${color.text}` })}
      </div>
      <p className="text-2xl font-bold mb-1">{value}</p>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );
});
StatCard.displayName = 'StatCard';

export default function Dashboard() {
  const [featuredFarmers, setFeaturedFarmers] = useState([]);
  const [recentContracts, setRecentContracts] = useState([]);
  const [contractStats, setContractStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clicked, setClicked] = useState(false);

  const handleClick = useCallback(() => {
    setClicked(prev => !prev);
  }, []);

  const handleAddProduct = useCallback(() => {
    // Implement your add product logic here
    console.log("Add product clicked");
    // This could open a modal or navigate to a form
  }, []);

  useEffect(() => {
    let mounted = true;
    
    const fetchData = async () => {
      try {
        const [farmers, contracts, stats] = await Promise.all([
          fetchFeaturedFarmers(),
          fetchRecentContracts(),
          fetchContractStats(),
        ]);
        
        if (mounted) {
          setFeaturedFarmers(farmers);
          setRecentContracts(contracts);
          setContractStats(stats);
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-64 w-full rounded-lg" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-64 w-full rounded-lg" />
            <Skeleton className="h-48 w-full rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header with Stats */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="mt-4 md:mt-0"> {/* Add Product Button */}
      <AddProductButton onClick={handleAddProduct} /></div>
        <div className="mt-4 md:mt-0 grid grid-cols-2 md:grid-cols-4 gap-3 w-full md:w-auto">
          <StatCard 
            value={contractStats?.total_contracts || 0} 
            label="Total Contracts" 
            icon={<FiCheckCircle />} 
            color={{ bg: "bg-blue-100", text: "text-blue-600" }}
          />
          <StatCard 
            value={contractStats?.active_contracts || 0} 
            label="Active" 
            icon={<FiTrendingUp />} 
            color={{ bg: "bg-green-100", text: "text-green-600" }}
          />
          <StatCard 
            value={contractStats?.pending_contracts || 0} 
            label="Pending" 
            icon={<FiClock />} 
            color={{ bg: "bg-yellow-100", text: "text-yellow-600" }}
          />
          <StatCard 
            value={contractStats?.cancelled_contracts || 0} 
            label="Cancelled" 
            icon={<FiXCircle />} 
            color={{ bg: "bg-red-100", text: "text-red-600" }}
          />
        </div>
      </div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Featured Farmers */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">Featured Farmers</h2>
              <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
            </div>
            <div className="space-y-4">
              {featuredFarmers.map((farmer) => (
                <div key={farmer.id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                    {farmer.image ? (
                      <img src={farmer.image} alt={farmer.farm_name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full bg-gray-300 flex items-center justify-center">
                        <FiUser className="text-gray-500" />
                      </div>
                    )}
                  </div>
                  <div className="ml-3 flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{farmer.farm_name}</p>
                    <div className="flex items-center text-sm text-gray-600">
                      <FiStar className="text-yellow-500 mr-1" />
                      <span>{farmer.avg_rating}</span>
                      <span className="mx-2">•</span>
                      <span>{farmer.contract_count} contracts</span>
                    </div>
                  </div>
                  <button className="text-blue-500 hover:text-blue-600 text-sm whitespace-nowrap">
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Recent Contracts and Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">Recent Contracts</h2>
              <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
            </div>
            <div className="space-y-3">
              {recentContracts.map((contract) => (
                <ContractCard 
                  key={contract.id} 
                  contract={contract} 
                  onClick={handleClick} 
                />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4 text-gray-800">Performance Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <FiDollarSign className="text-blue-600 mr-2" />
                  <h3 className="font-medium text-gray-800">Average Contract Value</h3>
                </div>
                <p className="text-2xl font-bold text-blue-600 mt-2">$125.00</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <FiUser className="text-green-600 mr-2" />
                  <h3 className="font-medium text-gray-800">Most Active Farmer</h3>
                </div>
                <p className="text-xl font-bold text-green-600 mt-2">Green Acres Farm</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-center">
                  <FiPackage className="text-yellow-600 mr-2" />
                  <h3 className="font-medium text-gray-800">Top Produce</h3>
                </div>
                <p className="text-xl font-bold text-yellow-600 mt-2">Organic Tomatoes</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center">
                  <FiCheckCircle className="text-purple-600 mr-2" />
                  <h3 className="font-medium text-gray-800">Completion Rate</h3>
                </div>
                <p className="text-2xl font-bold text-purple-600 mt-2">85%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Story Component */}
      <div className="mt-6">
        {clicked && <StoryComponent />}
      </div>

     
    </div>
  );
}
export function Skeleton({ className = '' }) {
  return (
    <div 
      className={`animate-pulse bg-gray-200 rounded-md dark:bg-gray-800 ${className}`}
    />
  );
}