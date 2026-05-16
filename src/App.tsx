import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Toaster } from './components/ui/toaster';

import { Tasks } from './pages/Tasks';
import { Leaderboard } from './pages/Leaderboard';
import { Settings } from './pages/Settings';
import { Auth } from './pages/Auth';
import { WorkerProfile } from './pages/WorkerProfile';
import { StaffSettings } from './pages/StaffSettings';
import { SignIn } from './pages/SignIn';

function App() {
 return (
 <Router>
 <Routes>
 <Route path="/" element={<Auth />} />
 <Route path="/signin" element={<SignIn />} />
 <Route path="/dashboard" element={<Dashboard />} />
 <Route path="/worker" element={<WorkerProfile />} />
 <Route path="/worker/settings" element={<StaffSettings />} />
 <Route path="/tasks" element={<Tasks />} />
 <Route path="/leaderboard" element={<Leaderboard />} />
 <Route path="/settings" element={<Settings />} />
 </Routes>
 <Toaster />
 </Router>
 );
}

export default App;
