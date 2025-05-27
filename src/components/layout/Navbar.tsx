import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Car, Heart, LogIn, LogOut, Menu, Search, ShoppingCart, User, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Check scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Handle search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/cars?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <Car size={28} className="text-primary-600 mr-2" />
          <span className="text-xl font-heading font-bold text-blue-900">
            Humble Autos
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={`font-medium transition-colors hover:text-primary-600 ${
              location.pathname === '/' ? 'text-primary-600' : 'text-blue-900'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/cars" 
            className={`font-medium transition-colors hover:text-primary-600 ${
              location.pathname === '/cars' ? 'text-primary-600' : 'text-blue-900'
            }`}
          >
            Inventory
          </Link>
          {user?.isAdmin && (
            <Link 
              to="/admin" 
              className={`font-medium transition-colors hover:text-primary-600 ${
                location.pathname.startsWith('/admin') ? 'text-blue-900' : 'text-blue-900'
              }`}
            >
              Admin
            </Link>
          )}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="p-2 rounded-full hover:bg-secondary-100 transition-colors"
            aria-label="Search"
          >
            <Search size={20} className="text-secondary-700" />
          </button>
          
          {isAuthenticated ? (
            <>
              <Link 
                to="/favorites" 
                className="p-2 rounded-full hover:bg-secondary-100 transition-colors"
                aria-label="Favorites"
              >
                <Heart size={20} className="text-secondary-700" />
              </Link>
              <div className="relative group">
                <button className="p-2 rounded-full hover:bg-secondary-100 transition-colors flex items-center">
                  <User size={20} className="text-secondary-700 mr-1" />
                  <span className="text-sm font-medium">{user.username}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {user.isAdmin && (
                    <Link
                      to="/admin"
                      className="block px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-100"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => logout()}
                    className="block w-full text-left px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-100"
                  >
                    <LogOut size={16} className="inline mr-2" />
                    Sign Out
                  </button>
                </div>
              </div>
            </>
          ) : (
            <Link 
              to="/login" 
              className="flex items-center px-4 py-2 rounded-md bg-primary-600 text-white hover:bg-primary-700 transition-colors"
            >
              <LogIn size={18} className="mr-1" />
              <span>Sign In</span>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-2">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="p-2 rounded-full hover:bg-secondary-100 transition-colors"
            aria-label="Search"
          >
            <Search size={20} className="text-secondary-700" />
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-full hover:bg-secondary-100 transition-colors"
            aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {isMenuOpen ? (
              <X size={24} className="text-secondary-700" />
            ) : (
              <Menu size={24} className="text-secondary-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-secondary-100 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <Link
                to="/"
                className="py-2 text-secondary-700 hover:text-primary-600 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/cars"
                className="py-2 text-secondary-700 hover:text-primary-600 transition-colors"
              >
                Inventory
              </Link>
              {isAuthenticated && (
                <Link
                  to="/favorites"
                  className="py-2 text-blue-900 hover:text-blue-900 transition-colors"
                >
                  <Heart size={18} className="inline mr-2" />
                  Favorites
                </Link>
              )}
              {user?.isAdmin && (
                <Link
                  to="/admin"
                  className="py-2 text-blue-900 hover:text-blue-900 transition-colors"
                >
                  Admin
                </Link>
              )}
              <div className="pt-2 border-t border-secondary-100">
                {isAuthenticated ? (
                  <button
                    onClick={() => logout()}
                    className="flex items-center py-2 text-blue-900 hover:text-blue-900 transition-colors"
                  >
                    <LogOut size={18} className="mr-2" />
                    Sign Out
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center py-2 text-blue-900 hover:text-blue-900 transition-colors"
                  >
                    <LogIn size={18} className="mr-2" />
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-secondary-900/80 z-50 flex items-start justify-center pt-20 px-4"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              exit={{ y: -20 }}
              className="w-full max-w-2xl bg-white rounded-lg shadow-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search for cars..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-10 text-lg focus:outline-none"
                  autoFocus
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X className="text-secondary-400 hover:text-secondary-600" />
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;