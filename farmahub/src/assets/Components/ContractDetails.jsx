"use client";
import React from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

// Detailed Contract Page Component
export default function ContractDetails({ contract: propContract }) {
  const { id } = useParams();
  const [contract, setContract] = useState(propContract || null);
  const [loading, setLoading] = useState(!propContract);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [applyForm, setApplyForm] = useState({
    farmerName: '',
    farmerContact: '',
    proposedPrice: '',
    deliveryTimeframe: '',
    message: ''
  });
  const [proposalForm, setProposalForm] = useState({
    farmerName: '',
    farmerContact: '',
    title: '',
    description: '',
    proposedPrice: '',
    deliverySchedule: ''
  });

  useEffect(() => {
    if (!contract && id) {
      setLoading(true);
      // Fetch from restaurants database (supply requests)
      axios.get(`http://localhost:4001/api/restaurants/${id}`)
        .then(res => {
          // Map supply request data to the format expected by the UI
          const supplyRequest = res.data;
          const mappedContract = {
            id: supplyRequest.id,
            title: supplyRequest.productName,
            description: supplyRequest.specialInstructions || supplyRequest.qualityRequirements || 'No description available',
            quantity: supplyRequest.quantityNeeded,
            price: supplyRequest.maxPricePerUnit,
            unit: supplyRequest.unit,
            start_date: supplyRequest.startDate || supplyRequest.preferredDeliveryDate,
            end_date: supplyRequest.endDate || supplyRequest.preferredDeliveryDate,
            status: supplyRequest.status || supplyRequest.urgency || 'active',
            category: supplyRequest.category,
            deliveryAddress: supplyRequest.deliveryAddress,
            contactPhone: supplyRequest.contactPhone,
            urgency: supplyRequest.urgency,
            qualityRequirements: supplyRequest.qualityRequirements,
            specialInstructions: supplyRequest.specialInstructions
          };
          setContract(mappedContract);
        })
        .catch(() => setError('Failed to load supply request'))
        .finally(() => setLoading(false));
    }
  }, [id, contract]);

  const handleApply = async (e) => {
    e.preventDefault();
    try {
      setFeedback('Applying...');
      await axios.post(`http://localhost:4001/api/restaurants/${id}/apply`, applyForm);
      setFeedback('Application submitted successfully!');
      setShowApplyModal(false);
      setApplyForm({
        farmerName: '',
        farmerContact: '',
        proposedPrice: '',
        deliveryTimeframe: '',
        message: ''
      });
    } catch (e) {
      setFeedback('Failed to apply: ' + (e.response?.data?.error || e.message));
    }
  };

  const handleProposal = async (e) => {
    e.preventDefault();
    try {
      setFeedback('Submitting proposal...');
      await axios.post(`http://localhost:4001/api/restaurants/${id}/proposal`, proposalForm);
      setFeedback('Proposal submitted successfully!');
      setShowProposalModal(false);
      setProposalForm({
        farmerName: '',
        farmerContact: '',
        title: '',
        description: '',
        proposedPrice: '',
        deliverySchedule: ''
      });
    } catch (e) {
      setFeedback('Failed to submit proposal: ' + (e.response?.data?.error || e.message));
    }
  };

  if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-xl">Loading supply request details...</div>
  </div>;
  if (error) return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-xl text-red-600">{error}</div>
  </div>;
  if (!contract) return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-xl">Supply request not found</div>
  </div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-4">{contract.title}</h1>
            <p className="text-gray-600">
              Category: {contract.category || 'N/A'} | Status: {contract.status}
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm ${
            contract.urgency === 'HIGH' ? 'bg-red-100 text-red-800' :
            contract.urgency === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
            'bg-green-100 text-green-800'
          }`}>
            {contract.urgency || 'Normal'} Priority
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Requirements and Instructions */}
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">Quality Requirements</h2>
            <div className="bg-white rounded-lg p-4">
              {contract.qualityRequirements ? (
                <p className="text-gray-600">{contract.qualityRequirements}</p>
              ) : (
                <p className="text-gray-500 italic">No specific quality requirements listed</p>
              )}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">Special Instructions</h2>
            <div className="bg-white rounded-lg p-4">
              {contract.specialInstructions ? (
                <p className="text-gray-600">{contract.specialInstructions}</p>
              ) : (
                <p className="text-gray-500 italic">No special instructions</p>
              )}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">Delivery Information</h2>
            <div className="bg-white rounded-lg p-4 space-y-2">
              {contract.deliveryAddress && (
                <p className="text-gray-600">
                  <span className="font-medium">Address:</span> {contract.deliveryAddress}
                </p>
              )}
              {contract.contactPhone && (
                <p className="text-gray-600">
                  <span className="font-medium">Contact:</span> {contract.contactPhone}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Contract Details and Actions */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Supply Request Details</h2>
            <div className="space-y-3 text-gray-600">
              <div className="flex justify-between">
                <span className="font-medium">Quantity:</span>
                <span>{contract.quantity} {contract.unit}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Max Price:</span>
                <span>${contract.price} per {contract.unit}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Total Value:</span>
                <span>${(contract.price * contract.quantity).toFixed(2)}</span>
              </div>
              {contract.start_date && contract.end_date && (
                <div className="flex justify-between">
                  <span className="font-medium">Contract Period:</span>
                  <span>{contract.start_date?.slice(0, 10)} to {contract.end_date?.slice(0, 10)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="font-medium">Status:</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  contract.status === "OPEN" ? "bg-green-100 text-green-800" :
                  contract.status === "CLOSED" ? "bg-red-100 text-red-800" :
                  "bg-yellow-100 text-yellow-800"
                }`}>
                  {contract.status}
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <button
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
                onClick={() => setShowApplyModal(true)}
              >
                Apply Now
              </button>
              <button
                className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors"
                onClick={() => setShowProposalModal(true)}
              >
                Submit Proposal
              </button>
              {feedback && <div className="mt-2 text-sm text-blue-700">{feedback}</div>}
            </div>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Apply for Supply Request</h3>
            <form onSubmit={handleApply} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Farmer Name *</label>
                <input
                  type="text"
                  required
                  className="w-full p-2 border rounded"
                  value={applyForm.farmerName}
                  onChange={(e) => setApplyForm({...applyForm, farmerName: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Contact Email/Phone *</label>
                <input
                  type="text"
                  required
                  className="w-full p-2 border rounded"
                  value={applyForm.farmerContact}
                  onChange={(e) => setApplyForm({...applyForm, farmerContact: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Proposed Price per {contract.unit}</label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full p-2 border rounded"
                  value={applyForm.proposedPrice}
                  onChange={(e) => setApplyForm({...applyForm, proposedPrice: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Delivery Timeframe</label>
                <input
                  type="text"
                  placeholder="e.g., Within 2 weeks"
                  className="w-full p-2 border rounded"
                  value={applyForm.deliveryTimeframe}
                  onChange={(e) => setApplyForm({...applyForm, deliveryTimeframe: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea
                  rows="3"
                  className="w-full p-2 border rounded"
                  placeholder="Tell the buyer about your capabilities..."
                  value={applyForm.message}
                  onChange={(e) => setApplyForm({...applyForm, message: e.target.value})}
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                  Submit Application
                </button>
                <button
                  type="button"
                  onClick={() => setShowApplyModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Proposal Modal */}
      {showProposalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Submit Proposal</h3>
            <form onSubmit={handleProposal} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Farmer Name *</label>
                <input
                  type="text"
                  required
                  className="w-full p-2 border rounded"
                  value={proposalForm.farmerName}
                  onChange={(e) => setProposalForm({...proposalForm, farmerName: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Contact Email/Phone *</label>
                <input
                  type="text"
                  required
                  className="w-full p-2 border rounded"
                  value={proposalForm.farmerContact}
                  onChange={(e) => setProposalForm({...proposalForm, farmerContact: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Proposal Title *</label>
                <input
                  type="text"
                  required
                  className="w-full p-2 border rounded"
                  value={proposalForm.title}
                  onChange={(e) => setProposalForm({...proposalForm, title: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description *</label>
                <textarea
                  rows="3"
                  required
                  className="w-full p-2 border rounded"
                  value={proposalForm.description}
                  onChange={(e) => setProposalForm({...proposalForm, description: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Proposed Price per {contract.unit}</label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full p-2 border rounded"
                  value={proposalForm.proposedPrice}
                  onChange={(e) => setProposalForm({...proposalForm, proposedPrice: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Delivery Schedule</label>
                <input
                  type="text"
                  placeholder="e.g., Weekly deliveries for 3 months"
                  className="w-full p-2 border rounded"
                  value={proposalForm.deliverySchedule}
                  onChange={(e) => setProposalForm({...proposalForm, deliverySchedule: e.target.value})}
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600"
                >
                  Submit Proposal
                </button>
                <button
                  type="button"
                  onClick={() => setShowProposalModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Example Usage
function ExampleUsage() {
  const { id } = useParams();
  return <ContractDetails contract={null} key={id} />;
}

export { ExampleUsage };