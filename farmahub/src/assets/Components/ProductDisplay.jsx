"use client";
import React from "react";

function ProductDisplay() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [videoRefs, setVideoRefs] = useState({});

  const productData = {
    title: "Premium Chronograph Watch",
    description:
      "Crafted with precision, this luxury timepiece features a sapphire crystal face, Swiss movement, and genuine leather strap. Water-resistant up to 100 meters.",
    price: "$1,299.99",
    variants: [
      {
        type: "image",
        url: "/product/watch-front.jpg",
        alt: "Watch front view showing face detail",
      },
      {
        type: "video",
        url: "/product/watch-rotation.mp4",
        thumbnail: "/product/watch-thumb.jpg",
      },
      {
        type: "image",
        url: "/product/watch-side.jpg",
        alt: "Watch side profile showing case thickness",
      },
      {
        type: "image",
        url: "/product/watch-strap.jpg",
        alt: "Watch strap detail showing leather texture",
      },
      {
        type: "image",
        url: "/product/watch-back.jpg",
        alt: "Watch case back showing movement",
      },
    ],
  };

  const handleMediaChange = (index) => {
    Object.values(videoRefs).forEach((ref) => ref?.pause());
    setSelectedIndex(index);
  };

  const handleVideoRef = (index, ref) => {
    setVideoRefs((prev) => ({ ...prev, [index]: ref }));
  };

  return (
    <div className="min-h-screen bg-white px-4 py-8 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            <div className="relative h-[70vh] bg-gray-50 rounded-xl shadow-lg overflow-hidden">
              {productData.variants[selectedIndex].type === "image" ? (
                <div
                  className="relative w-full h-full cursor-zoom-in"
                  onMouseEnter={() => setIsZoomed(true)}
                  onMouseLeave={() => setIsZoomed(false)}
                >
                  <img
                    src={productData.variants[selectedIndex].url}
                    alt={productData.variants[selectedIndex].alt}
                    className={`w-full h-full object-contain transition-transform duration-300 ${
                      isZoomed ? "scale-110" : "scale-100"
                    }`}
                  />
                </div>
              ) : (
                <video
                  ref={(ref) => handleVideoRef(selectedIndex, ref)}
                  src={productData.variants[selectedIndex].url}
                  className="w-full h-full object-contain"
                  controls
                  playsInline
                />
              )}
            </div>

            <div className="mt-4 relative">
              <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
                {productData.variants.map((variant, index) => (
                  <button
                    key={index}
                    onClick={() => handleMediaChange(index)}
                    className={`relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden transition-all duration-300 ${
                      selectedIndex === index
                        ? "ring-2 ring-blue-500"
                        : "ring-1 ring-gray-200"
                    }`}
                  >
                    {variant.type === "image" ? (
                      <img
                        src={variant.url}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="relative">
                        <img
                          src={variant.thumbnail}
                          alt={`Video thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
                          <i className="fas fa-play text-white text-xl"></i>
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="md:w-1/3">
            <div className="sticky top-8">
              <h1 className="font-playfair text-3xl font-bold text-gray-900 mb-4">
                {productData.title}
              </h1>
              <p className="font-roboto text-xl text-blue-600 font-semibold mb-6">
                {productData.price}
              </p>
              <p className="font-roboto text-gray-600 leading-relaxed mb-8">
                {productData.description}
              </p>
              <button className="w-full bg-blue-600 text-white font-roboto font-semibold py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

export default ProductDisplay;