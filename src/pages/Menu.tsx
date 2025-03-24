import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ImageWithLoader from '@/components/ImageWithLoader';
import { getMenuItems } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

// Menu categories
const categories = [
  { id: 'starters', name: 'Starters' },
  { id: 'main-course', name: 'Main Course' },
  { id: 'biryani', name: 'Biryani & Rice' },
  { id: 'breads', name: 'Breads' },
  { id: 'desserts', name: 'Desserts' },
  { id: 'beverages', name: 'Beverages' }
];

// Menu items
const menuItems = [
  // Starters
  {
    id: 1,
    name: 'Paneer Tikka',
    description: 'Cubes of cottage cheese marinated in spices and yogurt, grilled to perfection.',
    price: '$14.95',
    category: 'starters',
    spicyLevel: 'medium',
    dietary: 'vegetarian',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=2017&auto=format&fit=crop',
    popular: true,
  },
  {
    id: 2,
    name: 'Vegetable Samosas',
    description: 'Crispy pastry filled with spiced potatoes and peas, served with mint chutney.',
    price: '$10.95',
    category: 'starters',
    spicyLevel: 'mild',
    dietary: 'vegetarian',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=2031&auto=format&fit=crop',
    popular: true,
  },
  {
    id: 3,
    name: 'Onion Bhaji',
    description: 'Crispy onion fritters made with chickpea flour and spices.',
    price: '$9.95',
    category: 'starters',
    spicyLevel: 'mild',
    dietary: 'vegetarian',
    image: 'https://images.unsplash.com/photo-1626700846055-8dce082e9cde?q=80&w=1965&auto=format&fit=crop',
  },

  // Main Course
  {
    id: 4,
    name: 'Butter Chicken',
    description: 'Tender chicken cooked in a rich, creamy tomato sauce with aromatic spices.',
    price: '$18.95',
    category: 'main-course',
    spicyLevel: 'medium',
    dietary: 'non-vegetarian',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=2070&auto=format&fit=crop',
    popular: true,
  },
  {
    id: 5,
    name: 'Palak Paneer',
    description: 'Cottage cheese cubes in a creamy spinach gravy flavored with spices.',
    price: '$16.95',
    category: 'main-course',
    spicyLevel: 'mild',
    dietary: 'vegetarian',
    image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 6,
    name: 'Lamb Rogan Josh',
    description: 'Tender lamb pieces slow-cooked in a rich gravy of Kashmiri spices.',
    price: '$21.95',
    category: 'main-course',
    spicyLevel: 'hot',
    dietary: 'non-vegetarian',
    image: 'https://images.unsplash.com/photo-1545247181-516773cae754?q=80&w=2080&auto=format&fit=crop',
    popular: true,
  },
  
  // Biryani & Rice
  {
    id: 7,
    name: 'Chicken Biryani',
    description: 'Fragrant basmati rice layered with marinated chicken and aromatic spices.',
    price: '$19.95',
    category: 'biryani',
    spicyLevel: 'medium',
    dietary: 'non-vegetarian',
    image: 'https://images.unsplash.com/photo-1642821373181-696a54913e93?q=80&w=2070&auto=format&fit=crop',
    popular: true,
  },
  {
    id: 8,
    name: 'Vegetable Biryani',
    description: 'Fragrant basmati rice cooked with mixed vegetables and authentic spices.',
    price: '$16.95',
    category: 'biryani',
    spicyLevel: 'medium',
    dietary: 'vegetarian',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 9,
    name: 'Jeera Rice',
    description: 'Basmati rice flavored with cumin seeds and clarified butter.',
    price: '$6.95',
    category: 'biryani',
    spicyLevel: 'mild',
    dietary: 'vegetarian',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=2035&auto=format&fit=crop',
  },
  
  // Breads
  {
    id: 10,
    name: 'Garlic Naan',
    description: 'Soft leavened bread topped with garlic and butter, baked in tandoor.',
    price: '$4.95',
    category: 'breads',
    spicyLevel: 'none',
    dietary: 'vegetarian',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=2031&auto=format&fit=crop',
    popular: true,
  },
  {
    id: 11,
    name: 'Butter Roti',
    description: 'Whole wheat flatbread brushed with butter.',
    price: '$3.95',
    category: 'breads',
    spicyLevel: 'none',
    dietary: 'vegetarian',
    image: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=2788&auto=format&fit=crop',
  },
  {
    id: 12,
    name: 'Cheese Naan',
    description: 'Soft leavened bread stuffed with cheese, baked in tandoor.',
    price: '$5.95',
    category: 'breads',
    spicyLevel: 'none',
    dietary: 'vegetarian',
    image: 'https://images.unsplash.com/photo-1633478062482-5a8a52981aa2?q=80&w=2070&auto=format&fit=crop',
  },
  
  // Desserts
  {
    id: 13,
    name: 'Gulab Jamun',
    description: 'Soft milk solids balls soaked in rose-flavored sugar syrup.',
    price: '$6.95',
    category: 'desserts',
    spicyLevel: 'none',
    dietary: 'vegetarian',
    image: 'https://images.unsplash.com/photo-1533326037600-6af80c966c59?q=80&w=2088&auto=format&fit=crop',
    popular: true,
  },
  {
    id: 14,
    name: 'Kulfi',
    description: 'Traditional Indian ice cream flavored with cardamom and saffron.',
    price: '$7.95',
    category: 'desserts',
    spicyLevel: 'none',
    dietary: 'vegetarian',
    image: 'https://images.unsplash.com/photo-1555344784-24b31414baff?q=80&w=2070&auto=format&fit=crop',
  },
  
  // Beverages
  {
    id: 15,
    name: 'Mango Lassi',
    description: 'Refreshing yogurt drink with mango pulp and a hint of cardamom.',
    price: '$5.95',
    category: 'beverages',
    spicyLevel: 'none',
    dietary: 'vegetarian',
    image: 'https://images.unsplash.com/photo-1625021658232-bfdc235176e8?q=80&w=2024&auto=format&fit=crop',
    popular: true,
  },
  {
    id: 16,
    name: 'Masala Chai',
    description: 'Traditional spiced tea with milk, cardamom, ginger, and cinnamon.',
    price: '$4.95',
    category: 'beverages',
    spicyLevel: 'none',
    dietary: 'vegetarian',
    image: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?q=80&w=2070&auto=format&fit=crop',
  },
];

