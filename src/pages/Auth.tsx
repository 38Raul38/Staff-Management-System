import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package2, UserCircle, ShieldCheck } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';

export function Auth() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-screen bg-gray-200 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-[#16A34A]/20 rounded-2xl flex items-center justify-center mb-4 border border-[#16A34A]/30">
            <Package2 className="w-8 h-8 text-[#16A34A]" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Logistics Nexus</h1>
          <p className="text-gray-600">Operations & Staff Management Platform</p>
        </div>

        <Card className="p-8 shadow-xl border-gray-300">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Select Demo Profile</h2>
          
          <div className="space-y-4">
            <Button 
              className="w-full h-14 text-lg bg-[#16A34A] hover:bg-[#15803D] text-white flex gap-3"
              onClick={() => navigate('/dashboard')}
            >
              <ShieldCheck className="w-5 h-5" />
              Login as Administrator
            </Button>
            
            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <Button 
              variant="outline"
              className="w-full h-14 text-lg border-gray-300 text-gray-700 hover:bg-gray-50 flex gap-3"
              onClick={() => navigate('/worker')}
            >
              <UserCircle className="w-5 h-5 text-gray-500" />
              Login as Staff
            </Button>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <Button
              variant="link"
              className="text-[#16A34A] hover:text-[#15803D] font-medium"
              onClick={() => navigate('/signin')}
            >
              Try traditional Sign In flow &rarr;
            </Button>
          </div>
        </Card>
        
        <p className="text-center text-gray-500 text-sm mt-8">
          Hackathon MVP Build v1.0
        </p>
      </div>
    </div>
  );
}
