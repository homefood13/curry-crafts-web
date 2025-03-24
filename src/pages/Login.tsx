
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '@/contexts/AuthContext';
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (isSignUp) {
        await signUp(email, password);
        toast({
          title: "Account created",
          description: "Please check your email for verification.",
        });
      } else {
        await signIn(email, password);
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      toast({
        title: "Authentication failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
      <div className="w-full max-w-md p-4">
        <Card>
          <CardHeader>
            <CardTitle>{isSignUp ? 'Create Account' : 'Login'}</CardTitle>
            <CardDescription>
              {isSignUp 
                ? 'Create an account to manage reservations and more.' 
                : 'Sign in to access the admin dashboard.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="bg-indian-red hover:bg-indian-red/90"
                  disabled={isLoading}
                >
                  {isLoading 
                    ? 'Processing...' 
                    : isSignUp 
                      ? 'Create Account' 
                      : 'Sign In'
                  }
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button 
              variant="link" 
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp 
                ? 'Already have an account? Sign In' 
                : 'Don\'t have an account? Sign Up'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