const Menu = () => {
  const [activeTab, setActiveTab] = useState(categories[0].id);
  const [menuItems, setMenuItems] = useState([
    // Starters
    {
      id: 1,
      name: 'Paneer Tikka',
      description: 'Cubes of cottage cheese marinated in spices and yogurt, grilled to perfection.',
      price: '$14.95',
      category: 'starters',
      spicyLevel: 'medium',
      dietary: 'vegetarian',
      image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=2017&auto=format&fit=crop',
      popular: true,
    },
    {
      id: 2,
      name: 'Vegetable Samosas',
      description: 'Crispy pastry filled with spiced potatoes and peas, served with mint chutney.',
      price: '$10.95',
      category: 'starters',
      spicyLevel: 'mild',
      dietary: 'vegetarian',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=2031&auto=format&fit=crop',
      popular: true,
    },
    {
      id: 3,
      name: 'Onion Bhaji',
      description: 'Crispy onion fritters made with chickpea flour and spices.',
      price: '$9.95',
      category: 'starters',
      spicyLevel: 'mild',
      dietary: 'vegetarian',
      image: 'https://images.unsplash.com/photo-1626700846055-8dce082e9cde?q=80&w=1965&auto=format&fit=crop',
    },

    // Main Course
    {
      id: 4,
      name: 'Butter Chicken',
      description: 'Tender chicken cooked in a rich, creamy tomato sauce with aromatic spices.',
      price: '$18.95',
      category: 'main-course',
      spicyLevel: 'medium',
      dietary: 'non-vegetarian',
      image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=2070&auto=format&fit=crop',
      popular: true,
    },
    {
      id: 5,
      name: 'Palak Paneer',
      description: 'Cottage cheese cubes in a creamy spinach gravy flavored with spices.',
      price: '$16.95',
      category: 'main-course',
      spicyLevel: 'mild',
      dietary: 'vegetarian',
      image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?q=80&w=1974&auto=format&fit=crop',
    },
    {
      id: 6,
      name: 'Lamb Rogan Josh',
      description: 'Tender lamb pieces slow-cooked in a rich gravy of Kashmiri spices.',
      price: '$21.95',
      category: 'main-course',
      spicyLevel: 'hot',
      dietary: 'non-vegetarian',
      image: 'https://images.unsplash.com/photo-1545247181-516773cae754?q=80&w=2080&auto=format&fit=crop',
      popular: true,
    },
    
    // Biryani & Rice
    {
      id: 7,
      name: 'Chicken Biryani',
      description: 'Fragrant basmati rice layered with marinated chicken and aromatic spices.',
      price: '$19.95',
      category: 'biryani',
      spicyLevel: 'medium',
      dietary: 'non-vegetarian',
      image: 'https://images.unsplash.com/photo-1642821373181-696a54913e93?q=80&w=2070&auto=format&fit=crop',
      popular: true,
    },
    {
      id: 8,
      name: 'Vegetable Biryani',
      description: 'Fragrant basmati rice cooked with mixed vegetables and authentic spices.',
      price: '$16.95',
      category: 'biryani',
      spicyLevel: 'medium',
      dietary: 'vegetarian',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=2070&auto=format&fit=crop',
    },
    {
      id: 9,
      name: 'Jeera Rice',
      description: 'Basmati rice flavored with cumin seeds and clarified butter.',
      price: '$6.95',
      category: 'biryani',
      spicyLevel: 'mild',
      dietary: 'vegetarian',
      image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=2035&auto=format&fit=crop',
    },
    
    // Breads
    {
      id: 10,
      name: 'Garlic Naan',
      description: 'Soft leavened bread topped with garlic and butter, baked in tandoor.',
      price: '$4.95',
      category: 'breads',
      spicyLevel: 'none',
      dietary: 'vegetarian',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=2031&auto=format&fit=crop',
      popular: true,
    },
    {
      id: 11,
      name: 'Butter Roti',
      description: 'Whole wheat flatbread brushed with butter.',
      price: '$3.95',
      category: 'breads',
      spicyLevel: 'none',
      dietary: 'vegetarian',
      image: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=2788&auto=format&fit=crop',
    },
    {
      id: 12,
      name: 'Cheese Naan',
      description: 'Soft leavened bread stuffed with cheese, baked in tandoor.',
      price: '$5.95',
      category: 'breads',
      spicyLevel: 'none',
      dietary: 'vegetarian',
      image: 'https://images.unsplash.com/photo-1633478062482-5a8a52981aa2?q=80&w=2070&auto=format&fit=crop',
    },
    
    // Desserts
    {
      id: 13,
      name: 'Gulab Jamun',
      description: 'Soft milk solids balls soaked in rose-flavored sugar syrup.',
      price: '$6.95',
      category: 'desserts',
      spicyLevel: 'none',
      dietary: 'vegetarian',
      image: 'https://images.unsplash.com/photo-1533326037600-6af80c966c59?q=80&w=2088&auto=format&fit=crop',
      popular: true,
    },
    {
      id: 14,
      name: 'Kulfi',
      description: 'Traditional Indian ice cream flavored with cardamom and saffron.',
      price: '$7.95',
      category: 'desserts',
      spicyLevel: 'none',
      dietary: 'vegetarian',
      image: 'https://images.unsplash.com/photo-1555344784-24b31414baff?q=80&w=2070&auto=format&fit=crop',
    },
    
    // Beverages
    {
      id: 15,
      name: 'Mango Lassi',
      description: 'Refreshing yogurt drink with mango pulp and a hint of cardamom.',
      price: '$5.95',
      category: 'beverages',
      spicyLevel: 'none',
      dietary: 'vegetarian',
      image: 'https://images.unsplash.com/photo-1625021658232-bfdc235176e8?q=80&w=2024&auto=format&fit=crop',
      popular: true,
    },
    {
      id: 16,
      name: 'Masala Chai',
      description: 'Traditional spiced tea with milk, cardamom, ginger, and cinnamon.',
      price: '$4.95',
      category: 'beverages',
      spicyLevel: 'none',
      dietary: 'vegetarian',
      image: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?q=80&w=2070&auto=format&fit=crop',
    },
  ]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await getMenuItems();
        // In a full implementation, we would use the data from Supabase
        // setMenuItems(data);
        console.log('Menu items from Supabase:', data);
        
        // For now, we'll continue using the hardcoded menu items
        setLoading(false);
      } catch (error) {
        console.error('Error fetching menu items:', error);
        toast({
          title: "Error",
          description: "Failed to load menu items",
          variant: "destructive",
        });
        setLoading(false);
      }
    };
    
    fetchMenu();
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px] overflow-hidden">
        <ImageWithLoader
          src="https://images.unsplash.com/photo-1611489142329-5f62cfa43e6e?q=80&w=2070&auto=format&fit=crop"
          alt="Indian food spread"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/30 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-playfair">
              Our Menu
            </h1>
            <p className="text-white/90 max-w-2xl mx-auto text-lg">
              Explore our authentic Indian dishes, crafted with tradition and passion
            </p>
          </div>
        </div>
      </div>

      {/* Menu Content */}
      <div className="container-custom mt-12">
        {user && (
          <div className="flex justify-end mb-6">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => navigate('/dashboard')}
            >
              <Pencil size={16} />
              Manage Menu
            </Button>
          </div>
        )}
        
        {loading ? (
          <div className="text-center py-20">
            <p>Loading menu items...</p>
          </div>
        ) : (
          <Tabs defaultValue={categories[0].id} value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-center mb-10">
              <TabsList className="bg-muted/50 p-1 rounded-full">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="data-[state=active]:bg-white data-[state=active]:text-indian-red rounded-full px-6 py-2 transition-all"
                  >
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {menuItems
                    .filter((item) => item.category === category.id)
                    .map((item) => (
                      <div key={item.id} className="menu-card group h-full flex flex-col">
                        <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                          {item.popular && (
                            <div className="absolute top-3 right-3 z-10">
                              <span className="bg-indian-gold/90 text-indian-brown text-xs uppercase font-bold py-1 px-2 rounded-full">
                                Popular
                              </span>
                            </div>
                          )}
                          <ImageWithLoader
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                        
                        <div className="flex-grow">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-bold font-playfair text-indian-brown">{item.name}</h3>
                            <span className="text-lg font-bold text-indian-red">{item.price}</span>
                          </div>
                          
                          <p className="text-indian-brown/70 mb-3">{item.description}</p>
                          
                          <div className="flex items-center space-x-2 mt-auto">
                            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                              item.spicyLevel === 'hot' 
                                ? 'bg-indian-red/10 text-indian-red' 
                                : item.spicyLevel === 'medium'
                                ? 'bg-indian-orange/10 text-indian-orange'
                                : item.spicyLevel === 'mild'
                                ? 'bg-indian-gold/10 text-indian-gold'
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              {item.spicyLevel === 'none' ? 'Non-Spicy' : `${item.spicyLevel.charAt(0).toUpperCase() + item.spicyLevel.slice(1)} Spicy`}
                            </span>
                            
                            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                              item.dietary === 'vegetarian' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-orange-100 text-orange-800'
                            }`}>
                              {item.dietary === 'vegetarian' ? 'Vegetarian' : 'Non-Vegetarian'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                
                {menuItems.filter(item => item.category === category.id).length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-indian-brown/70">Coming soon! Check back for updates to our menu.</p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        )}
      </div>
      
      {/* Special Dietary Requirements */}
      <section className="mt-20 py-16 bg-indian-cream">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="section-title-center">Special Dietary Requirements</h2>
            <p className="text-indian-brown/80 max-w-2xl mx-auto">
              We understand the importance of catering to different dietary needs. Please inform our staff about any allergies or dietary restrictions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-elegant text-center">
              <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 font-playfair text-indian-brown">Vegetarian Options</h3>
              <p className="text-indian-brown/70 text-sm">
                We offer a wide range of vegetarian dishes prepared with separate utensils.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-elegant text-center">
              <div className="w-14 h-14 rounded-full bg-yellow-50 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 font-playfair text-indian-brown">Allergen Information</h3>
              <p className="text-indian-brown/70 text-sm">
                Our staff can provide detailed allergen information for all our dishes.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-elegant text-center">
              <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 font-playfair text-indian-brown">Customized Spice Levels</h3>
              <p className="text-indian-brown/70 text-sm">
                We can adjust the spice level of most dishes according to your preference.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Menu;
