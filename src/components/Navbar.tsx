
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'About Us', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-sm shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-10 w-10 rounded-full border-2 border-indian-gold flex items-center justify-center">
            <span className="text-xl font-bold font-playfair text-indian-red">S</span>
          </div>
          <span className="text-2xl font-bold font-playfair tracking-wider text-indian-brown">
            SPICE<span className="text-indian-red">SAGA</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${
                location.pathname === link.path ? 'text-indian-red after:scale-x-100' : ''
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/contact"
            className="btn-primary whitespace-nowrap"
          >
            Book a Table
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-indian-brown focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X size={24} className="text-indian-red" />
          ) : (
            <Menu size={24} />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden fixed inset-0 bg-white/95 backdrop-blur-sm z-40 transform transition-transform duration-300 ease-in-out pt-20 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="container mx-auto px-6 py-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block text-lg py-3 border-b border-gray-100 ${
                location.pathname === link.path
                  ? 'text-indian-red font-medium'
                  : 'text-indian-brown'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/contact"
            className="block mt-6 w-full btn-primary text-center"
          >
            Book a Table
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
