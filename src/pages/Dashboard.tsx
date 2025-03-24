
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  getReservations, 
  getMenuItems, 
  getContactSubmissions, 
  getGalleryImages 
} from '@/lib/supabase';
import { toast } from "@/hooks/use-toast";

// Import dashboard components
import ReservationsTab from '@/components/dashboard/ReservationsTab';
import MenuTab from '@/components/dashboard/MenuTab';
import ContactsTab from '@/components/dashboard/ContactsTab';
import GalleryTab from '@/components/dashboard/GalleryTab';
import SupabaseWarning from '@/components/dashboard/SupabaseWarning';

const Dashboard = () => {
  const { user, signOut, loading, isSupabaseConfigured } = useAuth();
  const navigate = useNavigate();
  const [reservations, setReservations] = useState<any[]>([]);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('reservations');

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

  if (loading || isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isSupabaseConfigured) {
    return <SupabaseWarning />;
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
            <ReservationsTab reservations={reservations} />
          </TabsContent>
          
          <TabsContent value="menu">
            <MenuTab menuItems={menuItems} setMenuItems={setMenuItems} />
          </TabsContent>
          
          <TabsContent value="contacts">
            <ContactsTab contacts={contacts} />
          </TabsContent>
          
          <TabsContent value="gallery">
            <GalleryTab galleryImages={galleryImages} setGalleryImages={setGalleryImages} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
