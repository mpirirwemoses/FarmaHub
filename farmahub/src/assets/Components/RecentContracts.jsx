
import { useState } from "react";

const  RecentContracts = () => {
    const [contracts, setContracts] = useState([
        {
          id: 1,
          produce_name: "Tomatoes",
          farm_name: "Green Acres Farm",
          renewal_status: "active",
          quantity: 500,
          price: 2.5,
          start_date: "2023-10-01",
        },
        {
          id: 2,
          produce_name: "Apples",
          farm_name: "Sunrise Valley Farm",
          renewal_status: "pending",
          quantity: 300,
          price: 3.0,
          start_date: "2023-09-15",
        },
      ]);
    
      const [searchQuery, setSearchQuery] = useState("");
      const [statusFilter, setStatusFilter] = useState("all");
      const [sortBy, setSortBy] = useState("newest");
    
      const filterAndSortContracts = () => {
        let filtered = [...contracts];
    
        // Filter by search query
        if (searchQuery) {
          filtered = filtered.filter(
            (c) =>
              c.produce_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
              c.farm_name?.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
    
        // Filter by status
        if (statusFilter !== "all") {
          filtered = filtered.filter((c) => c.renewal_status === statusFilter);
        }
    
        // Sort by selected criteria
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
        <div>
            
        {/* Recent Contracts Section */}
        <section className="bg-white rounded-lg shadow-lg p-6 mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h2 className="text-3xl font-bold font-roboto">Recent Contracts</h2>
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
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
                <option value="completed">Completed</option>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterAndSortContracts().map((contract) => (
              <div
                key={contract.id}
                className="bg-white border rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-lg">{contract.produce_name}</h3>
                    <p className="text-gray-600">{contract.farm_name}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      contract.renewal_status === "active"
                        ? "bg-green-100 text-green-800"
                        : contract.renewal_status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {contract.renewal_status}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Quantity:</span>
                    <span className="font-medium">{contract.quantity}kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-medium">${contract.price}/kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Value:</span>
                    <span className="font-medium">
                      ${(contract.quantity * contract.price).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Start Date:</span>
                    <span className="font-medium">
                      {new Date(contract.start_date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => alert(`Viewing details of contract #${contract.id}`)}
                  className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </section>
        </div>
    );
};
export default RecentContracts