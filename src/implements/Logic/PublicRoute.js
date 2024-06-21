import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import UserService from '../UserService/UserService';

const PublicRoute = ({ redirectTo }) => {
  const isAuthenticated = UserService.isAuthenticated();

  if (isAuthenticated) {
    return <Navigate to={redirectTo="/DisplayLogin"} />;
  }

  return <Outlet />;
};
export default PublicRoute;