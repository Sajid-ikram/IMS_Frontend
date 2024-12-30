import React from 'react';
import { Twitter, Linkedin, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 text-gray-100 py-12">
      <div className="max-w-5xl mx-auto px-6 text-center">
        {/* Logo and Branding */}
        <div className="flex justify-center items-center mb-6">
  
          <span className="ml-3 text-2xl font-extrabold tracking-wider bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
            IMS-System
          </span>
        </div>
        
        {/* Navigation Links */}
        <nav className="flex justify-center space-x-8 mb-6 text-sm font-medium">
          <a href="#" className="hover:text-purple-400 transition-colors">Home</a>
          <a href="#" className="hover:text-purple-400 transition-colors">Features</a>
          <a href="#" className="hover:text-purple-400 transition-colors">About Us</a>
          <a href="#" className="hover:text-purple-400 transition-colors">Contact</a>
        </nav>
        
        {/* Social Media Links */}
        <div className="flex justify-center space-x-6 mb-6">
          <a href="#" className="hover:text-purple-400 transition-colors">
            <Twitter className="h-6 w-6" />
          </a>
          <a href="#" className="hover:text-purple-400 transition-colors">
            <Linkedin className="h-6 w-6" />
          </a>
          <a href="#" className="hover:text-purple-400 transition-colors">
            <Github className="h-6 w-6" />
          </a>
        </div>
        
        {/* Legal Text */}
        <p className="text-xs text-gray-400">
          &copy; {new Date().getFullYear()} IMS-System. Crafted with care for innovators worldwide.
        </p>
      </div>
    </footer>
  );
}
