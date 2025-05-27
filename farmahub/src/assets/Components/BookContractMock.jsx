"use client";
import React, { useState } from "react";

// Main Component
function RebookContract({ existingContract, onSuccess }) {
  const [formData, setFormData] = useState({
    quantity: existingContract?.quantity || "",
    startDate: "",
    endDate: "",
    notes: "",
    file: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulate API response
      if (!formData.quantity || !formData.startDate || !formData.endDate) {
        throw new Error("Please fill in all required fields.");
      }

      const mockResponse = {
        id: Date.now(),
        farmer_id: existingContract.farmer_id,
        produce_id: existingContract.produce_id,
        quantity: formData.quantity,
        start_date: formData.startDate,
        end_date: formData.endDate,
        renewal_status: "pending",
        created_at: new Date().toISOString(),
        file: formData.file ? URL.createObjectURL(formData.file) : null,
      };

      if (onSuccess) {
        onSuccess(mockResponse);
      } else {
        window.location.href = "/dashboard";
      }
    } catch (err) {
      console.error("Failed to rebook contract:", err);
      setError(err.message || "Unable to rebook contract. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 font-roboto">Rebook Contract</h2>

      {/* Display Existing Contract Details */}
      {existingContract && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Current Contract Details</h3>
          <p className="text-gray-600">
            <strong>Produce:</strong> {existingContract.produce_name}
          </p>
          <p className="text-gray-600">
            <strong>Farmer:</strong> {existingContract.farm_name}
          </p>
          <p className="text-gray-600">
            <strong>Quantity:</strong> {existingContract.quantity} kg
          </p>
          <p className="text-gray-600">
            <strong>Start Date:</strong>{" "}
            {new Date(existingContract.start_date).toLocaleDateString()}
          </p>
          <p className="text-gray-600">
            <strong>End Date:</strong>{" "}
            {new Date(existingContract.end_date).toLocaleDateString()}
          </p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>
      )}

      {/* Rebooking Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="quantity">
            Quantity (kg)
          </label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
            value={formData.quantity}
            onChange={(e) =>
              setFormData({ ...formData, quantity: e.target.value })
            }
            required
            min="1"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2" htmlFor="startDate">
            Start Date
          </label>
          <input
            id="startDate"
            name="startDate"
            type="date"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
            value={formData.startDate}
            onChange={(e) =>
              setFormData({ ...formData, startDate: e.target.value })
            }
            required
            min={new Date().toISOString().split("T")[0]}
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2" htmlFor="endDate">
            End Date
          </label>
          <input
            id="endDate"
            name="endDate"
            type="date"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
            value={formData.endDate}
            onChange={(e) =>
              setFormData({ ...formData, endDate: e.target.value })
            }
            required
            min={formData.startDate || new Date().toISOString().split("T")[0]}
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2" htmlFor="file">
            Upload Supporting Document
          </label>
          <input
            id="file"
            name="file"
            type="file"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
            onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2" htmlFor="notes">
            Additional Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
            value={formData.notes}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
            rows="4"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors disabled:bg-green-300 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="inline-flex items-center">
              <i className="fas fa-spinner fa-spin mr-2"></i>
              Processing...
            </span>
          ) : (
            "Submit Rebooking Request"
          )}
        </button>
      </form>
    </div>
  );
}

// Story Component for Testing
function StoryComponent() {
  const sampleExistingContract = {
    id: 1,
    farmer_id: 1,
    produce_id: 1,
    produce_name: "Organic Tomatoes",
    farm_name: "Green Acres Farm",
    quantity: 100,
    start_date: "2023-09-01",
    end_date: "2023-12-31",
  };

  return (
    <div className="bg-gray-50 p-4 space-y-8">
      {/* Default View */}
      <div>
        <h3 className="text-lg font-bold mb-4">Default View</h3>
        <RebookContract
          existingContract={sampleExistingContract}
          onSuccess={(contract) => console.log("Contract rebooked:", contract)}
        />
      </div>

      
    </div>
  );
}

export default StoryComponent;