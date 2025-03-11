import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  const location = useLocation();

  // ❌ Hide Navbar on these routes
  const noNavbarRoutes = [
    "/login", 
    "/register", 
    "/admin-home", 
    "/manage-users", 
    "/manage-gig-postings"
  ];

  return (
    <div>
      {!noNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Outlet />
    </div>
  );
};

export default Layout;
