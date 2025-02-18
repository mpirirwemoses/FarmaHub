"use client";
import React, { useState } from "react";
import { PhoneCall, Copy, Star, PlayCircle, CheckCircle } from "lucide-react";

// Placeholder images for demonstration
const placeholderImages = [
  "https://via.placeholder.com/300x200?text=Product+1",
  "https://via.placeholder.com/300x200?text=Product+2",
  "https://via.placeholder.com/300x200?text=Product+3",
];

function Profile() {
  const [profile, setProfile] = useState({
    images: placeholderImages,
    video: null,
    full_name: "Green Acres Farm",
    age: "5 years in business",
    location: "Springfield Valley",
    bio: "We specialize in organic produce and sustainable farming practices.",
    phone: "+1234567890",
    is_active: true,
    rating: 4,
  });
  const [selectedImage, setSelectedImage] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [copied, setCopied] = useState(false);

  // Handle copying phone number
  const handleCopy = () => {
    if (!profile?.phone) return;
    navigator.clipboard.writeText(profile.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50 font-poppins">
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-gray-500 text-sm">
          <a href="/" className="hover:text-gray-700">Home</a>
          <span className="text-gray-400">/</span>
          <a href="/profiles" className="hover:text-gray-700">Profiles</a>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">{profile.full_name}</span>
        </nav>

        {/* Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
          {/* Left Section (Image & Video) */}
          <div className="space-y-6">
            {/* Main Image or Video */}
            <div className="relative aspect-square rounded-lg overflow-hidden bg-white shadow-md">
              {isVideoPlaying ? (
                <video
                  src={profile.video}
                  autoPlay
                  controls
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={profile.images[selectedImage]}
                  alt={`Product image ${selectedImage + 1}`}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Thumbnail Selectors */}
            <div className="flex gap-2">
              {profile.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedImage(index);
                    setIsVideoPlaying(false);
                  }}
                  className={`w-[60px] h-[60px] rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? "border-green-500" : "border-gray-200"
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
              {profile.video && (
                <button
                  onClick={() => setIsVideoPlaying(true)}
                  className="relative w-[60px] h-[60px] rounded-lg overflow-hidden border-2 border-gray-200 flex items-center justify-center"
                >
                  <PlayCircle size={24} className="text-green-500" />
                </button>
              )}
            </div>
          </div>

          {/* Right Section (Details & Contact) */}
          <div className="space-y-6">
            {/* Name & Rating */}
            <h1 className="text-2xl font-bold text-gray-900">{profile.full_name}</h1>
            <div className="flex items-center gap-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={18}
                  className={star <= profile.rating ? "text-yellow-500" : "text-gray-300"}
                />
              ))}
              <span className="text-gray-500">|</span>
              <span
                className={
                  profile.is_active
                    ? "text-green-600 flex items-center gap-1"
                    : "text-yellow-600 flex items-center gap-1"
                }
              >
                <CheckCircle size={16} /> {profile.is_active ? "Active Now" : "Away"}
              </span>
            </div>

            {/* Personal Details */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-md space-y-2">
              <p className="text-gray-700"><strong>Experience:</strong> {profile.age}</p>
              <p className="text-gray-700"><strong>Location:</strong> {profile.location}</p>
              <p className="text-gray-600">{profile.bio || "No bio available."}</p>

              {/* Phone & Copy Button */}
              <div className="flex items-center gap-3">
                <span className="text-gray-700">{profile.phone}</span>
                <button
                  onClick={handleCopy}
                  className="p-1 rounded-md hover:bg-gray-100 transition"
                >
                  <Copy size={16} className="text-gray-600" />
                </button>
                {copied && <span className="text-sm text-green-600">Copied!</span>}
              </div>

              {/* Contact Buttons */}
              <div className="flex gap-4 mt-4">
                <a
                  href={`tel:${profile.phone}`}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 transition"
                >
                  <PhoneCall size={16} /> Call
                </a>
                <a
                  href={`https://wa.me/${profile.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition"
                >
                  <i className="fab fa-whatsapp text-xl" /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;