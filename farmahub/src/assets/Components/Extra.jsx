import image10 from "../../assets/images/istockphoto-1066928884-1024x1024.jpg";
import image2 from "../../assets/images/istockphoto-1324921732-1024x1024.jpg";
import image3 from "../../assets/images/pexels-goumbik-952476.jpg";
import { useState } from "react";
import { useEffect } from 'react';
import React from "react";

function CategoryNav({ categories, activeCategory, onCategoryClick }) {
  return (
    <nav className="bg-white shadow-md py-4 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex justify-center space-x-4 md:space-x-6">
          {categories.map((category) => (
            <li key={category}>
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 
                  ${activeCategory === category ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                onClick={() => onCategoryClick(category)}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}




function CategoriesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  const categories = ["All", "Technology", "Design", "Business", "Health"];

  const categoryInfo = {
    All: {
      title: "Explore All Categories",
      subtitle:
        "Discover curated content across technology, design, business, and health",
      gradient: "from-purple-600 to-blue-500",
      content: Array.from({ length: 8 }).map(() => ({
        title: "The Future of Digital Innovation",
        description:
          "An in-depth look at how digital transformation is reshaping industries and creating new opportunities for growth and innovation.",
        image: image10,
        category: "Featured",
        readTime: "8 min read",
        author: "Alex Morgan",
      })),
    },
    Technology: {
      title: "Technology & Innovation",
      subtitle: "Stay ahead with the latest in tech trends and breakthroughs",
      gradient: "from-blue-600 to-cyan-500",
      content: Array.from({ length: 6 }).map(() => ({
        title: "AI Revolution in Enterprise",
        description:
          "How artificial intelligence is transforming business operations and decision-making processes across industries.",
        image: image2,
        category: "Technology",
        readTime: "6 min read",
        author: "Sarah Chen",
      })),
    },
    Design: {
      title: "Design Excellence",
      subtitle: "Explore cutting-edge design trends and creative insights",
      gradient: "from-pink-600 to-rose-500",
      content: Array.from({ length: 5 }).map(() => ({
        title: "UX Design Principles for 2025",
        description:
          "Essential design principles that will shape the future of user experience and digital product design.",
        image: image3,
        category: "Design",
        readTime: "5 min read",
        author: "Mark Wilson",
      })),
    },
    Business: {
      title: "Business Insights",
      subtitle: "Strategic perspectives for modern business leaders",
      gradient: "from-amber-600 to-orange-500",
      content: Array.from({ length: 7 }).map(() => ({
        title: "Global Market Trends Analysis",
        description:
          "Understanding emerging market trends and their impact on global business strategies.",
        image:image10,
        category: "Business",
        readTime: "7 min read",
        author: "Lisa Zhang",
      })),
    },
    Health: {
      title: "Health & Wellness",
      subtitle: "Expert insights for a healthier lifestyle",
      gradient: "from-green-600 to-emerald-500",
      content: Array.from({ length: 4 }).map(() => ({
        title: "Modern Wellness Approaches",
        description:
          "Innovative approaches to maintaining physical and mental well-being in the digital age.",
        image: image3 ,
        category: "Health",
        readTime: "4 min read",
        author: "Dr. James Miller",
      })),
    },
  };

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, [activeCategory]);

  const currentCategory = categoryInfo[activeCategory];

  return (
    <div className="min-h-screen bg-gray-50">
      <CategoryNav
        categories={categories}
        activeCategory={activeCategory}
        onCategoryClick={setActiveCategory}
      />

      <section
        className={`bg-gradient-to-r ${currentCategory.gradient} pt-32 pb-20 px-4`}
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 transition-all duration-300">
            {currentCategory.title}
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            {currentCategory.subtitle}
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">
              Showing{" "}
              <span className="font-semibold">
                {currentCategory.content.length}
              </span>{" "}
              articles in{" "}
              <span className="font-semibold">{activeCategory}</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {!isLoading &&
            currentCategory.content.map((item, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden opacity-0 animate-fade-in"
              >
                <div className="relative aspect-w-16 aspect-h-9 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="object-cover w-full h-48 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 rounded-full text-sm font-medium text-gray-800">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-sm text-gray-500">
                      {item.readTime}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-sm text-gray-500">
                      By {item.author}
                    </span>
                  </div>
                  <h3 className="font-semibold text-xl text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
{/* //skeleton loading state */}
          {isLoading &&
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-t-xl"></div>
                <div className="bg-white p-6 rounded-b-xl">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            ))}
        </div>
      </main>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .grid > div:nth-child(1) { animation-delay: 0.1s; }
        .grid > div:nth-child(2) { animation-delay: 0.2s; }
        .grid > div:nth-child(3) { animation-delay: 0.3s; }
        .grid > div:nth-child(4) { animation-delay: 0.4s; }
        .grid > div:nth-child(5) { animation-delay: 0.5s; }
        .grid > div:nth-child(6) { animation-delay: 0.6s; }
      `}</style>
    </div>
  );
}

export default CategoriesPage;