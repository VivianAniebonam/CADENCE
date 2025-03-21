import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("isAdmin") === "true"; // ✅ Convert to boolean

    console.log("Token:", token);
    console.log("isAdmin:", isAdmin);

    return token && isAdmin ? children : <Navigate to="/login" />;
};

export default AdminRoute;
