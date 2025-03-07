
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';

// Pages
import Landing from '@/pages/Landing';
import Auth from '@/pages/Auth';
import Dashboard from '@/pages/Dashboard';
import Generate from '@/pages/Generate';
import Upload from '@/pages/Upload';
import ViewComponents from '@/pages/ViewComponents';
import Profile from '@/pages/Profile';
import NotFound from '@/pages/NotFound';

// React-icons
import { FcGoogle } from 'react-icons/fc';

export default function App() {
  const { user, isLoading } = useAuth();
  
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
      
      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<Generate />} />
        <Route path="generate" element={<Generate />} />
        <Route path="upload" element={<Upload />} />
        <Route path="view" element={<ViewComponents />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
