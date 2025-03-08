import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import UserHome from "./pages/UserHome";
import Profile from "./pages/Profile";
import ProfileEdit from "./pages/ProfileEdit";
import AccountSettings from "./pages/AccountSettings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminHome from "./pages/AdminHome";
import ManageUsers from "./pages/ManageUsers";
import ManageGigPostings from "./pages/ManageGigPostings";
import AdminViewProfile from "./pages/AdminViewProfile"; // ✅ New Import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Routes that show the Navbar */}
        <Route path="/*" element={<WithNavbar />} />

        {/* Admin pages */}
        <Route path="/admin-home" element={<AdminHome />} />
        <Route path="/manage-users" element={<ManageUsers />} />
        <Route path="/manage-gig-postings" element={<ManageGigPostings />} />
        <Route path="/admin-view-profile/:id" element={<AdminViewProfile />} /> {/* ✅ Add this */}

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

// Component wrapper for user pages with Navbar
const WithNavbar = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/user-home" element={<UserHome />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<ProfileEdit />} />
        <Route path="/account-settings" element={<AccountSettings />} />
      </Routes>
    </>
  );
};

export default App;
