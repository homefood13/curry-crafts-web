
import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ImageWithLoader from '@/components/ImageWithLoader';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px] overflow-hidden">
        <ImageWithLoader
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop"
          alt="Restaurant interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/30 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-playfair">
              Our Story
            </h1>
            <p className="text-white/90 max-w-2xl mx-auto text-lg">
              A journey of passion, tradition, and authentic Indian flavors
            </p>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <span className="uppercase text-indian-gold font-medium tracking-wider text-sm mb-2 inline-block">About Us</span>
              <h2 className="section-title">The Spirit of Authentic Indian Cuisine</h2>
              <p className="text-indian-brown/80 mb-6">
                Spice Saga began with a simple yet profound vision: to bring the authentic flavors of India to food enthusiasts around the world. Founded in 2010 by Chef Rahul Sharma, our restaurant embodies the rich culinary heritage of various Indian regions.
              </p>
              <p className="text-indian-brown/80 mb-6">
                Chef Rahul's journey started in the vibrant streets of Delhi, where he learned the art of blending spices from local vendors and family recipes. His passion for cooking led him to train under renowned chefs across India, mastering regional cuisines from the royal kitchens of Rajasthan to the coastal flavors of Kerala.
              </p>
              <p className="text-indian-brown/80">
                At Spice Saga, we believe that food is more than just sustenance—it's a cultural experience that brings people together. Every dish we serve tells a story of tradition, innovation, and the love for authentic flavors.
              </p>
            </div>
            
            <div className="order-1 lg:order-2 relative">
              <div className="relative z-10 rounded-lg overflow-hidden shadow-elegant">
                <ImageWithLoader
                  src="https://images.unsplash.com/photo-1624797432677-6f803a90acef?q=80&w=1974&auto=format&fit=crop"
                  alt="Chef cooking"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <div className="absolute top-[-20px] right-[-20px] w-72 h-72 bg-indian-gold/10 rounded-full -z-10" />
              <div className="absolute bottom-[-30px] left-[-30px] w-64 h-64 border-2 border-indian-red rounded-full -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-indian-cream">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="uppercase text-indian-gold font-medium tracking-wider text-sm mb-2 inline-block">Our Philosophy</span>
            <h2 className="section-title-center">Values That Guide Us</h2>
            <p className="text-indian-brown/80 max-w-2xl mx-auto mt-6">
              At the heart of Spice Saga are core values that drive our passion for authentic Indian cuisine and exceptional dining experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Authenticity",
                description: "We preserve traditional cooking methods and recipes, using hand-picked spices and ingredients to maintain the true essence of Indian cuisine.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indian-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                )
              },
              {
                title: "Quality",
                description: "We never compromise on the quality of our ingredients. We source the freshest produce and finest spices to create memorable dishes every time.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indian-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                )
              },
              {
                title: "Hospitality",
                description: "We believe in treating every guest like family, providing warm, attentive service that makes dining with us a memorable experience.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indian-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                )
              },
              {
                title: "Innovation",
                description: "While honoring tradition, we embrace creativity in our culinary approach, blending classic techniques with contemporary presentations.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indian-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                )
              },
              {
                title: "Sustainability",
                description: "We are committed to responsible practices, from sourcing ingredients to reducing waste, ensuring we care for both our community and environment.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indian-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                title: "Community",
                description: "We cherish our role in the community, creating a space where people can connect, celebrate, and create lasting memories through food.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indian-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )
              },
            ].map((value, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-lg shadow-elegant transition-all duration-300 hover:shadow-lg"
              >
                <div className="mb-6">{value.icon}</div>
                <h3 className="text-xl font-bold mb-3 font-playfair text-indian-brown">
                  {value.title}
                </h3>
                <p className="text-indian-brown/70">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="uppercase text-indian-gold font-medium tracking-wider text-sm mb-2 inline-block">The Experts</span>
            <h2 className="section-title-center">Meet Our Culinary Team</h2>
            <p className="text-indian-brown/80 max-w-2xl mx-auto mt-6">
              The passionate individuals behind our exceptional dining experience, bringing expertise, creativity, and heart to every dish.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Rahul Sharma",
                role: "Head Chef & Founder",
                bio: "With over 20 years of culinary experience across India, Chef Rahul brings authentic regional recipes to Spice Saga. His passion for traditional cooking techniques is at the heart of our restaurant's philosophy.",
                image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1954&auto=format&fit=crop"
              },
              {
                name: "Priya Patel",
                role: "Executive Chef",
                bio: "Chef Priya specializes in vegetarian cuisine, creating innovative dishes that showcase the rich diversity of Indian vegetarian cooking. Her modern interpretations of classic recipes have won multiple culinary awards.",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop"
              },
              {
                name: "Arjun Kapoor",
                role: "Pastry Chef",
                bio: "Bringing a fusion approach to traditional Indian desserts, Chef Arjun combines classic techniques with contemporary presentation. His innovative creations provide the perfect sweet ending to your dining experience.",
                image: "https://images.unsplash.com/photo-1600565193348-7a28d2346a61?q=80&w=2070&auto=format&fit=crop"
              }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-elegant overflow-hidden">
                <div className="h-64 overflow-hidden">
                  <ImageWithLoader
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1 font-playfair text-indian-brown">
                    {member.name}
                  </h3>
                  <p className="text-indian-red font-medium mb-4">{member.role}</p>
                  <p className="text-indian-brown/70">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-indian-brown relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <ImageWithLoader
            src="https://images.unsplash.com/photo-1594221708779-94832f4320d1?q=80&w=2070&auto=format&fit=crop"
            alt="Background pattern"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container-custom relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-playfair">
              Come Experience Our Authentic Cuisine
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Join us for a memorable dining experience and discover why our guests keep coming back for more.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/contact" className="btn-primary inline-flex items-center">
                Book a Table <ArrowRight size={16} className="ml-2" />
              </Link>
              <Link to="/menu" className="btn-secondary bg-transparent border-white text-white hover:bg-white hover:text-indian-brown">
                View Our Menu
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
