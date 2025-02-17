import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserHome from "./pages/UserHome";
import Profile from "./pages/Profile";
import ProfileEdit from "./pages/ProfileEdit";

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
      </Routes>
    </Router>
  );
}

export default App;
