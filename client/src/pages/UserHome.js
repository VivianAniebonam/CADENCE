import React from "react";
import { useNavigate } from "react-router-dom";

const UserHome = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome to <span className="text-blue-500">CADENCE</span> 🎵</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center">
        <h2 className="text-xl font-semibold mb-4">Hello, [User's Name] 👋</h2>

        <button 
          className="w-full bg-blue-500 text-white py-2 rounded-md mb-3 hover:bg-blue-600"
          onClick={() => handleNavigation("/profile")}
        >
          View My Profile
        </button>

        <button 
          className="w-full bg-green-500 text-white py-2 rounded-md mb-3 hover:bg-green-600"
          onClick={() => handleNavigation("/gigs")}
        >
          Gig Board 🎸
        </button>

        <button 
          className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600"
          onClick={() => handleNavigation("/chat")}
        >
          Chat 💬
        </button>
      </div>
    </div>
  );
};

export default UserHome;
