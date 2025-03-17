
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ImageWithLoader from './ImageWithLoader';

const dishes = [
  {
    id: 1,
    name: 'Butter Chicken',
    description: 'Tender chicken cooked in a rich, creamy tomato sauce with aromatic spices.',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=2070&auto=format&fit=crop',
    price: '$18.95',
    category: 'Main Course',
    popular: true,
  },
  {
    id: 2,
    name: 'Vegetable Biryani',
    description: 'Fragrant basmati rice cooked with mixed vegetables and authentic spices.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=2070&auto=format&fit=crop',
    price: '$16.95',
    category: 'Rice',
    popular: true,
  },
  {
    id: 3,
    name: 'Paneer Tikka',
    description: 'Cubes of cottage cheese marinated in spices and yogurt, grilled to perfection.',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=2017&auto=format&fit=crop',
    price: '$14.95',
    category: 'Starters',
    popular: true,
  },
];

const FeaturedDishes: React.FC = () => {
  return (
    <section className="py-20 bg-indian-cream relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-indian-gold/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indian-red/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
      
      <div className="container-custom relative">
        <div className="mb-16 text-center">
          <span className="uppercase text-indian-gold font-medium tracking-wider text-sm mb-2 inline-block">
            Our Specialties
          </span>
          <h2 className="section-title-center">Featured Dishes</h2>
          <p className="max-w-2xl mx-auto text-indian-brown/80 mt-6">
            Indulge in our chef's selection of authentic Indian cuisine, prepared with 
            hand-picked spices and traditional recipes passed down through generations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dishes.map((dish, index) => (
            <div 
              key={dish.id} 
              className="menu-card group flex flex-col h-full"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden rounded-lg mb-4 h-60">
                <div className="absolute top-3 right-3 z-10">
                  <span className="bg-indian-gold/90 text-indian-brown text-xs uppercase font-bold py-1 px-2 rounded-full">
                    Popular
                  </span>
                </div>
                <ImageWithLoader
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              <span className="text-indian-red text-sm font-medium">{dish.category}</span>
              <h3 className="text-xl font-bold mb-2 font-playfair text-indian-brown mt-1">{dish.name}</h3>
              <p className="text-indian-brown/70 mb-4 flex-grow">{dish.description}</p>
              
              <div className="flex items-center justify-between mt-2">
                <span className="text-lg font-playfair font-bold text-indian-brown">{dish.price}</span>
                <Link to="/menu" className="text-indian-red font-medium flex items-center hover:text-indian-gold transition-colors">
                  View Details <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link to="/menu" className="btn-primary inline-flex items-center">
            Explore Full Menu <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDishes;
