import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Package2 } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { mockStaff } from '../data/mockStaff';

export function StaffSettings() {
  const navigate = useNavigate();
  const worker = mockStaff[1]; // Sarah Chen

  return (
    <div className="min-h-screen w-screen bg-gray-200 text-gray-900 flex flex-col">
      <header className="h-16 border-b border-gray-300 bg-white flex items-center px-6 shadow-sm z-10 gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/worker')} className="text-gray-500 hover:text-gray-900">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-2">
          <Package2 className="w-6 h-6 text-[#16A34A]" />
          <h1 className="text-xl font-bold">Staff Portal</h1>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Profile & Settings</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="col-span-1 p-6 flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-4xl mb-4 border-2 border-[#16A34A]">
                {worker.name.charAt(0)}
              </div>
              <h3 className="text-xl font-bold text-gray-900">{worker.name}</h3>
              <span className="text-xs bg-[#16A34A]/20 text-[#16A34A] px-3 py-1 rounded-full font-bold mt-2 uppercase">
                {worker.role}
              </span>
              <p className="text-sm text-gray-600 mt-4">Active Zone: {worker.currentZone}</p>
            </Card>

            <Card className="col-span-1 md:col-span-2 p-6 space-y-6">
              <div>
                <h4 className="text-lg font-bold border-b border-gray-300 pb-2 mb-4">Account Information</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Employee ID:</span>
                    <span className="font-medium">{worker.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-medium capitalize">{worker.status.replace('-', ' ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Specialization:</span>
                    <span className="font-medium">Heavy Machinery, Forklift</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold border-b border-gray-300 pb-2 mb-4">Profile Settings</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">SMS Task Alerts</span>
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#16A34A]" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Auto-Accept Assigned Tasks</span>
                    <input type="checkbox" className="w-4 h-4 accent-[#16A34A]" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Share Live Location with Admins</span>
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#16A34A]" />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}