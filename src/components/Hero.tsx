
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import ImageWithLoader from './ImageWithLoader';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356c36?q=80&w=2070&auto=format&fit=crop',
    title: 'Experience the Authentic Flavors of India',
    subtitle: 'A culinary journey through regional Indian cuisine'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=2788&auto=format&fit=crop',
    title: 'Crafted with Passion & Tradition',
    subtitle: 'Hand-picked spices and family recipes'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?q=80&w=2000&auto=format&fit=crop',
    title: 'Discover Royal Indian Dining',
    subtitle: 'An ambiance inspired by India\'s rich heritage'
  }
];

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Images with Fade Transition */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <ImageWithLoader
            src={slide.image}
            alt={slide.title}
            className="object-cover h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        </div>
      ))}

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container-custom z-10 text-center">
          <div className="max-w-4xl mx-auto px-6">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`transition-all duration-1000 ${
                  index === currentSlide
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
              >
                {index === currentSlide && (
                  <>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-playfair leading-tight text-shadow-lg">
                      {slide.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-100 mb-8 max-w-2xl mx-auto font-light">
                      {slide.subtitle}
                    </p>
                  </>
                )}
              </div>
            ))}

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8 animate-fade-in">
              <Link to="/menu" className="btn-primary">
                View Our Menu
              </Link>
              <Link to="/contact" className="btn-secondary">
                Book a Table
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-indian-gold w-8'
                : 'bg-white/70 hover:bg-white'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
