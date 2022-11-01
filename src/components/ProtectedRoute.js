import React, { Children } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../store/userSlice";

const ProtectedRoute = ({ children }) => {
  const user = useSelector(selectUser);

  if (!user) {
    return <Navigate to="/landing" />;
  }
  return children;
};

export default ProtectedRoute;
