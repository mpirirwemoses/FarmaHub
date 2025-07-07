import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope, FaLeaf, FaUtensils } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* About Section */}
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <FaLeaf className="text-green-400 text-2xl mr-2" />
              <FaUtensils className="text-amber-500 text-2xl" />
              <h3 className="text-xl font-bold ml-2">FarmToTable</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Bridging the gap between local farms and restaurants with our sustainable supply chain platform.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-300 hover:text-green-400 transition">About Us</a></li>
              <li><a href="/farmers" className="text-gray-300 hover:text-green-400 transition">For Farmers</a></li>
              <li><a href="/restaurants" className="text-gray-300 hover:text-green-400 transition">For Restaurants</a></li>
              <li><a href="/sustainability" className="text-gray-300 hover:text-green-400 transition">Sustainability</a></li>
              <li><a href="/blog" className="text-gray-300 hover:text-green-400 transition">Blog</a></li>
              <li><a href="/faq" className="text-gray-300 hover:text-green-400 transition">FAQs</a></li>
            </ul>
          </div>
          
          {/* Services */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Our Services</h3>
            <ul className="space-y-2">
              <li><a href="/supply-chain" className="text-gray-300 hover:text-green-400 transition">Farm-to-Table Supply Chain</a></li>
              <li><a href="/inventory" className="text-gray-300 hover:text-green-400 transition">Inventory Management</a></li>
              <li><a href="/logistics" className="text-gray-300 hover:text-green-400 transition">Logistics Solutions</a></li>
              <li><a href="/quality-control" className="text-gray-300 hover:text-green-400 transition">Quality Control</a></li>
              <li><a href="/marketplace" className="text-gray-300 hover:text-green-400 transition">Produce Marketplace</a></li>
              <li><a href="/seasonal-guide" className="text-gray-300 hover:text-green-400 transition">Seasonal Produce Guide</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-green-400 mt-1 mr-3" />
                <p className="text-gray-300">123 Farm Road, Agricultural District, City, Country 10001</p>
              </div>
              <div className="flex items-center">
                <FaPhone className="text-green-400 mr-3" />
                <a href="tel:+11234567890" className="text-gray-300 hover:text-green-400 transition">+1 (123) 456-7890</a>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-green-400 mr-3" />
                <a href="mailto:info@farmtotable.com" className="text-gray-300 hover:text-green-400 transition">info@farmtotable.com</a>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium mb-2">Newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-3 py-2 bg-gray-800 text-white rounded-l focus:outline-none focus:ring-1 focus:ring-green-400 w-full"
                />
                <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-r transition">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2">Get updates on seasonal produce and farm news</p>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-3 md:mb-0">
            &copy; {new Date().getFullYear()} FarmToTable. All rights reserved.
          </div>
          <div className="flex space-x-4 text-sm">
            <a href="/privacy" className="text-gray-400 hover:text-white transition">Privacy Policy</a>
            <a href="/terms" className="text-gray-400 hover:text-white transition">Terms of Service</a>
            <a href="/sitemap" className="text-gray-400 hover:text-white transition">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;