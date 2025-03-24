
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  getReservations, 
  getMenuItems, 
  getContactSubmissions, 
  uploadImage, 
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getGalleryImages
} from '@/lib/supabase';
import { toast } from "@/hooks/use-toast";
import { 
  Pencil, 
  Trash2, 
  Plus, 
  Upload, 
  Eye, 
  X, 
  Check, 
  AlertTriangle 
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import ImageWithLoader from '@/components/ImageWithLoader';

const Dashboard = () => {
  const { user, signOut, loading, isSupabaseConfigured } = useAuth();
  const navigate = useNavigate();
  const [reservations, setReservations] = useState<any[]>([]);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('reservations');
  
  // Form states for menu item
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
  
  const [isEditingMenuItem, setIsEditingMenuItem] = useState(false);
  const [menuDialogOpen, setMenuDialogOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        setIsLoading(true);
        try {
          // Fetch reservations
          const reservationsData = await getReservations();
          setReservations(reservationsData);
          
          // Fetch menu items
          const menuData = await getMenuItems();
          setMenuItems(menuData);
          
          // Fetch contact submissions
          const contactsData = await getContactSubmissions();
          setContacts(contactsData);
          
          // Fetch gallery images
          const galleryData = await getGalleryImages();
          setGalleryImages(galleryData);
          
        } catch (error) {
          console.error('Error fetching data:', error);
          toast({
            title: "Error",
            description: "Failed to load dashboard data",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    fetchData();
  }, [user, activeTab]);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

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

  if (loading || isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen pt-24 pb-20">
        <div className="container-custom">
          <Card className="border-yellow-400 bg-yellow-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="text-yellow-600" />
                Supabase Not Configured
              </CardTitle>
              <CardDescription>
                You need to configure Supabase to use the dashboard features.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">To configure Supabase:</p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Create a Supabase account at <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">supabase.com</a></li>
                <li>Create a new project</li>
                <li>Get your Supabase URL and anon key from the project settings</li>
                <li>Set the following environment variables:
                  <pre className="bg-gray-100 p-2 mt-1 rounded">
                    VITE_SUPABASE_URL=your_supabase_url<br/>
                    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
                  </pre>
                </li>
                <li>Create the following tables in your Supabase database:
                  <ul className="list-disc pl-5 mt-1">
                    <li>reservations</li>
                    <li>menu_items</li>
                    <li>contact_submissions</li>
                  </ul>
                </li>
                <li>Set up storage buckets for images</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold font-playfair">Admin Dashboard</h1>
          <Button 
            variant="outline" 
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="reservations">Reservations</TabsTrigger>
            <TabsTrigger value="menu">Menu Management</TabsTrigger>
            <TabsTrigger value="contacts">Contact Submissions</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
          </TabsList>
          
          <TabsContent value="reservations">
            <Card>
              <CardHeader>
                <CardTitle>Recent Reservations</CardTitle>
                <CardDescription>Manage upcoming reservations and bookings</CardDescription>
              </CardHeader>
              <CardContent>
                {reservations.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Name</th>
                          <th className="text-left py-2">Date</th>
                          <th className="text-left py-2">Time</th>
                          <th className="text-left py-2">Guests</th>
                          <th className="text-left py-2">Phone</th>
                          <th className="text-left py-2">Email</th>
                          <th className="text-left py-2">Message</th>
                          <th className="text-left py-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reservations.map((res, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-2">{res.name}</td>
                            <td className="py-2">{new Date(res.date).toLocaleDateString()}</td>
                            <td className="py-2">{res.time}</td>
                            <td className="py-2">{res.guests}</td>
                            <td className="py-2">{res.phone}</td>
                            <td className="py-2">{res.email || '-'}</td>
                            <td className="py-2 max-w-[200px] truncate">{res.message || '-'}</td>
                            <td className="py-2">
                              <Button variant="outline" size="sm">
                                <Eye size={16} className="mr-1" /> View
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p>No reservations found. Reservations will appear here when customers make bookings.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="menu">
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
                    
                    <form onSubmit={handleMenuItemSubmit} className="space-y-4 mt-4">
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
                          onClick={() => {
                            setMenuDialogOpen(false);
                            resetMenuItemForm();
                          }}
                        >
                          Cancel
                        </Button>
                        <Button type="submit" className="bg-indian-red hover:bg-indian-red/90">
                          {isEditingMenuItem ? 'Update' : 'Add'} Menu Item
                        </Button>
                      </DialogFooter>
                    </form>
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
          </TabsContent>
          
          <TabsContent value="contacts">
            <Card>
              <CardHeader>
                <CardTitle>Contact Submissions</CardTitle>
                <CardDescription>View messages from customers</CardDescription>
              </CardHeader>
              <CardContent>
                {contacts.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Name</th>
                          <th className="text-left py-2">Email</th>
                          <th className="text-left py-2">Phone</th>
                          <th className="text-left py-2">Message</th>
                          <th className="text-left py-2">Date</th>
                          <th className="text-left py-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contacts.map((contact, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-2">{contact.name}</td>
                            <td className="py-2">{contact.email || '-'}</td>
                            <td className="py-2">{contact.phone}</td>
                            <td className="py-2 max-w-xs truncate">{contact.message}</td>
                            <td className="py-2">
                              {contact.created_at 
                                ? new Date(contact.created_at).toLocaleDateString()
                                : '-'
                              }
                            </td>
                            <td className="py-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    <Eye size={16} className="mr-1" /> View
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Contact Message</DialogTitle>
                                    <DialogDescription>
                                      Received on {contact.created_at 
                                        ? new Date(contact.created_at).toLocaleString()
                                        : 'Unknown date'
                                      }
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-x-4">
                                      <Label className="text-right font-medium">Name:</Label>
                                      <div className="col-span-3">{contact.name}</div>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-x-4">
                                      <Label className="text-right font-medium">Email:</Label>
                                      <div className="col-span-3">{contact.email || '-'}</div>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-x-4">
                                      <Label className="text-right font-medium">Phone:</Label>
                                      <div className="col-span-3">{contact.phone}</div>
                                    </div>
                                    <div className="grid grid-cols-4 gap-x-4">
                                      <Label className="text-right font-medium">Message:</Label>
                                      <div className="col-span-3 whitespace-pre-wrap">{contact.message}</div>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p>No contact submissions found. They will appear here when customers submit the contact form.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="gallery">
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
