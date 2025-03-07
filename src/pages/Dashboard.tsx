
import { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Navbar } from '@/components/Navbar';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // If not logged in and not loading, redirect to auth page
    if (!user && !isLoading) {
      navigate('/auth', { replace: true });
    }
    
    // If at /dashboard with no sub-route, redirect to generate page
    if (location.pathname === '/dashboard') {
      navigate('/dashboard/generate', { replace: true });
    }
  }, [user, isLoading, navigate, location.pathname]);
  
  // Show loading or redirect if not authenticated
  if (isLoading || !user) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-pulse-gentle text-lg">Loading...</div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
      <Navbar />
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="container pt-24 pb-16"
      >
        <Outlet />
      </motion.main>
    </div>
  );
}
