import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Package2, TrendingUp, Clock, Target, AlertCircle, Settings } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockStaff } from '../data/mockStaff';

// Mock data for the chart
const performanceData = [
  { time: '08:00', points: 120 },
  { time: '09:00', points: 250 },
  { time: '10:00', points: 380 },
  { time: '11:00', points: 410 },
  { time: '12:00', points: 590 },
  { time: '13:00', points: 720 },
  { time: '14:00', points: 850 }
];

export function WorkerProfile() {
  const navigate = useNavigate();
  // Simulate logged in worker
  const worker = mockStaff[1]; // Sarah Chen

  return (
    <div className="min-h-screen w-screen bg-gray-200 text-gray-900 flex flex-col">
      {/* Worker Navbar */}
      <header className="h-16 border-b border-gray-300 bg-white flex items-center justify-between px-6 shadow-sm z-10">
        <div className="flex items-center gap-3">
          <Package2 className="w-6 h-6 text-[#16A34A]" />
          <h1 className="text-xl font-bold">Staff Portal</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold">
              {worker.name.charAt(0)}
            </div>
            <span className="font-medium text-gray-700">{worker.name}</span>
          </div>

          <div className="h-6 w-px bg-gray-300"></div>
          <Button variant="ghost" size="icon" onClick={() => navigate('/')} className="text-gray-500 hover:text-red-500">
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-6">
          
          {/* Profile & Settings (Like Admin Profile) */}
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

          {/* Top Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-6 bg-white shadow-md border-gray-300 flex flex-col">
              <span className="text-gray-600 text-sm font-medium mb-2 flex items-center gap-2">
                <Target className="w-4 h-4 text-[#16A34A]" /> Total Score
              </span>
              <span className="text-4xl font-bold text-[#16A34A]">{worker.score}</span>
              <span className="text-sm text-green-600 mt-2">+45 today</span>
            </Card>

            <Card className="p-6 bg-white shadow-md border-gray-300 flex flex-col">
              <span className="text-gray-600 text-sm font-medium mb-2 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-500" /> Efficiency Rate
              </span>
              <span className="text-4xl font-bold text-gray-900">92%</span>
              <span className="text-sm text-gray-500 mt-2">Top 15% of staff</span>
            </Card>

            <Card className="p-6 bg-white shadow-md border-gray-300 flex flex-col">
              <span className="text-gray-600 text-sm font-medium mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-500" /> Avg Task Time
              </span>
              <span className="text-4xl font-bold text-gray-900">{worker.avgCompleteTime}m</span>
              <span className="text-sm text-green-600 mt-2">-1.2m vs average</span>
            </Card>

            <Card className="p-6 bg-white shadow-md border-gray-300 flex flex-col">
              <span className="text-gray-600 text-sm font-medium mb-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-orange-500" /> Errors / Penalties
              </span>
              <span className="text-4xl font-bold text-gray-900">1</span>
              <span className="text-sm text-gray-500 mt-2">-15 pts deducted</span>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart */}
            <Card className="lg:col-span-2 p-6 shadow-md border-gray-300">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Daily Performance Trend</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                    <XAxis dataKey="time" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #d1d5db', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="points" 
                      stroke="#16A34A" 
                      strokeWidth={3}
                      dot={{ fill: '#16A34A', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Task History */}
            <Card className="p-6 shadow-md border-gray-300 overflow-hidden flex flex-col">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Actions & Points</h3>
              <div className="flex-1 overflow-y-auto pr-2 space-y-3">
                
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div>
                    <p className="font-medium text-sm text-gray-900">Task T-089 (Zone C)</p>
                    <p className="text-xs text-gray-500">Fast completion bonus</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-[#16A34A]">+25</span>
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div>
                    <p className="font-medium text-sm text-gray-900">Task T-088 (Zone A)</p>
                    <p className="text-xs text-gray-500">Standard completion</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-[#16A34A]">+15</span>
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-100">
                  <div>
                    <p className="font-medium text-sm text-red-900">Item Misplacement</p>
                    <p className="text-xs text-red-700">Safety / Quality Check</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-red-600">-15</span>
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div>
                    <p className="font-medium text-sm text-gray-900">Task T-085 (Zone B)</p>
                    <p className="text-xs text-gray-500">Standard completion</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-[#16A34A]">+15</span>
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
