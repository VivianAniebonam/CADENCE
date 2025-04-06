import React from "react";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div>
      <Outlet /> {/* This renders the admin content */}
    </div>
  );
};

export default AdminLayout;
