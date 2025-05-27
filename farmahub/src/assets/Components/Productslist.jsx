"use client";
import React from "react";
import { useState, useEffect } from "react";
import Profile from "./ContractsList";
import { Link } from "react-router-dom";

function ProductList({ categoryId, products: initialProducts = [] }) {
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(!initialProducts.length);
  const [error, setError] = useState(null);
  const [clicked, setClicked] = useState(false);
  
    // Function to handle button click
    const handleClick = () => {
      setClicked(!clicked); // Toggle the clicked state
    };
    

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/products?category=${categoryId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
       // setError("Unable to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (categoryId && !initialProducts.length) {
      fetchProducts();
    }
  }, [categoryId, initialProducts]);

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
          {error}
        </div>
      </div>
    );
  }

 /* if (!products.length) {
    return (
      <div className="container mx-auto p-6 text-center text-gray-500">
        No products found in this category.
      </div>
    );
  }
    */

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={product.image}
              alt={`${product.name} - Farm fresh produce`}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2 font-roboto">
                {product.name}
              </h3>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-green-500 font-bold">
                  ${product.price}/kg
                </span>
             <Link to ={`/farmer-profile/${product.id}`} >  <button
                  className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                  onClick={() =>{
                    handleClick()
                    handleButtonClick(product.id)
                  }
                  }
                >
                  View Farmer
                </button></Link>
             
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}




export default ProductList;