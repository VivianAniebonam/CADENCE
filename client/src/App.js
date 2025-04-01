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
import AdminViewProfile from "./pages/AdminViewProfile";
import RecommendedProfiles from "./pages/RecommendedProfiles";
import Search from "./pages/Search";
import ViewUserProfile from "./pages/ViewUserProfile";
import GigBoard from "./pages/GigBoard";
import MyGigs from "./pages/MyGigs";
import GigBoardMenu from "./pages/GigBoardMenu";
import PostGig from "./pages/PostGig";
import EditGig from "./pages/EditGig";
import UserGig from "./pages/UserGig";
import Notifications from "./pages/Notifications";
import UserViewProfile from "./pages/UserViewProfile"; // ✅ This one

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes without Navbar */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-home" element={<AdminHome />} />
        <Route path="/manage-users" element={<ManageUsers />} />
        <Route path="/manage-gig-postings" element={<ManageGigPostings />} />
        <Route path="/admin-view-profile/:id" element={<AdminViewProfile />} />

        {/* All routes with Navbar */}
        <Route path="/*" element={<WithNavbar />} />
      </Routes>
    </Router>
  );
}

const WithNavbar = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/user-home" element={<UserHome />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<ProfileEdit />} />
        <Route path="/account-settings" element={<AccountSettings />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile/:id" element={<ViewUserProfile />} />
        <Route path="/user-view-profile/:id" element={<UserViewProfile />} /> {/* ✅ NOW WITH NAVBAR */}
        <Route path="/recommended-profiles" element={<RecommendedProfiles />} />
        <Route path="/gigs" element={<GigBoard />} />
        <Route path="/gig-board-menu" element={<GigBoardMenu />} />
        <Route path="/view-my-gigs" element={<MyGigs />} />
        <Route path="/post-gig" element={<PostGig />} />
        <Route path="/edit-gig/:gigId" element={<EditGig />} />
        <Route path="/gig/:gigId" element={<UserGig />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>
    </>
  );
};

export default App;
