import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUserHooks } from '@/hooks/useUserHooks';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useUserHooks();
  const location = useLocation();
  const token = localStorage.getItem('token');

  // 如果没有 token 或用户信息，重定向到登录页
  if (!token || !user) {
    return <Navigate to='/login' replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
