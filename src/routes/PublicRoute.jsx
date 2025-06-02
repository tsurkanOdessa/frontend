import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  const isAuthenticated = !!localStorage.getItem('accessToken');

  return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PublicRoute;