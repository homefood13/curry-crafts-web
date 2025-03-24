
import { createClient } from '@supabase/supabase-js';

// Check if environment variables are available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Flag to check if Supabase is configured
export const isSupabaseConfigured = 
  !!supabaseUrl && 
  !!supabaseAnonKey &&
  supabaseUrl !== '' &&
  supabaseAnonKey !== '' &&
  !supabaseUrl.includes('placeholder');

// Create the Supabase client
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

// Authentication helpers with improved error handling
export const signIn = async (email: string, password: string) => {
  if (!isSupabaseConfigured) {
    console.warn('Supabase not configured. Authentication functions will not work.');
    return { error: { message: 'Supabase not configured' } };
  }
  return await supabase.auth.signInWithPassword({ email, password });
};

export const signUp = async (email: string, password: string) => {
  if (!isSupabaseConfigured) {
    console.warn('Supabase not configured. Authentication functions will not work.');
    return { error: { message: 'Supabase not configured' } };
  }
  return await supabase.auth.signUp({ email, password });
};

export const signOut = async () => {
  if (!isSupabaseConfigured) {
    console.warn('Supabase not configured. Authentication functions will not work.');
    return { error: { message: 'Supabase not configured' } };
  }
  return await supabase.auth.signOut();
};

export const getCurrentUser = async () => {
  if (!isSupabaseConfigured) {
    console.warn('Supabase not configured. Authentication functions will not work.');
    return null;
  }
  const { data } = await supabase.auth.getUser();
  return data.user;
};

// Database helpers for different collections with error handling
export const getReservations = async () => {
  if (!isSupabaseConfigured) {
    console.warn('Supabase not configured. Database functions will not work.');
    return [];
  }
  
  try {
    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .order('date', { ascending: true });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching reservations:', error);
    return [];
  }
};

export const createReservation = async (reservation: {
  name: string;
  email?: string;
  phone: string;
  guests: string;
  date: string;
  time: string;
  message?: string;
}) => {
  if (!isSupabaseConfigured) {
    console.warn('Supabase not configured. Database functions will not work.');
    return null;
  }
  
  try {
    const { data, error } = await supabase
      .from('reservations')
      .insert([reservation])
      .select();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating reservation:', error);
    return null;
  }
};

export const getMenuItems = async (category?: string) => {
  if (!isSupabaseConfigured) {
    console.warn('Supabase not configured. Database functions will not work.');
    return [];
  }
  
  try {
    let query = supabase.from('menu_items').select('*');
    
    if (category) {
      query = query.eq('category', category);
    }
    
    const { data, error } = await query.order('id');
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return [];
  }
};

export const createMenuItem = async (menuItem: {
  name: string;
  description: string;
  price: string;
  category: string;
  spicyLevel: string;
  dietary: string;
  image?: string;
  popular?: boolean;
}) => {
  if (!isSupabaseConfigured) {
    console.warn('Supabase not configured. Database functions will not work.');
    return null;
  }
  
  try {
    const { data, error } = await supabase
      .from('menu_items')
      .insert([menuItem])
      .select();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating menu item:', error);
    return null;
  }
};

export const updateMenuItem = async (id: number, changes: Partial<{
  name: string;
  description: string;
  price: string;
  category: string;
  spicyLevel: string;
  dietary: string;
  image: string;
  popular: boolean;
}>) => {
  if (!isSupabaseConfigured) {
    console.warn('Supabase not configured. Database functions will not work.');
    return null;
  }
  
  try {
    const { data, error } = await supabase
      .from('menu_items')
      .update(changes)
      .eq('id', id)
      .select();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating menu item:', error);
    return null;
  }
};

export const deleteMenuItem = async (id: number) => {
  if (!isSupabaseConfigured) {
    console.warn('Supabase not configured. Database functions will not work.');
    return null;
  }
  
  try {
    const { error } = await supabase
      .from('menu_items')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting menu item:', error);
    return null;
  }
};

export const uploadImage = async (file: File, path: string) => {
  if (!isSupabaseConfigured) {
    console.warn('Supabase not configured. Storage functions will not work.');
    return null;
  }
  
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${path}/${Math.random()}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('gallery')
      .upload(fileName, file);
      
    if (error) throw error;
    
    // Get the public URL
    const { data: publicUrlData } = supabase.storage
      .from('gallery')
      .getPublicUrl(fileName);
      
    return publicUrlData.publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
};

export const getGalleryImages = async () => {
  if (!isSupabaseConfigured) {
    console.warn('Supabase not configured. Storage functions will not work.');
    return [];
  }
  
  try {
    const { data, error } = await supabase.storage.from('gallery').list();
    
    if (error) throw error;
    
    // Get public URLs for all images
    const imagesWithUrls = await Promise.all(
      data.map(async (file) => {
        const { data: urlData } = supabase.storage
          .from('gallery')
          .getPublicUrl(file.name);
          
        return {
          ...file,
          url: urlData.publicUrl
        };
      })
    );
    
    return imagesWithUrls;
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return [];
  }
};

export const submitContactForm = async (contact: {
  name: string;
  email?: string;
  phone: string;
  message: string;
}) => {
  if (!isSupabaseConfigured) {
    console.warn('Supabase not configured. Database functions will not work.');
    return null;
  }
  
  try {
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([contact])
      .select();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return null;
  }
};

export const getContactSubmissions = async () => {
  if (!isSupabaseConfigured) {
    console.warn('Supabase not configured. Database functions will not work.');
    return [];
  }
  
  try {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    return [];
  }
};
