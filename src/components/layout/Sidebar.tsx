
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Video, 
  BookOpen, 
  BarChart3, 
  Users, 
  Settings,
  FileText,
  Activity,
  TrendingUp,
  MessageSquare
} from 'lucide-react';

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();

  const userNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Transcription', href: '/transcription', icon: Video },
    { name: 'Education', href: '/education', icon: BookOpen },
    { name: 'Reports', href: '/reports', icon: BarChart3 },
    { name: 'Profile', href: '/profile', icon: Settings },
  ];

  const adminNavigation = [
    { name: 'Admin Dashboard', href: '/admin', icon: Home },
    { name: 'User Management', href: '/admin/users', icon: Users },
    { name: 'Content Management', href: '/admin/content', icon: FileText },
    { name: 'System Analytics', href: '/admin/analytics', icon: Activity },
    { name: 'User Learning Analytics', href: '/admin/user-analytics', icon: TrendingUp },
    { name: 'Content & Feedback Analytics', href: '/admin/content-analytics', icon: MessageSquare },
  ];

  const navigation = user?.role === 'admin' ? adminNavigation : userNavigation;

  return (
    <div className="w-64 bg-gradient-to-b from-primary/5 to-secondary/5 h-full border-r border-primary/10 backdrop-blur-sm">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-primary">
          {user?.role === 'admin' ? 'Admin Panel' : 'Navigation'}
        </h2>
      </div>
      <nav className="mt-6">
        <div className="px-3">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'group flex items-center px-3 py-2 text-sm font-medium rounded-md mb-1 transition-all duration-200 hover:scale-105',
                  isActive
                    ? 'bg-primary/20 text-primary shadow-sm'
                    : 'text-gray-700 hover:bg-primary/10 hover:text-primary'
                )}
              >
                <item.icon
                  className={cn(
                    'mr-3 h-5 w-5 transition-colors',
                    isActive ? 'text-primary' : 'text-gray-400 group-hover:text-primary'
                  )}
                />
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
