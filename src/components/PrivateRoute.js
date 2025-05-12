import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, permissionsRequired }) => {
  const token = localStorage.getItem("token");
  const permissions = JSON.parse(localStorage.getItem("permissions")) || [];

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (permissionsRequired && !permissions.includes(permissionsRequired)) {
    return <Navigate to="/access-denied" replace />;
  }

  return children;
};

export default PrivateRoute;
