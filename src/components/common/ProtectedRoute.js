import React from "react";

import {Navigate, Route, Outlet } from "react-router-dom";

const ProtectedRoute = (props) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const authUser = JSON.parse(localStorage.getItem("userData"))
  
  console.log(authUser.role)

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if(props.roleRequired)
    if(props.roleRequired === authUser.userRole)
      return <Outlet {...props} />;
    else 
      return <Navigate to="/home" />;
  else
    return <Outlet {...props} />;
};

export default ProtectedRoute;