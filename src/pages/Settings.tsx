import React from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { Navbar } from '../components/layout/Navbar';
import { Card } from '../components/ui/card';

export function Settings() {
  return (
    <div className="h-screen w-screen bg-gray-200 text-gray-900 overflow-hidden flex">
      <Sidebar currentPath="/settings" />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Navbar />
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Profile & Settings</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="col-span-1 p-6 flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-4xl mb-4 border-2 border-[#16A34A]">
                  👑
                </div>
                <h3 className="text-xl font-bold text-gray-900">Riad Sadiqov</h3>
                <span className="text-xs bg-[#16A34A]/20 text-[#16A34A] px-3 py-1 rounded-full font-bold mt-2 uppercase">
                  Administrator
                </span>
                <p className="text-sm text-gray-600 mt-4">System Master & Warehouse Operations Lead</p>
              </Card>

              <Card className="col-span-1 md:col-span-2 p-6 space-y-6">
                <div>
                  <h4 className="text-lg font-bold border-b border-gray-300 pb-2 mb-4">Account Information</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium">admin@logistics-nexus.com</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone:</span>
                      <span className="font-medium">+1 (555) 019-8234</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium">Central Warehouse #01</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-bold border-b border-gray-300 pb-2 mb-4">System Preferences</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Email Notifications</span>
                      <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#16A34A]" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">SMS Alerts (Critical only)</span>
                      <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#16A34A]" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Auto-assign tasks globally</span>
                      <input type="checkbox" className="w-4 h-4 accent-[#16A34A]" />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
