
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase credentials. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Authentication helpers
export const signIn = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({ email, password });
};

export const signUp = async (email: string, password: string) => {
  return await supabase.auth.signUp({ email, password });
};

export const signOut = async () => {
  return await supabase.auth.signOut();
};

export const getCurrentUser = async () => {
  const { data } = await supabase.auth.getUser();
  return data.user;
};

// Database helpers for different collections
export const getReservations = async () => {
  const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .order('date', { ascending: true });
  
  if (error) throw error;
  return data;
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
  const { data, error } = await supabase
    .from('reservations')
    .insert([reservation])
    .select();
  
  if (error) throw error;
  return data;
};

export const getMenuItems = async (category?: string) => {
  let query = supabase.from('menu_items').select('*');
  
  if (category) {
    query = query.eq('category', category);
  }
  
  const { data, error } = await query.order('id');
  if (error) throw error;
  return data;
};

export const uploadImage = async (file: File, path: string) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${path}/${Math.random()}.${fileExt}`;
  
  const { data, error } = await supabase.storage
    .from('gallery')
    .upload(fileName, file);
    
  if (error) throw error;
  return data;
};

export const getGalleryImages = async () => {
  const { data, error } = await supabase.storage.from('gallery').list();
  
  if (error) throw error;
  return data;
};

export const submitContactForm = async (contact: {
  name: string;
  email?: string;
  phone: string;
  message: string;
}) => {
  const { data, error } = await supabase
    .from('contact_submissions')
    .insert([contact])
    .select();
  
  if (error) throw error;
  return data;
};
