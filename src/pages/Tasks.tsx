import React from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { Navbar } from '../components/layout/Navbar';
import { Card } from '../components/ui/card';
import { mockTasks } from '../data/mockTasks';

export function Tasks() {
  return (
    <div className="h-screen w-screen bg-gray-200 text-gray-900 overflow-hidden flex">
      <Sidebar currentPath="/tasks" />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Navbar />
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Task Management</h2>
            <p className="text-gray-600 mb-8">View all historical and active warehouse tasks.</p>

            <Card className="overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-300">
                    <th className="p-4 font-bold text-gray-700">Task ID</th>
                    <th className="p-4 font-bold text-gray-700">Description</th>
                    <th className="p-4 font-bold text-gray-700">Zone</th>
                    <th className="p-4 font-bold text-gray-700">Status</th>
                    <th className="p-4 font-bold text-gray-700">Priority</th>
                    <th className="p-4 font-bold text-gray-700">Assigned To</th>
                  </tr>
                </thead>
                <tbody>
                  {mockTasks.map((task) => (
                    <tr key={task.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-mono text-sm text-gray-600">{task.id}</td>
                      <td className="p-4 font-medium">{task.description}</td>
                      <td className="p-4 text-gray-600">{task.zone}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase
                          ${task.status === 'completed' ? 'bg-green-100 text-green-700' : ''}
                          ${task.status === 'in-progress' ? 'bg-blue-100 text-blue-700' : ''}
                          ${task.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : ''}
                          ${task.status === 'assigned' ? 'bg-purple-100 text-purple-700' : ''}
                        `}>
                          {task.status}
                        </span>
                      </td>
                      <td className="p-4 text-gray-600 capitalize">{task.priority}</td>
                      <td className="p-4 font-medium">{task.assignedToName || '-'}</td>
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
