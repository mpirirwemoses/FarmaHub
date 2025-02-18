"use client";
import React from "react";

function Category({ categories = [], onCategoryClick }) {
  
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 font-roboto">
        Browse by Category
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() =>
              onCategoryClick
                ? onCategoryClick(category)
                : (window.location.href = `/products/${category.id}`)
            }
          >
            <i
              className={`fas fa-${category.icon} text-3xl text-green-500 mb-3`}
            ></i>
            <h3 className="text-lg font-semibold">{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}



export default Category;