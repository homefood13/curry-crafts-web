import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload } from 'lucide-react';
import ImageWithLoader from '@/components/ImageWithLoader';
import { useAuth } from '@/contexts/AuthContext';
import { supabase, uploadImage, getGalleryImages } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const Gallery = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState([
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1585937421612-70a008356c36?q=80&w=2070&auto=format&fit=crop",
      alt: "Authentic Indian cuisine - butter chicken",
      category: "Main Course"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=2788&auto=format&fit=crop",
      alt: "Aromatic spices used in Indian cooking",
      category: "Ingredients"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?q=80&w=2000&auto=format&fit=crop",
      alt: "Traditional Indian thali with various dishes",
      category: "Special Thali"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1517244683847-7456b63c5969?q=80&w=2788&auto=format&fit=crop",
      alt: "Freshly baked naan bread",
      category: "Bread"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1542367592-8849eb970fab?q=80&w=2831&auto=format&fit=crop",
      alt: "Colorful Indian sweets and desserts",
      category: "Desserts"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?q=80&w=2940&auto=format&fit=crop",
      alt: "Elegant restaurant interior",
      category: "Restaurant"
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?q=80&w=2787&auto=format&fit=crop",
      alt: "Indian street food favorites",
      category: "Street Food"
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=2940&auto=format&fit=crop",
      alt: "Traditional clay oven tandoor",
      category: "Kitchen"
    },
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1540202404-1b927e27fa8b?q=80&w=2833&auto=format&fit=crop",
      alt: "Freshly prepared biryani",
      category: "Rice Dishes"
    }
  ]);
  const { user } = useAuth();
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const storageImages = await getGalleryImages();
        
        // In a full implementation, we would map the Supabase storage files to our gallery format
        // and merge with or replace the default images
        console.log('Supabase storage images:', storageImages);
        
        // For now, we'll keep using the hardcoded array
      } catch (error) {
        console.error('Error fetching gallery images:', error);
      }
    };
    
    fetchImages();
  }, []);
  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files.length) return;
    
    setIsUploading(true);
    const file = e.target.files[0];
    
    try {
      await uploadImage(file, 'gallery');
      toast({
        title: "Image Uploaded",
        description: "Your image has been uploaded successfully.",
      });
      
      // In a full implementation, we would refresh the gallery here
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your image.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px] overflow-hidden">
        <ImageWithLoader
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop"
          alt="Restaurant gallery"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/30 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-playfair">
              Our Gallery
            </h1>
            <p className="text-white/90 max-w-2xl mx-auto text-lg">
              A visual journey through our culinary creations and ambiance
            </p>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <section className="py-20">
        <div className="container-custom">
          <span className="uppercase text-indian-gold font-medium tracking-wider text-sm mb-2 inline-block">Explore</span>
          <h2 className="section-title">Our Culinary Journey</h2>
          <p className="text-indian-brown/80 max-w-3xl mb-12">
            Immerse yourself in the visual feast of our authentic dishes, elegant restaurant spaces, and the art of Indian cuisine preparation. Each image tells a story of tradition, flavor, and passion.
          </p>

          {/* Admin Upload Button - Only show to logged in users */}
          {user && (
            <div className="mb-8">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                disabled={isUploading}
              >
                <Upload size={16} />
                <label className="cursor-pointer">
                  {isUploading ? 'Uploading...' : 'Upload New Image'}
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleImageUpload}
                    disabled={isUploading}
                  />
                </label>
              </Button>
            </div>
          )}

          {/* Image Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {galleryImages.map((image) => (
              <motion.div
                key={image.id}
                className="image-card cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedImage(image.src)}
              >
                <ImageWithLoader
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <div className="text-white">
                    <span className="text-xs text-indian-gold/90 font-medium uppercase tracking-wider block mb-1">
                      {image.category}
                    </span>
                    <p className="font-medium">{image.alt}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Lightbox */}
          <AnimatePresence>
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 md:p-8"
                onClick={() => setSelectedImage(null)}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: "spring", damping: 25 }}
                  className="relative max-w-full max-h-full overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative">
                    <img
                      src={selectedImage}
                      alt="Enlarged view"
                      className="max-h-[85vh] max-w-full object-contain"
                    />
                    <button
                      className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 text-white backdrop-blur-sm transition-all duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(null);
                      }}
                    >
                      <X size={24} />
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
