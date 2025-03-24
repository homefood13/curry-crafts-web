
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getReservations, getMenuItems, submitContactForm } from '@/lib/supabase';
import { toast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const [reservations, setReservations] = useState<any[]>([]);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          // Fetch reservations
          const reservationsData = await getReservations();
          setReservations(reservationsData);
          
          // Fetch menu items
          const menuData = await getMenuItems();
          setMenuItems(menuData);
          
          // In a real app, you'd fetch contacts here
          // const contactsData = await getContacts();
          // setContacts(contactsData);
          
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          toast({
            title: "Error",
            description: "Failed to load dashboard data",
            variant: "destructive",
          });
          setIsLoading(false);
        }
      }
    };
    
    fetchData();
  }, [user]);

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
        
        <Tabs defaultValue="reservations">
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
                            <td className="py-2">
                              <Button variant="outline" size="sm">View</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p>No reservations found.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="menu">
            <Card>
              <CardHeader>
                <CardTitle>Menu Items</CardTitle>
                <CardDescription>Manage your restaurant menu</CardDescription>
              </CardHeader>
              <CardContent>
                {menuItems.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {menuItems.map((item, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <h3 className="font-bold">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.category}</p>
                        <p className="mt-1">{item.price}</p>
                        <div className="mt-2 flex space-x-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm" className="text-red-500">Delete</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No menu items found.</p>
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
                <p>This feature will be populated when customers submit contact forms.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="gallery">
            <Card>
              <CardHeader>
                <CardTitle>Gallery Management</CardTitle>
                <CardDescription>Upload and manage images</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Button className="bg-indian-red hover:bg-indian-red/90">Upload New Image</Button>
                </div>
                <p>Gallery management features will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
