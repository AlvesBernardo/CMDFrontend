import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import TokenManager from '../helpers/TokenManager.js'

function ProtectedRoute() {
  const token = TokenManager.getAccessToken();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
export default ProtectedRoute;
