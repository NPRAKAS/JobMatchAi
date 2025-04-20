import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Menu, X } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { resetData } = useAppContext();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex justify-between items-center py-4">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-primary-600"
            onClick={resetData}
          >
            <Briefcase className="h-6 w-6 text-primary-600" />
            <span className="font-bold text-xl">JobMatch AI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 transition duration-150">
              Home
            </Link>
            <Link to="/analyze" className="text-gray-700 hover:text-primary-600 transition duration-150">
              Analyze Job
            </Link>
            <Link to="/build" className="text-gray-700 hover:text-primary-600 transition duration-150">
              Build Resume
            </Link>
            <Link to="/optimize" className="text-gray-700 hover:text-primary-600 transition duration-150">
              Optimize
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 hover:text-primary-600 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-primary-600 transition duration-150 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/analyze" 
                className="text-gray-700 hover:text-primary-600 transition duration-150 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Analyze Job
              </Link>
              <Link 
                to="/build" 
                className="text-gray-700 hover:text-primary-600 transition duration-150 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Build Resume
              </Link>
              <Link 
                to="/optimize" 
                className="text-gray-700 hover:text-primary-600 transition duration-150 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Optimize
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;