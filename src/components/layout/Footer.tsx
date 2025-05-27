import { Link } from 'react-router-dom';
import { Car, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Footer Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div>
            <Link to="/" className="flex items-center mb-4">
              <Car size={24} className="text-primary-500 mr-2" />
              <span className="text-xl font-heading font-bold">Humble Autos</span>
            </Link>
            <p className="text-secondary-300 mb-6">
              Discover luxury and performance vehicles that exceed your expectations. Your journey to exceptional driving starts here.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-secondary-300 hover:text-primary-500 transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-secondary-300 hover:text-primary-500 transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-secondary-300 hover:text-primary-500 transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-secondary-300 hover:text-primary-500 transition-colors" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-secondary-300 hover:text-primary-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/cars" className="text-secondary-300 hover:text-primary-500 transition-colors">
                  Inventory
                </Link>
              </li>
              <li>
                <Link to="/cars?category=luxury" className="text-secondary-300 hover:text-primary-500 transition-colors">
                  Luxury Cars
                </Link>
              </li>
              <li>
                <Link to="/cars?category=sports" className="text-secondary-300 hover:text-primary-500 transition-colors">
                  Sports Cars
                </Link>
              </li>
              <li>
                <Link to="/cars?category=electric" className="text-secondary-300 hover:text-primary-500 transition-colors">
                  Electric Vehicles
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-secondary-300 hover:text-primary-500 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-300 hover:text-primary-500 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-300 hover:text-primary-500 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-300 hover:text-primary-500 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-300 hover:text-primary-500 transition-colors">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="not-italic text-secondary-300">
              <p className="mb-2">123 Luxury Drive</p>
              <p className="mb-2">Beverly Hills, CA 90210</p>
              <p className="mb-2">Email: info@humbleautos.com</p>
              <p>Phone: (555) 123-4567</p>
            </address>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-secondary-700 my-6"></div>

        {/* Copyright */}
        <div className="text-center text-secondary-400 text-sm">
          <p>&copy; {currentYear} Humble Autos. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;