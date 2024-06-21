import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import UserService from '../UserService/UserService';

const ProtectedRoute = ({ role, redirectTo }) => {
  const isAuthenticated = UserService.isAuthenticated();
  
  const userRole = localStorage.getItem('role');

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} />;
  }

  if (role && userRole !== role) {
    return <Navigate to={redirectTo} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
