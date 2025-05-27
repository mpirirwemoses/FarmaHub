import React, { useState, useEffect } from 'react';
import { 
  Users, Leaf, Building2, ShoppingCart, TrendingUp, 
  Bell, Settings, LogOut, Plus, Search, Filter,
  Eye, Star, MapPin, Phone, Mail, Calendar,
  Package, Truck, DollarSign, BarChart3,
  ChevronRight, Menu, X, Upload, Image as ImageIcon
} from 'lucide-react';

const AgriSupplyPlatform = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userType, setUserType] = useState('admin'); // admin, farmer, business
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Mock data
  const [farmers, setFarmers] = useState([
    {
      id: 1,
      name: "Green Valley Farm",
      location: "Nakuru County",
      rating: 4.8,
      products: ["Tomatoes", "Lettuce", "Carrots"],
      totalProducts: 15,
      monthlySupply: "2.5 tons",
      image: "/api/placeholder/80/80"
    },
    {
      id: 2,
      name: "Sunrise Agriculture",
      location: "Kiambu County",
      rating: 4.6,
      products: ["Potatoes", "Cabbages", "Onions"],
      totalProducts: 12,
      monthlySupply: "3.2 tons",
      image: "/api/placeholder/80/80"
    }
  ]);

  const [businesses, setBusinesses] = useState([
    {
      id: 1,
      name: "Grand Hotel Nairobi",
      type: "Hotel",
      location: "Nairobi CBD",
      monthlyRequirement: "5 tons",
      contracts: 3,
      image: "/api/placeholder/80/80"
    },
    {
      id: 2,  
      name: "Healthy Bites Restaurant",
      type: "Restaurant",
      location: "Westlands",
      monthlyRequirement: "1.2 tons",
      contracts: 2,
      image: "/api/placeholder/80/80"
    }
  ]);

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Fresh Tomatoes",
      category: "Vegetables",
      farmer: "Green Valley Farm",
      price: "120 per kg",
      quality: "Grade A",
      availability: "Available",
      images: ["/api/placeholder/200/150", "/api/placeholder/200/150"],
      description: "Fresh, organic tomatoes perfect for hotels and restaurants"
    }
  ]);

  // Navigation items based on user type
  const getNavItems = () => {
    const navItems = {
      admin: [
        { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
        { id: 'farmers', label: 'Farmers', icon: Users },
        { id: 'businesses', label: 'Businesses', icon: Building2 },
        { id: 'products', label: 'Products', icon: Package },
        { id: 'orders', label: 'Orders', icon: ShoppingCart },
        { id: 'analytics', label: 'Analytics', icon: TrendingUp },
      ],
      farmer: [
        { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
        { id: 'my-products', label: 'My Products', icon: Package },
        { id: 'orders', label: 'Orders', icon: ShoppingCart },
        { id: 'profile', label: 'Profile', icon: Users },
      ],
      business: [
        { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
        { id: 'browse-products', label: 'Browse Products', icon: Search },
        { id: 'my-orders', label: 'My Orders', icon: ShoppingCart },
        { id: 'profile', label: 'Profile', icon: Building2 },
      ]
    };
    return navItems[userType];
  };

  // Header Component
  const Header = () => (
    <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <h1 className="text-2xl font-bold text-green-800">AgriConnect</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-green-600" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
          </div>
          
          <select 
            value={userType} 
            onChange={(e) => setUserType(e.target.value)}
            className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-1 text-sm"
          >
            <option value="admin">Admin View</option>
            <option value="farmer">Farmer View</option>
            <option value="business">Business View</option>
          </select>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">A</span>
            </div>
            <span className="text-sm font-medium">Admin User</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Sidebar Component
  const Sidebar = () => (
    <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-green-800 text-white transition-all duration-300 flex flex-col`}>
      <div className="p-6">
        <div className={`${sidebarOpen ? 'block' : 'hidden'} mb-8`}>
          <h2 className="text-xl font-bold">AgriConnect</h2>
          <p className="text-green-200 text-sm">Supply Chain Platform</p>
        </div>
      </div>
      
      <nav className="flex-1">
        {getNavItems().map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center px-6 py-3 text-left hover:bg-green-700 transition-colors ${
              activeTab === item.id ? 'bg-green-700 border-r-4 border-green-300' : ''
            }`}
          >
            <item.icon size={20} />
            <span className={`ml-3 ${sidebarOpen ? 'block' : 'hidden'}`}>{item.label}</span>
          </button>
        ))}
      </nav>
      
      <div className="p-6 border-t border-green-700">
        <button className="w-full flex items-center px-2 py-2 text-left hover:bg-green-700 rounded">
          <LogOut size={20} />
          <span className={`ml-3 ${sidebarOpen ? 'block' : 'hidden'}`}>Logout</span>
        </button>
      </div>
    </div>
  );

  // Dashboard Component
  const Dashboard = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
        <div className="flex space-x-4">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center">
            <Plus size={20} className="mr-2" />
            {userType === 'farmer' ? 'Add Product' : userType === 'business' ? 'New Order' : 'Add User'}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Farmers</p>
              <p className="text-3xl font-bold text-green-600">245</p>
            </div>
            <Users className="w-10 h-10 text-green-500" />
          </div>
          <p className="text-sm text-green-600 mt-2">↗ 12% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Businesses</p>
              <p className="text-3xl font-bold text-blue-600">89</p>
            </div>
            <Building2 className="w-10 h-10 text-blue-500" />
          </div>
          <p className="text-sm text-blue-600 mt-2">↗ 8% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Monthly Orders</p>
              <p className="text-3xl font-bold text-orange-600">1,247</p>
            </div>
            <ShoppingCart className="w-10 h-10 text-orange-500" />
          </div>
          <p className="text-sm text-orange-600 mt-2">↗ 23% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Revenue</p>
              <p className="text-3xl font-bold text-purple-600">₹2.4M</p>
            </div>
            <DollarSign className="w-10 h-10 text-purple-500" />
          </div>
          <p className="text-sm text-purple-600 mt-2">↗ 18% from last month</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Package size={16} className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Grand Hotel Order #{item}234</p>
                    <p className="text-sm text-gray-600">2 tons of vegetables</p>
                  </div>
                </div>
                <span className="text-sm text-green-600 font-medium">Pending</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Top Performing Farmers</h3>
          <div className="space-y-4">
            {farmers.slice(0, 3).map((farmer) => (
              <div key={farmer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div className="flex items-center space-x-3">
                  <img 
                    src={farmer.image} 
                    alt={farmer.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">{farmer.name}</p>
                    <p className="text-sm text-gray-600">{farmer.location}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center">
                    <Star size={14} className="text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{farmer.rating}</span>
                  </div>
                  <p className="text-xs text-gray-600">{farmer.monthlySupply}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Farmers Management Component
  const FarmersManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Farmers Management</h2>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center">
          <Plus size={20} className="mr-2" />
          Add New Farmer
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search farmers..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter size={16} className="mr-2" />
            Filter
          </button>
        </div>
      </div>

      {/* Farmers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {farmers.map((farmer) => (
          <div key={farmer.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <img 
                  src={farmer.image} 
                  alt={farmer.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{farmer.name}</h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin size={14} className="mr-1" />
                    {farmer.location}
                  </div>
                  <div className="flex items-center mt-1">
                    <Star size={14} className="text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{farmer.rating}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Products:</span>
                  <span className="font-medium">{farmer.totalProducts}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Monthly Supply:</span>
                  <span className="font-medium text-green-600">{farmer.monthlySupply}</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {farmer.products.slice(0, 3).map((product, idx) => (
                    <span key={idx} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      {product}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2 mt-4">
                <button className="flex-1 bg-green-50 text-green-700 py-2 px-3 rounded-lg hover:bg-green-100 text-sm font-medium">
                  View Profile
                </button>
                <button className="flex-1 bg-blue-50 text-blue-700 py-2 px-3 rounded-lg hover:bg-blue-100 text-sm font-medium">
                  Contact
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Products Component (For Farmers)
  const MyProducts = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">My Products</h2>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center">
          <Plus size={20} className="mr-2" />
          Add New Product
        </button>
      </div>

      {/* Add Product Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Add New Product</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter product name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option>Select category</option>
              <option>Vegetables</option>
              <option>Fruits</option>
              <option>Grains</option>
              <option>Herbs</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price per KG (₹)</label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter price"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Available Quantity (KG)</label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter quantity"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Describe your product quality, farming methods, etc."
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Images</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 cursor-pointer">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500">PNG, JPG up to 5MB each (Max 5 images)</p>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
            Add Product
          </button>
        </div>
      </div>

      {/* Products List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="relative">
              <img 
                src={product.images[0]} 
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2">
                <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                  {product.availability}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{product.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-medium text-green-600">₹{product.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Quality:</span>
                  <span className="font-medium">{product.quality}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-50 text-blue-700 py-2 px-3 rounded-lg hover:bg-blue-100 text-sm font-medium">
                  Edit
                </button>
                <button className="flex-1 bg-green-50 text-green-700 py-2 px-3 rounded-lg hover:bg-green-100 text-sm font-medium">
                  View Stats
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Browse Products Component (For Businesses)
  const BrowseProducts = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Browse Products</h2>
        <div className="flex space-x-2">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center">
            <ShoppingCart size={20} className="mr-2" />
            Request Quote
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
            <option>All Categories</option>
            <option>Vegetables</option>
            <option>Fruits</option>
            <option>Grains</option>
            <option>Herbs</option>
          </select>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter size={16} className="mr-2" />
            More Filters
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative">
              <img 
                src={product.images[0]} 
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2">
                <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                  {product.availability}
                </span>
              </div>
              <div className="absolute bottom-2 left-2">
                <div className="flex items-center space-x-1">
                  {product.images.slice(1, 4).map((img, idx) => (
                    <div key={idx} className="w-8 h-8 rounded border-2 border-white overflow-hidden">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                  {product.images.length > 4 && (
                    <div className="w-8 h-8 rounded border-2 border-white bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white text-xs">+{product.images.length - 4}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{product.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Supplier Region:</span>
                  <span className="font-medium">Central Kenya</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Quality Grade:</span>
                  <span className="font-medium">{product.quality}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Price Range:</span>
                  <span className="font-medium text-green-600">₹{product.price}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg hover:bg-green-700 text-sm font-medium">
                  Request Quote
                </button>
                <button className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200">
                  <Eye size={16} className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Note about contact restrictions */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
        <div className="flex items-center">
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              <strong>Note:</strong> All communications and orders are managed through AgriConnect. 
              Direct farmer contact information is not provided to ensure quality control and fair pricing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Main content renderer
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'farmers':
        return <FarmersManagement />;
      case 'my-products':
        return <MyProducts />;
      case 'browse-products':
        return <BrowseProducts />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="container mx-auto px-6 py-8">
            {renderContent()}
          </div>
        </main>
      </div>