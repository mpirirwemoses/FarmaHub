import React, { useState } from "react";
import { FaUser, FaCalendarAlt, FaFileAlt, FaClock } from "react-icons/fa";

const initialProposals = [
  {
    id: 1,
    title: "Smart Irrigation System",
    submittedBy: "You",
    date: "2025-07-06",
    status: "Pending",
    description: "A system that uses soil moisture and weather data to automate irrigation.",
  },
  {
    id: 2,
    title: "AI Crop Disease Detector",
    submittedBy: "You",
    date: "2025-07-05",
    status: "Approved",
    description: "An AI mobile app that detects crop diseases from leaf images.",
  },
  {
    id: 3,
    title: "Digital Market Access",
    submittedBy: "You",
    date: "2025-07-04",
    status: "Rejected",
    description: "A platform to connect rural farmers directly to urban buyers.",
  },
];

export default function MyProposalsPage() {
  const [proposals] = useState(initialProposals);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-green-700 mb-6">My Submitted Proposals</h1>

        {proposals.length === 0 ? (
          <div className="text-center text-gray-600">
            <FaClock className="mx-auto text-4xl mb-4" />
            <p>You haven't submitted any proposals yet.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {proposals.map((proposal) => (
              <div
                key={proposal.id}
                className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
              >
                <div className="flex justify-between items-start flex-wrap gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                      <FaFileAlt className="text-green-500" /> {proposal.title}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">{proposal.description}</p>
                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <FaUser className="text-gray-400" /> Submitted by: {proposal.submittedBy}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaCalendarAlt className="text-gray-400" /> {proposal.date}
                      </span>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-white ${
                          proposal.status === "Approved"
                            ? "bg-green-500"
                            : proposal.status === "Rejected"
                            ? "bg-red-500"
                            : "bg-yellow-500"
                        }`}
                      >
                        {proposal.status}
                      </span>
                    </div>
                  </div>

                  <div className="min-w-[90px]">
                    <button
                      onClick={() => alert(`Proposal Details:\n\n${proposal.title}\n\n${proposal.description}`)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
