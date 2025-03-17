import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import FeaturedDishes from '../components/FeaturedDishes';
import { Link } from 'react-router-dom';
import { ArrowRight, UtensilsCrossed, Award, Clock, Users } from 'lucide-react';
import ImageWithLoader from '../components/ImageWithLoader';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* About Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative z-10 rounded-lg overflow-hidden shadow-elegant animate-fade-in">
                <ImageWithLoader
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
                  alt="Restaurant interior"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <div className="absolute top-[-20px] left-[-20px] w-72 h-72 bg-indian-gold/10 rounded-full -z-10 animate-spin-slow" />
              <div className="absolute bottom-[-30px] right-[-30px] w-64 h-64 border-2 border-indian-gold rounded-full -z-10" />
            </div>
            
            <div className="animate-fade-in">
              <span className="uppercase text-indian-gold font-medium tracking-wider text-sm mb-2 inline-block">Our Story</span>
              <h2 className="section-title">Authentic Indian Cuisine in the Heart of the City</h2>
              <p className="text-indian-brown/80 mb-6">
                At Spice Saga, we bring the authentic flavors of India to your plate. Our journey began with a passion for traditional Indian cooking and a desire to share the rich culinary heritage with food lovers. 
              </p>
              <p className="text-indian-brown/80 mb-8">
                Each dish is crafted with care, using hand-picked spices and fresh ingredients to create a symphony of flavors that transport you to the vibrant streets and royal kitchens of India.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-indian-gold/10 flex items-center justify-center mr-4 flex-shrink-0">
                    <UtensilsCrossed size={20} className="text-indian-gold" />
                  </div>
                  <div>
                    <h3 className="font-medium text-indian-brown mb-1">Authentic Recipes</h3>
                    <p className="text-sm text-indian-brown/70">Traditional cooking techniques</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-indian-gold/10 flex items-center justify-center mr-4 flex-shrink-0">
                    <Award size={20} className="text-indian-gold" />
                  </div>
                  <div>
                    <h3 className="font-medium text-indian-brown mb-1">Premium Quality</h3>
                    <p className="text-sm text-indian-brown/70">Fresh, hand-picked ingredients</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-indian-gold/10 flex items-center justify-center mr-4 flex-shrink-0">
                    <Clock size={20} className="text-indian-gold" />
                  </div>
                  <div>
                    <h3 className="font-medium text-indian-brown mb-1">Timely Service</h3>
                    <p className="text-sm text-indian-brown/70">Efficient and attentive staff</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-indian-gold/10 flex items-center justify-center mr-4 flex-shrink-0">
                    <Users size={20} className="text-indian-gold" />
                  </div>
                  <div>
                    <h3 className="font-medium text-indian-brown mb-1">Family Friendly</h3>
                    <p className="text-sm text-indian-brown/70">Welcoming atmosphere for all</p>
                  </div>
                </div>
              </div>
              
              <Link to="/about" className="btn-primary inline-flex items-center">
                Read Our Story <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Dishes */}
      <FeaturedDishes />
      
      {/* Testimonials */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-indian-cream to-white" />
        
        <div className="container-custom relative">
          <div className="text-center mb-16">
            <span className="uppercase text-indian-gold font-medium tracking-wider text-sm mb-2 inline-block">Testimonials</span>
            <h2 className="section-title-center">What Our Guests Say</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                comment: "The flavors are incredibly authentic! The butter chicken transported me straight back to my travels in Northern India.",
                rating: 5,
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop"
              },
              {
                name: "Michael Chen",
                comment: "Absolutely the best Indian food in the city. The biryani is perfectly spiced and the naan bread is heavenly. Will definitely be returning!",
                rating: 5,
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787&auto=format&fit=crop"
              },
              {
                name: "Emily Rodriguez",
                comment: "Such a warm and inviting atmosphere! The staff was incredibly attentive, and the food was outstanding. Their vegetarian options are creative and delicious.",
                rating: 5,
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2861&auto=format&fit=crop"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white border border-gray-100 rounded-lg p-6 shadow-elegant hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <ImageWithLoader
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-indian-brown">{testimonial.name}</h3>
                    <div className="flex">
                      {Array(testimonial.rating).fill(0).map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-indian-gold" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-indian-brown/80 italic">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/contact" className="btn-secondary inline-flex items-center">
              Book Your Experience <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 bg-indian-brown relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <ImageWithLoader
            src="https://images.unsplash.com/photo-1630383249896-483b1fbf851c?q=80&w=2030&auto=format&fit=crop"
            alt="Background pattern"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container-custom relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-playfair">Experience the Royal Flavors of India</h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Join us for a culinary journey through the diverse regions of India. 
              Book a table today and indulge in an authentic dining experience.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/menu" className="btn-secondary bg-white border-white text-indian-brown hover:bg-transparent hover:text-white">
                View Our Menu
              </Link>
              <Link to="/private-dining" className="btn-primary bg-indian-red text-white">
                Book a Table
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
