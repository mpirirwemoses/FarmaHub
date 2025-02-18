"use client";
import React, { useState } from "react";

// Sample Opportunity Card Component
function OpportunityCard({ contract }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold mb-2">{contract.produce_name}</h3>
      <p className="text-gray-600 mb-2">
        <span className="font-medium">Farmer:</span> {contract.farm_name}
      </p>
      <p className="text-gray-600 mb-2">
        <span className="font-medium">Minimum Duration:</span>{" "}
        {Math.ceil(
          (new Date(contract.end_date) - new Date(contract.start_date)) /
            (1000 * 60 * 60 * 24 * 30)
        )}{" "}
        months
      </p>
      <p className="text-gray-600 mb-2">
        <span className="font-medium">Financial Power:</span> $
        {contract.price * contract.quantity}
      </p>
      <p className="text-gray-600 mb-2">
        <span className="font-medium">Status:</span>{" "}
        <span
          className={`inline-block px-2 py-1 rounded-full text-sm ${
            contract.renewal_status === "active"
              ? "bg-green-100 text-green-800"
              : contract.renewal_status === "pending"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {contract.renewal_status}
        </span>
      </p>
      <button
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
        onClick={() => alert(`Viewing details of contract #${contract.id}`)}
      >
        View Details
      </button>
    </div>
  );
}

// Main Component
export default function ContractOpportunities() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Mock Data for Contracts
  const mockContracts = [
    {
      id: 1,
      produce_name: "Organic Tomatoes",
      farm_name: "Green Acres Farm",
      quantity: 100,
      price: 2.5,
      start_date: "2023-10-01",
      end_date: "2024-03-01",
      renewal_status: "active",
    },
    {
      id: 2,
      produce_name: "Fresh Lettuce",
      farm_name: "Sunshine Valley Farm",
      quantity: 50,
      price: 1.75,
      start_date: "2023-09-15",
      end_date: "2024-01-15",
      renewal_status: "pending",
    },
    {
      id: 3,
      produce_name: "Carrots",
      farm_name: "Healthy Roots Farm",
      quantity: 200,
      price: 1.2,
      start_date: "2023-11-01",
      end_date: "2024-05-01",
      renewal_status: "active",
    },
  ];

  // Filter and Sort Contracts
  const filterAndSortContracts = () => {
    let filtered = [...mockContracts];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (c) =>
          c.produce_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.farm_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((c) => c.renewal_status === statusFilter);
    }

    // Sort by selected criteria
    switch (sortBy) {
      case "oldest":
        filtered.sort(
          (a, b) => new Date(a.start_date) - new Date(b.start_date)
        );
        break;
      case "price-high":
        filtered.sort((a, b) => b.price * b.quantity - a.price * a.quantity);
        break;
      case "price-low":
        filtered.sort((a, b) => a.price * a.quantity - b.price * b.quantity);
        break;
      default:
        filtered.sort(
          (a, b) => new Date(b.start_date) - new Date(a.start_date)
        );
    }

    return filtered;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Search and Filter Bar */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
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

      {/* Opportunities List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filterAndSortContracts().map((contract) => (
          <OpportunityCard key={contract.id} contract={contract} />
        ))}
      </div>
    </div>
  );
}