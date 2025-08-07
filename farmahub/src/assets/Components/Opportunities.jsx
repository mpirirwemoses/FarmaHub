"use client";
import React, { useState } from "react";
import { ExampleUsage } from "./ContractDetails";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import axios from 'axios';

// Sample Opportunity Card Component
function OpportunityCard({ contract }) {
  const [clicked, setClicked] = useState(false);

  // Function to handle button click
  const handleClick = () => {
    setClicked(!clicked); // Toggle the clicked state
  };
  const navigate = useNavigate(); // Initialize navigate

  const handleButtonClick = (id) => {
    navigate(`/example-usage/${id}`); // Navigate to the profile route with the ID
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold mb-2">{contract.produce_name}</h3>
      <p className="text-gray-600 mb-2">
        <span className="font-medium">Posted by:</span> {contract.posted_by}
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
        onClick={() =>{ handleClick(), handleButtonClick(contract.id), alert(`Viewing details of contract #${contract.id}`)}}
      >
        View Details
      </button>
      {clicked && (<div className="content-below"><ExampleUsage/></div>)}
    </div>
  );
}

// Main Component
export default function ContractOpportunities() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:4001/api/restaurants')
      .then(res => {
        // Map supply request data to the format expected by the UI
        const mappedContracts = Array.isArray(res.data) ? res.data.map(sr => ({
          id: sr.id,
          title: sr.productName,
          description: sr.specialInstructions || sr.qualityRequirements || 'No description available',
          quantity: sr.quantityNeeded,
          price: sr.maxPricePerUnit,
          unit: sr.unit,
          start_date: sr.startDate || sr.preferredDeliveryDate,
          end_date: sr.endDate || sr.preferredDeliveryDate,
          status: sr.status || sr.urgency || 'active',
          category: sr.category,
          deliveryAddress: sr.deliveryAddress,
          contactPhone: sr.contactPhone,
          urgency: sr.urgency,
          qualityRequirements: sr.qualityRequirements
        })) : [];
        console.log('Mapped supply requests:', mappedContracts);
        setContracts(mappedContracts);
      })
      .catch(err => {
        console.error('Error fetching supply requests:', err);
        setError('Failed to load supply requests');
      })
      .finally(() => setLoading(false));
  }, []);

  const filterAndSortContracts = () => {
    let filtered = [...contracts];
    if (searchQuery) {
      filtered = filtered.filter(
        (c) =>
          c.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (statusFilter !== "all") {
      filtered = filtered.filter((c) => c.status === statusFilter);
    }
    switch (sortBy) {
      case "oldest":
        filtered.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
        break;
      case "price-high":
        filtered.sort((a, b) => b.price * b.quantity - a.price * a.quantity);
        break;
      case "price-low":
        filtered.sort((a, b) => a.price * a.quantity - b.price * b.quantity);
        break;
      default:
        filtered.sort((a, b) => new Date(b.start_date) - new Date(a.start_date));
    }
    return filtered;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
            <option value="open">Open</option>
            <option value="closed">Closed</option>
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
          <GeneralOpportunityCard key={contract.id} contract={contract} />
        ))}
      </div>
    </div>
  );
}

// General Opportunity Card Component
function GeneralOpportunityCard({ contract }) {
  const [clicked, setClicked] = useState(false);
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

  const handleButtonClick = (id) => {
    navigate(`/example-usage/${id}`);
  };

  const handleApply = async (id) => {
    try {
      setFeedback("Applying...");
      await axios.post(`http://localhost:4001/api/restaurants/${id}/apply`);
      setFeedback("Application submitted!");
    } catch (e) {
      setFeedback("Failed to apply.");
    }
  };

  // Calculate contract duration
  const getContractDuration = () => {
    if (contract.start_date && contract.end_date) {
      const start = new Date(contract.start_date);
      const end = new Date(contract.end_date);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return `${diffDays} days`;
    }
    return 'Flexible';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold">{contract.title}</h3>
        <span className={`px-2 py-1 rounded-full text-xs ${
          contract.urgency === 'HIGH' ? 'bg-red-100 text-red-800' :
          contract.urgency === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
          'bg-green-100 text-green-800'
        }`}>
          {contract.urgency || 'Normal'}
        </span>
      </div>
      
      <p className="text-gray-600 mb-2">{contract.description}</p>
      
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div>
          <span className="font-medium text-sm">Category:</span>
          <p className="text-gray-600 text-sm">{contract.category || 'N/A'}</p>
        </div>
        <div>
          <span className="font-medium text-sm">Quantity:</span>
          <p className="text-gray-600 text-sm">{contract.quantity} {contract.unit}</p>
        </div>
        <div>
          <span className="font-medium text-sm">Max Price:</span>
          <p className="text-gray-600 text-sm">${contract.price} per {contract.unit}</p>
        </div>
        <div>
          <span className="font-medium text-sm">Duration:</span>
          <p className="text-gray-600 text-sm">{getContractDuration()}</p>
        </div>
      </div>

      {contract.start_date && contract.end_date && (
        <p className="text-gray-600 mb-2 text-sm">
          <span className="font-medium">Contract Period:</span> {contract.start_date?.slice(0, 10)} to {contract.end_date?.slice(0, 10)}
        </p>
      )}

      {contract.deliveryAddress && (
        <p className="text-gray-600 mb-2 text-sm">
          <span className="font-medium">Delivery Address:</span> {contract.deliveryAddress}
        </p>
      )}

      {contract.contactPhone && (
        <p className="text-gray-600 mb-2 text-sm">
          <span className="font-medium">Contact:</span> {contract.contactPhone}
        </p>
      )}

      {contract.qualityRequirements && (
        <p className="text-gray-600 mb-2 text-sm">
          <span className="font-medium">Quality Requirements:</span> {contract.qualityRequirements}
        </p>
      )}

      <div className="flex gap-2 mt-4">
        <button
          className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
          onClick={() => handleButtonClick(contract.id)}
        >
          View Details
        </button>
        <button
          className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors"
          onClick={() => handleApply(contract.id)}
        >
          Apply Now
        </button>
      </div>
      
      {feedback && <div className="mt-2 text-sm text-blue-700">{feedback}</div>}
    </div>
  );
}