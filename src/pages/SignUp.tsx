import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Package2 } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export function SignUp() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Fake signup, redirect to sign in
    navigate('/signin');
  };

  return (
    <div className="min-h-screen w-screen bg-gray-200 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-[#16A34A]/20 rounded-2xl flex items-center justify-center mb-4 border border-[#16A34A]/30">
            <Package2 className="w-8 h-8 text-[#16A34A]" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Logistics Nexus</h1>
        </div>

        <Card className="p-8 shadow-xl border-gray-300">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Create an account</h2>
          <p className="text-gray-500 text-center mb-6 text-sm">Enter your information to create an account</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700" htmlFor="name">Full Name</label>
              <Input id="name" placeholder="John Doe" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700" htmlFor="email">Email</label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700" htmlFor="password">Password</label>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full bg-[#16A34A] hover:bg-[#15803D] text-white h-11">
              Sign Up
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/signin" className="text-[#16A34A] hover:underline font-medium">Sign in</Link>
          </div>
        </Card>
      </div>
    </div>
  );
}