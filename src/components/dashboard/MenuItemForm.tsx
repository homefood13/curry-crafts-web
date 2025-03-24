
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DialogFooter } from "@/components/ui/dialog";
import { Upload, X } from 'lucide-react';

interface MenuItemFormProps {
  menuItemForm: {
    id: number;
    name: string;
    description: string;
    price: string;
    category: string;
    spicyLevel: string;
    dietary: string;
    image: string;
    popular: boolean;
  };
  setMenuItemForm: React.Dispatch<React.SetStateAction<any>>;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isEditingMenuItem: boolean;
  isUploading: boolean;
  closeDialog: () => void;
}

const MenuItemForm: React.FC<MenuItemFormProps> = ({
  menuItemForm,
  setMenuItemForm,
  handleImageUpload,
  handleSubmit,
  isEditingMenuItem,
  isUploading,
  closeDialog
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div className="grid grid-cols-1 gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Item Name</Label>
            <Input 
              id="name" 
              value={menuItemForm.name} 
              onChange={(e) => setMenuItemForm({...menuItemForm, name: e.target.value})} 
              required 
            />
          </div>
          <div>
            <Label htmlFor="price">Price</Label>
            <Input 
              id="price" 
              value={menuItemForm.price} 
              onChange={(e) => setMenuItemForm({...menuItemForm, price: e.target.value})} 
              required 
              placeholder="$0.00" 
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea 
            id="description" 
            value={menuItemForm.description} 
            onChange={(e) => setMenuItemForm({...menuItemForm, description: e.target.value})} 
            required 
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="category">Category</Label>
            <Select 
              value={menuItemForm.category} 
              onValueChange={(value) => setMenuItemForm({...menuItemForm, category: value})}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="starters">Starters</SelectItem>
                <SelectItem value="main-course">Main Course</SelectItem>
                <SelectItem value="biryani">Biryani & Rice</SelectItem>
                <SelectItem value="breads">Breads</SelectItem>
                <SelectItem value="desserts">Desserts</SelectItem>
                <SelectItem value="beverages">Beverages</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="spicyLevel">Spicy Level</Label>
            <Select 
              value={menuItemForm.spicyLevel} 
              onValueChange={(value) => setMenuItemForm({...menuItemForm, spicyLevel: value})}
            >
              <SelectTrigger id="spicyLevel">
                <SelectValue placeholder="Select spicy level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="mild">Mild</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hot">Hot</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="dietary">Dietary</Label>
            <Select 
              value={menuItemForm.dietary} 
              onValueChange={(value) => setMenuItemForm({...menuItemForm, dietary: value})}
            >
              <SelectTrigger id="dietary">
                <SelectValue placeholder="Select dietary type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vegetarian">Vegetarian</SelectItem>
                <SelectItem value="non-vegetarian">Non-Vegetarian</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="image">Image</Label>
          {menuItemForm.image && (
            <div className="relative w-full h-40 mb-2">
              <img 
                src={menuItemForm.image} 
                alt={menuItemForm.name} 
                className="w-full h-full object-cover rounded-md" 
              />
            </div>
          )}
          <div className="flex items-center space-x-2">
            <Button 
              type="button" 
              variant="outline"
              disabled={isUploading}
            >
              <label className="cursor-pointer flex items-center">
                <Upload size={16} className="mr-1" />
                {isUploading ? 'Uploading...' : 'Upload Image'}
                <input 
                  type="file" 
                  id="image" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                />
              </label>
            </Button>
            {menuItemForm.image && (
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setMenuItemForm({...menuItemForm, image: ''})}
              >
                <X size={16} className="mr-1" /> Remove
              </Button>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <input 
            type="checkbox" 
            id="popular" 
            checked={menuItemForm.popular} 
            onChange={(e) => setMenuItemForm({...menuItemForm, popular: e.target.checked})} 
            className="rounded border-gray-300"
          />
          <Label htmlFor="popular" className="cursor-pointer">Mark as popular dish</Label>
        </div>
      </div>
      
      <DialogFooter>
        <Button 
          type="button" 
          variant="outline" 
          onClick={closeDialog}
        >
          Cancel
        </Button>
        <Button type="submit" className="bg-indian-red hover:bg-indian-red/90">
          {isEditingMenuItem ? 'Update' : 'Add'} Menu Item
        </Button>
      </DialogFooter>
    </form>
  );
};

export default MenuItemForm;
