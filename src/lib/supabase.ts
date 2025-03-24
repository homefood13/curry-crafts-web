
import { createClient } from '@supabase/supabase-js';

// Default values for development or when env vars are not available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Flag to check if we're using real credentials
export const isSupabaseConfigured = 
  import.meta.env.VITE_SUPABASE_URL && 
  import.meta.env.VITE_SUPABASE_ANON_KEY;

// Authentication helpers with error handling
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
    return data;
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
    return data;
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
