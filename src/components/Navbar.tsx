import { Link, useLocation } from 'react-router-dom';
import { Lightbulb, Menu } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  
  return (
    <nav className="fixed w-full z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex-shrink-0 flex items-center">
            <Lightbulb className="h-8 w-8 text-purple-500" />
            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
              IdeaShare
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/discover" 
              className={`${location.pathname === '/discover' ? 'text-white' : 'text-gray-300'} hover:text-white transition-colors`}
            >
              Discover
            </Link>
            <Link 
              to="/share" 
              className={`${location.pathname === '/share' ? 'text-white' : 'text-gray-300'} hover:text-white transition-colors`}
            >
              Share
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all">
              Login
            </button>
            <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transition-all">
              Register
            </button>
            <Link 
              to="/role-change"
              className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-all border border-white/10"
            >
              Admin
            </Link>
          </div>

          <div className="md:hidden">
            <Menu className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>
    </nav>
  );
}