"use client";
import React, { useState, useEffect } from "react";

// ContractsList Component with Mock Data
function ContractsList({ contracts: initialContracts = [] }) {
  const [contracts, setContracts] = useState(initialContracts);
  const [loading, setLoading] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Simulate API response based on initialContracts
        if (!initialContracts || initialContracts.length === 0) {
          // Mock API response
          const mockContracts = [
            {
              id: 1,
              produce_name: "Organic Tomatoes",
              farm_name: "Green Acres Farm",
              restaurant_name: "Fresh Bites Restaurant",
              quantity: 100,
              price: 2.5,
              renewal_status: "active",
            },
            {
              id: 2,
              produce_name: "Fresh Lettuce",
              farm_name: "Sunshine Valley Farm",
              restaurant_name: "Salad Bowl Cafe",
              quantity: 50,
              price: 1.75,
              renewal_status: "pending",
            },
          ];

          setContracts(mockContracts);
        }
      } catch (err) {
        console.error("Failed to fetch contracts:", err);
        setError("Unable to load contracts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (!initialContracts || initialContracts.length === 0) {
      fetchContracts();
    }
  }, [initialContracts]);

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
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!contracts || !contracts.length) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center text-gray-500">No contracts found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 font-roboto">Active Contracts</h2>
      <div className="grid gap-4">
        {contracts.map((contract) => (
          <div
            key={contract.id}
            className="p-4 border rounded-lg shadow bg-white hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div className="space-y-1">
                <h3 className="font-bold text-lg">
                  {contract.produce_name || "Unnamed Product"}
                </h3>
                <p className="text-gray-600">
                  <span className="font-medium">Farmer:</span>{" "}
                  {contract.farm_name}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Restaurant:</span>{" "}
                  {contract.restaurant_name}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-600">
                  <span className="font-medium">Quantity:</span>{" "}
                  {contract.quantity}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Price:</span> ${contract.price}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Status:</span>{" "}
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-sm ${
                      contract.renewal_status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : contract.renewal_status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {contract.renewal_status}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Main Component for Testing
export default function ContractLists() {
  const sampleContracts = [
    {
      id: 1,
      produce_name: "Organic Tomatoes",
      farm_name: "Green Acres Farm",
      restaurant_name: "Fresh Bites Restaurant",
      quantity: 100,
      price: 2.5,
      renewal_status: "active",
    },
    {
      id: 2,
      produce_name: "Fresh Lettuce",
      farm_name: "Sunshine Valley Farm",
      restaurant_name: "Salad Bowl Cafe",
      quantity: 50,
      price: 1.75,
      renewal_status: "pending",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      {/* Loading State */}
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4">Loading State</h3>
        <ContractsList />
      </div>

      {/* Empty State */}
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4">Empty State</h3>
        <ContractsList contracts={[]} />
      </div>

      {/* With Contracts */}
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4">With Contracts</h3>
        <ContractsList contracts={sampleContracts} />
      </div>

      {/* Error State */}
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4">Error State</h3>
        <ContractsList contracts={null} />
      </div>
    </div>
  );
}