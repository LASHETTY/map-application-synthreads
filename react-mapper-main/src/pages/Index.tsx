
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

// This index page just redirects to the home page
const Index = () => {
  return <Navigate to="/" replace />;
};

export default Index;
