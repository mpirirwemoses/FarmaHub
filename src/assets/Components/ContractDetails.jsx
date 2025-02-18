"use client";
import React from "react";

// Detailed Contract Page Component
export default function ContractDetails({ contract }) {
  if (!contract) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Contract not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-4">{contract.produce_name}</h1>
        <p className="text-gray-600">
          Offered by: {contract.farm_name} | Location: {contract.location}
        </p>
      </div>

      {/* Main Content */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Images and Quality Requirements */}
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">Product Images</h2>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="/images/sample-produce.jpg"
                alt={`${contract.produce_name} sample`}
                className="w-full h-48 object-cover rounded-lg"
              />
              <img
                src="/images/sample-quality.jpg"
                alt={`${contract.produce_name} quality`}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">Minimum Quality Requirements</h2>
            <ul className="list-disc list-inside text-gray-600">
              <li>Size: Minimum diameter of 5 cm</li>
              <li>Color: Uniform green or red (depending on variety)</li>
              <li>Freshness: Harvested within the last 48 hours</li>
              <li>Defects: No more than 2% damage or blemishes</li>
            </ul>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">Accepted Designs</h2>
            <p className="text-gray-600">
              Packaging should include clear labeling with farm name, harvest date, and expiration date.
            </p>
          </div>
        </div>

        {/* Right Column: Contract Details and Actions */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Contract Details</h2>
            <div className="space-y-2 text-gray-600">
              <p>
                <span className="font-medium">Quantity:</span> {contract.quantity} kg
              </p>
              <p>
                <span className="font-medium">Price:</span> ${contract.price}/kg
              </p>
              <p>
                <span className="font-medium">Duration:</span> {contract.start_date} to{" "}
                {contract.end_date}
              </p>
              <p>
                <span className="font-medium">Financial Base:</span> $
                {contract.price * contract.quantity}
              </p>
              <p>
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
            </div>

            <div className="mt-6 space-y-4">
              <button
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
                onClick={() => alert("Applying to contract...")}
              >
                Apply Now
              </button>
              <button
                className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors"
                onClick={() => alert("Submitting proposal...")}
              >
                Submit Proposal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Example Usage
function ExampleUsage() {
  const mockContract = {
    id: 1,
    produce_name: "Organic Tomatoes",
    farm_name: "Green Acres Farm",
    location: "Springfield Valley",
    quantity: 100,
    price: 2.5,
    start_date: "2023-10-01",
    end_date: "2024-03-01",
    renewal_status: "active",
  };

  return <ContractDetails contract={mockContract} />;
}

export { ExampleUsage };