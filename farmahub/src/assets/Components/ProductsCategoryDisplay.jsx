import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// General Opportunity Card Component (from Opportunities.jsx)
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

function ProductsCategoryDisplay() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [contracts, setContracts] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingContracts, setLoadingContracts] = useState(false);
  const [error, setError] = useState(null);
  
  // Search and filter states (from Opportunities.jsx)
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    setLoadingCategories(true);
    axios.get("http://localhost:4001/api/categories")
      .then(res => setCategories(Array.isArray(res.data) ? res.data : []))
      .catch(() => setError("Failed to load categories"))
      .finally(() => setLoadingCategories(false));
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;
    setLoadingContracts(true);
    axios.get(`http://localhost:4001/api/restaurants`)
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
        
        // Filter by selected category
        const filteredContracts = mappedContracts.filter(contract => 
          contract.category?.toLowerCase() === selectedCategory.name?.toLowerCase()
        );
        
        setContracts(filteredContracts);
      })
      .catch(() => setError("Failed to load contracts"))
      .finally(() => setLoadingContracts(false));
  }, [selectedCategory]);

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

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Browse Opportunities by Category</h2>
        
        {/* Categories Section */}
        {loadingCategories ? (
          <div className="text-center py-8">Loading categories...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : Array.isArray(categories) && categories.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-10">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`flex flex-col items-center p-4 rounded-lg shadow-md border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 hover:shadow-lg ${selectedCategory?.id === cat.id ? "bg-green-100 border-green-500" : "bg-white"}`}
                onClick={() => setSelectedCategory(cat)}
              >
                <span className="text-3xl mb-2">{cat.icon}</span>
                <span className="font-semibold">{cat.name}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">No categories found.</div>
        )}

        {/* Contracts Section */}
        {selectedCategory && (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-center">
              Opportunities in "{selectedCategory.name}"
            </h3>
            
            {/* Search and Filter Bar */}
            <div className="mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Search opportunities..."
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

            {loadingContracts ? (
              <div className="text-center py-8">Loading opportunities...</div>
            ) : error ? (
              <div className="text-center text-red-500 py-8">{error}</div>
            ) : Array.isArray(contracts) && contracts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No opportunities found for this category.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterAndSortContracts().map(contract => (
                  <GeneralOpportunityCard key={contract.id} contract={contract} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductsCategoryDisplay;