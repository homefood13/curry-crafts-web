
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ImageWithLoader from '@/components/ImageWithLoader';
import { Trash2, Upload } from 'lucide-react';
import { uploadImage, getGalleryImages } from '@/lib/supabase';
import { toast } from "@/hooks/use-toast";

interface GalleryTabProps {
  galleryImages: any[];
  setGalleryImages: React.Dispatch<React.SetStateAction<any[]>>;
}

const GalleryTab: React.FC<GalleryTabProps> = ({ galleryImages, setGalleryImages }) => {
  const [isUploading, setIsUploading] = useState(false);
  
  const handleGalleryImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files.length) return;
    
    setIsUploading(true);
    const file = e.target.files[0];
    
    try {
      const imageUrl = await uploadImage(file, 'gallery');
      if (imageUrl) {
        // Refresh gallery images
        const galleryData = await getGalleryImages();
        setGalleryImages(galleryData);
        
        toast({
          title: "Success",
          description: "Gallery image uploaded successfully",
        });
      }
    } catch (error) {
      console.error('Error uploading gallery image:', error);
      toast({
        title: "Error",
        description: "Failed to upload gallery image",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Gallery Management</CardTitle>
          <CardDescription>Upload and manage images for your gallery</CardDescription>
        </div>
        <Button className="bg-indian-red hover:bg-indian-red/90">
          <label className="cursor-pointer flex items-center">
            <Upload size={16} className="mr-1" />
            {isUploading ? 'Uploading...' : 'Upload New Image'}
            <input 
              type="file" 
              className="hidden" 
              accept="image/*"
              onChange={handleGalleryImageUpload}
              disabled={isUploading}
            />
          </label>
        </Button>
      </CardHeader>
      <CardContent>
        {galleryImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <div key={index} className="relative group h-48 rounded-lg overflow-hidden">
                <ImageWithLoader
                  src={image.url || image.publicUrl}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <Button variant="destructive" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 size={16} className="mr-1" /> Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="mb-4">No gallery images found. Upload your first image to get started.</p>
            <Button className="bg-indian-red hover:bg-indian-red/90">
              <label className="cursor-pointer flex items-center">
                <Upload size={16} className="mr-1" />
                Upload First Image
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleGalleryImageUpload}
                />
              </label>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GalleryTab;
