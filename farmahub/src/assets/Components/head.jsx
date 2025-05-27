import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Head = () => {
  const [activeSection, setActiveSection] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  const sections = [
    {
      id: "contracts",
      title: "Contracts",
      route: "/recent-contracts", // Define the route for "Contracts"
    },
    {
      id: "proposals",
      title: "Proposals",
      route: "/mock", // Define the route for "Proposals"
    },
    {
      id: "dashboard",
      title: "Dashboard Overview",
      route: "/dashboard", // Define the route for "Dashboard"
    },
  ];

  return (
    <div className="bg-gray-100 p-6 flex flex-col items-center">
      {/* Clickable Sections */}
      <div className="flex flex-row justify-center gap-6 w-full max-w-6xl">
        {sections.map((section) => (
          <div
            key={section.id}
            className="bg-white flex items-center justify-center p-6 shadow-lg rounded-xl border-l-4 border-green-500 cursor-pointer hover:bg-green-50 transition-all w-64 text-center"
            onClick={() => {
              setActiveSection(section.id); // Update the active section
              navigate(section.route); // Navigate to the respective route
            }}
          >
            <h2 className="text-xl font-semibold text-gray-800">{section.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Head;
