import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // In a real app, redirect to login
    // return <Navigate to="/login" state={{ from: location }} replace />;
    return <>{children}</>; // For demo purposes, allow if not authenticated
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Redirect to unauthorized or dashboard
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
