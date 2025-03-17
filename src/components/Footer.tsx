
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ArrowRight 
} from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-indian-brown text-white relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 border-2 border-white/20 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 border-2 border-white/20 rounded-full translate-x-1/3 translate-y-1/3" />
      </div>
      
      <div className="container-custom pt-16 pb-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo and About */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="h-10 w-10 rounded-full border-2 border-indian-gold flex items-center justify-center">
                <span className="text-xl font-bold font-playfair text-white">S</span>
              </div>
              <span className="text-2xl font-bold font-playfair tracking-wider text-white">
                SPICE<span className="text-indian-gold">SAGA</span>
              </span>
            </Link>
            <p className="text-white/80 mb-6">
              Experience the authentic flavors of India with our carefully crafted dishes, 
              made from traditional recipes and the finest ingredients.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-indian-gold hover:text-indian-brown transition-colors">
                <Instagram size={18} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-indian-gold hover:text-indian-brown transition-colors">
                <Facebook size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-indian-gold hover:text-indian-brown transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 font-playfair">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'Menu', 'About Us', 'Gallery', 'Contact'].map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`} 
                    className="text-white/80 hover:text-indian-gold transition-colors flex items-center"
                  >
                    <ArrowRight size={14} className="mr-2" />
                    {item}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/menu" className="text-white/80 hover:text-indian-gold transition-colors flex items-center">
                  <ArrowRight size={14} className="mr-2" />
                  View Full Menu
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/80 hover:text-indian-gold transition-colors flex items-center">
                  <ArrowRight size={14} className="mr-2" />
                  Book a Table
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 font-playfair">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex">
                <MapPin size={20} className="mt-1 mr-3 text-indian-gold flex-shrink-0" />
                <span className="text-white/80">
                  123 Spice Avenue, Culinary District, Flavortown, CA 94158
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-3 text-indian-gold flex-shrink-0" />
                <a href="tel:+14155550123" className="text-white/80 hover:text-indian-gold transition-colors">
                  (415) 555-0123
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-3 text-indian-gold flex-shrink-0" />
                <a href="mailto:info@spicesaga.com" className="text-white/80 hover:text-indian-gold transition-colors">
                  info@spicesaga.com
                </a>
              </li>
            </ul>
          </div>
          
          {/* Opening Hours */}
          <div>
            <h3 className="text-xl font-bold mb-6 font-playfair">Opening Hours</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Clock size={20} className="mt-1 mr-3 text-indian-gold flex-shrink-0" />
                <div>
                  <p className="font-medium">Monday - Friday</p>
                  <p className="text-white/80">11:30 AM - 10:00 PM</p>
                </div>
              </li>
              <li className="flex items-start">
                <Clock size={20} className="mt-1 mr-3 text-indian-gold flex-shrink-0" />
                <div>
                  <p className="font-medium">Saturday - Sunday</p>
                  <p className="text-white/80">12:00 PM - 11:00 PM</p>
                </div>
              </li>
              <li className="mt-6">
                <Link to="/contact" className="btn-secondary border-indian-gold text-white hover:text-indian-brown inline-flex">
                  Book a Table
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-6 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Spice Saga. All rights reserved.
          </p>
          <div className="flex space-x-4 text-white/60 text-sm">
            <a href="#" className="hover:text-indian-gold">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-indian-gold">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
