
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from 'lucide-react';

const SupabaseWarning: React.FC = () => {
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
};

export default SupabaseWarning;
