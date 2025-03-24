
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Pencil, Trash2, Plus } from 'lucide-react';
import { createMenuItem, updateMenuItem, deleteMenuItem, uploadImage } from '@/lib/supabase';
import { toast } from "@/hooks/use-toast";
import MenuItemForm from './MenuItemForm';

interface MenuTabProps {
  menuItems: any[];
  setMenuItems: React.Dispatch<React.SetStateAction<any[]>>;
}

const MenuTab: React.FC<MenuTabProps> = ({ menuItems, setMenuItems }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [menuDialogOpen, setMenuDialogOpen] = useState(false);
  const [isEditingMenuItem, setIsEditingMenuItem] = useState(false);
  const [menuItemForm, setMenuItemForm] = useState({
    id: 0,
    name: '',
    description: '',
    price: '',
    category: 'starters',
    spicyLevel: 'mild',
    dietary: 'vegetarian',
    image: '',
    popular: false
  });

  const resetMenuItemForm = () => {
    setMenuItemForm({
      id: 0,
      name: '',
      description: '',
      price: '',
      category: 'starters',
      spicyLevel: 'mild',
      dietary: 'vegetarian',
      image: '',
      popular: false
    });
    setIsEditingMenuItem(false);
  };

  const handleEditMenuItem = (item: any) => {
    setMenuItemForm({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      spicyLevel: item.spicyLevel,
      dietary: item.dietary,
      image: item.image,
      popular: item.popular || false
    });
    setIsEditingMenuItem(true);
    setMenuDialogOpen(true);
  };

  const handleDeleteMenuItem = async (id: number) => {
    if (confirm('Are you sure you want to delete this menu item?')) {
      try {
        await deleteMenuItem(id);
        setMenuItems(menuItems.filter(item => item.id !== id));
        toast({
          title: "Success",
          description: "Menu item deleted successfully",
        });
      } catch (error) {
        console.error('Error deleting menu item:', error);
        toast({
          title: "Error",
          description: "Failed to delete menu item",
          variant: "destructive",
        });
      }
    }
  };

  const handleMenuItemSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isEditingMenuItem) {
        // Update existing item
        const { id, ...changes } = menuItemForm;
        const result = await updateMenuItem(id, changes);
        if (result) {
          setMenuItems(menuItems.map(item => item.id === id ? { ...item, ...changes } : item));
          toast({
            title: "Success",
            description: "Menu item updated successfully",
          });
        }
      } else {
        // Create new item
        const result = await createMenuItem(menuItemForm);
        if (result) {
          setMenuItems([...menuItems, result[0]]);
          toast({
            title: "Success",
            description: "Menu item created successfully",
          });
        }
      }
      
      setMenuDialogOpen(false);
      resetMenuItemForm();
      
    } catch (error) {
      console.error('Error saving menu item:', error);
      toast({
        title: "Error",
        description: "Failed to save menu item",
        variant: "destructive",
      });
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files.length) return;
    
    setIsUploading(true);
    const file = e.target.files[0];
    
    try {
      const imageUrl = await uploadImage(file, 'menu');
      if (imageUrl) {
        setMenuItemForm({
          ...menuItemForm,
          image: imageUrl
        });
        toast({
          title: "Success",
          description: "Image uploaded successfully",
        });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Error",
        description: "Failed to upload image",
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
          <CardTitle>Menu Items</CardTitle>
          <CardDescription>Manage your restaurant menu</CardDescription>
        </div>
        <Dialog open={menuDialogOpen} onOpenChange={setMenuDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-indian-red hover:bg-indian-red/90"
              onClick={() => {
                resetMenuItemForm();
                setIsEditingMenuItem(false);
              }}
            >
              <Plus size={16} className="mr-1" /> Add Menu Item
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{isEditingMenuItem ? 'Edit Menu Item' : 'Add New Menu Item'}</DialogTitle>
              <DialogDescription>
                Fill in the details below to {isEditingMenuItem ? 'update the' : 'add a new'} menu item.
              </DialogDescription>
            </DialogHeader>
            
            <MenuItemForm 
              menuItemForm={menuItemForm}
              setMenuItemForm={setMenuItemForm}
              handleImageUpload={handleImageUpload}
              handleSubmit={handleMenuItemSubmit}
              isEditingMenuItem={isEditingMenuItem}
              isUploading={isUploading}
              closeDialog={() => {
                setMenuDialogOpen(false);
                resetMenuItemForm();
              }}
            />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {menuItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {menuItems.map((item) => (
              <div key={item.id} className="border rounded-lg overflow-hidden">
                {item.image && (
                  <div className="h-48 relative">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover" 
                    />
                    {item.popular && (
                      <div className="absolute top-2 right-2 bg-indian-gold/90 text-white text-xs py-1 px-2 rounded-full">
                        Popular
                      </div>
                    )}
                  </div>
                )}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <span className="font-bold text-indian-red">{item.price}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                      {item.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.spicyLevel === 'hot' 
                        ? 'bg-indian-red/10 text-indian-red' 
                        : item.spicyLevel === 'medium'
                        ? 'bg-indian-orange/10 text-indian-orange'
                        : 'bg-indian-gold/10 text-indian-gold'
                    }`}>
                      {item.spicyLevel.charAt(0).toUpperCase() + item.spicyLevel.slice(1)}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.dietary === 'vegetarian' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {item.dietary.charAt(0).toUpperCase() + item.dietary.slice(1)}
                    </span>
                  </div>
                  <div className="flex space-x-2 mt-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditMenuItem(item)}
                    >
                      <Pencil size={14} className="mr-1" /> Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-500"
                      onClick={() => handleDeleteMenuItem(item.id)}
                    >
                      <Trash2 size={14} className="mr-1" /> Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="mb-4">No menu items found. Add your first menu item to get started.</p>
            <Button 
              className="bg-indian-red hover:bg-indian-red/90"
              onClick={() => {
                resetMenuItemForm();
                setMenuDialogOpen(true);
              }}
            >
              <Plus size={16} className="mr-1" /> Add First Menu Item
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MenuTab;
