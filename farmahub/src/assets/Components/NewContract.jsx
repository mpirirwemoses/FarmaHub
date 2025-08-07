"use client";
import React, { useState, useEffect } from "react";
import axios from 'axios';

function ContractsList() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:4000/api/contracts')
      .then(res => setContracts(Array.isArray(res.data) ? res.data : []))
      .catch(() => setError('Unable to load contracts. Please try again later.'))
      .finally(() => setLoading(false));
  }, []);

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

  if (!contracts.length) {
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

export default function ContractLists() {
  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4">Active Contracts</h3>
        <ContractsList />
      </div>
    </div>
  );
}