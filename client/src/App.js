import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserHome from "./pages/UserHome";
import Profile from "./pages/Profile";
import ProfileEdit from "./pages/ProfileEdit";
import ProfileViewOnly from "./pages/ProfileViewOnly";
import Recommendations from "./pages/Recommendations";
import MusicianSearch from "./pages/MusicianSearch";

import './styles/App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user-home" element={<UserHome />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<ProfileEdit />} />
        <Route path = "/profile/:id" element={<ProfileViewOnly />} />
        <Route path = "/recommendations" element={<Recommendations />} />
        <Route path = "/musician-search" element={<MusicianSearch />} />
      </Routes>
    </Router>
  );
}

export default App;
