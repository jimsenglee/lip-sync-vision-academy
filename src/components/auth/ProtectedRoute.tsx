import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'user' | 'admin';
  allowedRoles?: ('user' | 'admin')[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole, 
  allowedRoles 
}) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check specific required role
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  // Check allowed roles array
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  // Prevent admins from accessing user-only routes
  if (user.role === 'admin' && !requiredRole && !allowedRoles) {
    const currentPath = window.location.pathname;
    const userOnlyPaths = ['/transcription', '/education', '/reports'];
    
    if (userOnlyPaths.some(path => currentPath.startsWith(path))) {
      return <Navigate to="/admin" replace />;
    }
  }

  // Prevent users from accessing admin routes
  if (user.role === 'user') {
    const currentPath = window.location.pathname;
    if (currentPath.startsWith('/admin')) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;