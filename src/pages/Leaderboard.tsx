import React from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { Navbar } from '../components/layout/Navbar';
import { Card } from '../components/ui/card';
import { mockStaff } from '../data/mockStaff';

export function Leaderboard() {
  const sortedStaff = [...mockStaff].sort((a, b) => b.score - a.score);

  return (
    <div className="h-screen w-screen bg-gray-200 text-gray-900 overflow-hidden flex">
      <Sidebar currentPath="/leaderboard" />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Navbar />
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Staff & Task Statistics</h2>
            <p className="text-gray-600 mb-8">Live performance tracking and worker efficiency metrics.</p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card className="p-4 flex flex-col justify-center">
                <span className="text-sm text-gray-600">Total Active Staff</span>
                <span className="text-3xl font-bold text-[#16A34A]">{sortedStaff.length || 6}</span>
              </Card>
              <Card className="p-4 flex flex-col justify-center">
                <span className="text-sm text-gray-600">Tasks Completed Today</span>
                <span className="text-3xl font-bold text-[#16A34A]">142</span>
              </Card>
              <Card className="p-4 flex flex-col justify-center">
                <span className="text-sm text-gray-600">Average Efficiency</span>
                <span className="text-3xl font-bold text-[#16A34A]">94%</span>
              </Card>
              <Card className="p-4 flex flex-col justify-center">
                <span className="text-sm text-gray-600">System Uptime</span>
                <span className="text-3xl font-bold text-[#16A34A]">99.9%</span>
              </Card>
            </div>
            
            <Card className="overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-300">
                    <th className="p-4 font-bold text-gray-700">Rank</th>
                    <th className="p-4 font-bold text-gray-700">Operator Name</th>
                    <th className="p-4 font-bold text-gray-700">Role</th>
                    <th className="p-4 font-bold text-gray-700">Tasks Done</th>
                    <th className="p-4 font-bold text-gray-700">Avg Time</th>
                    <th className="p-4 font-bold text-gray-700 text-right">Performance Score</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedStaff.map((staff, i) => (
                    <tr key={staff.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-medium text-gray-600">#{i + 1}</td>
                      <td className="p-4 font-bold flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-xs">
                          {staff.name.charAt(0)}
                        </div>
                        {staff.name}
                        {i === 0 && <span className="text-lg" title="Top Performer">⭐</span>}
                      </td>
                      <td className="p-4 text-gray-600">{staff.role}</td>
                      <td className="p-4 font-medium">{staff.tasksCompleted}</td>
                      <td className="p-4 text-gray-600">{staff.avgCompleteTime}m</td>
                      <td className="p-4 text-right font-bold text-[#16A34A]">{staff.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
