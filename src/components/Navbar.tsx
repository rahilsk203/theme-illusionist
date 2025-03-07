
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Code, Upload, User, LogOut, Eye } from 'lucide-react';

const navItems = [
  { 
    path: '/dashboard', 
    label: 'Generate', 
    icon: Code 
  },
  { 
    path: '/dashboard/upload', 
    label: 'Upload', 
    icon: Upload 
  },
  { 
    path: '/dashboard/view', 
    label: 'View', 
    icon: Eye 
  },
  { 
    path: '/dashboard/profile', 
    label: 'Profile', 
    icon: User 
  },
];

export function Navbar() {
  const { logout } = useAuth();
  const location = useLocation();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <nav className="glass fixed z-10 w-full py-4 px-6">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="font-display text-xl font-semibold tracking-tight text-primary"
          >
            Element Generator
          </motion.div>
        </Link>

        <div className="hidden md:flex items-center space-x-1">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className="relative px-5 py-2 rounded-full"
              onMouseEnter={() => setHovered(path)}
              onMouseLeave={() => setHovered(null)}
            >
              {(hovered === path || location.pathname === path) && (
                <motion.div
                  layoutId="navIndicator"
                  className="absolute inset-0 bg-accent rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              )}
              <span className={cn(
                "relative flex items-center gap-1.5 text-sm font-medium",
                location.pathname === path ? "text-accent-foreground" : "text-muted-foreground hover:text-foreground"
              )}>
                <Icon size={16} />
                {label}
              </span>
            </Link>
          ))}
          
          <button
            onClick={logout}
            className="relative px-5 py-2 rounded-full flex items-center gap-1.5 text-sm font-medium text-destructive"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
