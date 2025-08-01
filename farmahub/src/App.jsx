import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from 'react';

// Components
import Mock from './assets/Components/MockFarmerconnections';

import FarmerProf from './assets/Components/MockFarmerProfile';
import Category from './assets/Components/Products';
import CategoryDisplay from './assets/Components/ProductsCategoryDisplay';
import ProductListDisplay from './assets/Components/ProductsListDisplay';
import Dashboard from './assets/Components/MockDataDash';


import ContractOpportunities from './assets/Components/Opportunities';
import { ExampleUsage } from './assets/Components/ContractDetails';
import Navbar from './assets/Components/NavBar';
import RecentContracts from './assets/Components/RecentContracts';
import Navigation from './assets/Components/Navigation';
import Head from './assets/Components/head';
import Footer from './assets/Components/Footer';


function AutoRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/contract-opportunities");
    }, 5000); // Redirect after 5 seconds

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [navigate]);

  return <Mock />;
}

function App() {
  return (
    <Router>
      {/* Wrap the entire app with Router to ensure routing works */}
      <Navbar />
      <Head />
      <Category />
      <CategoryDisplay />

      <Routes>
        <Route path="/" element={<AutoRedirect />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contract-opportunities" element={<ContractOpportunities />} />
        <Route path="/mock" element={<Mock />} />
        <Route path="/recent-contracts" element={<RecentContracts />} />
        <Route path="/farmer-profile/:id" element={<FarmerProf />} />
        
        <Route path="/example-usage/:id" element={<ExampleUsage />} />
        <Route path="/navigation" element={<Navigation />} />
        <Route path="/products" element={<ProductListDisplay />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
