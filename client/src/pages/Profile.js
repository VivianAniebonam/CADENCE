import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    const [profile, setProfile] = useState({});
    const [errorStatus, setErrorStatus] = useState(null);
    const [warning, setWarning] = useState(null);

    const getProfile = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:5000/api/profile", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Response:", response.data);
            setProfile(response.data);
        } catch (error) {
            //404 = profile not found
            console.log(error.response.status);
            setErrorStatus(error.response.status);
        }
    };

    useEffect(() => {
        getProfile();

        if (errorStatus === 404) {
            setWarning(
                <h4>
                    Your music profile is blank! Update it now to be able to match with others and receive personalized recommendations.
                </h4>);
        } else if (errorStatus !== null) {
            setWarning(
                <h4>
                    Something went wrong, or your profile has not been set yet! Update it now to be able to match with others and receive personalized recommendations.
                </h4>);
        }

    }, [errorStatus]);

    //console.log(profile);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">

            <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center">
                <h2 className="text-xl font-semibold mb-4">MY PROFILE</h2>
                <h3>[User Name]</h3>
                <h4>email: [user email]</h4>

                {warning}

                <hr></hr>

                <h3>Bio</h3>
                {profile.bio}

                <br></br><br></br>
                <div className="grid-container">

                    <div className="grid-item"><b>Instruments</b></div>
                    <div className="grid-item">
                        {profile.instruments}
                    </div>

                    <div className="grid-item"><b>Genres</b></div>
                    <div className="grid-item">
                        {profile.genres}
                    </div>

                    <div className="grid-item"><b>Years of Experience</b></div>
                    <div className="grid-item">

                    </div>

                    <div className="grid-item"><b>Influences</b></div>
                    <div className="grid-item">
                        {profile.influences}
                    </div>

                    <div className="grid-item"><b>City</b></div>
                    <div className="grid-item">
                        {profile.city}
                    </div>

                    <div className="grid-item"><b>Social Media</b></div>
                    <div className="grid-item">

                       {/* display Youtube link if it exists */}
                        {profile.socialLinks && profile.socialLinks.youtube && (
                            <>
                                Youtube: <a href={profile.socialLinks.youtube}>{profile.socialLinks.youtube}</a><br></br>
                            </>
                        )}
                       
                       {/* display Instagram link if it exists */}
                        {profile.socialLinks && profile.socialLinks.instagram && (
                            <>
                                Instagram: <a href={profile.socialLinks.instagram}>{profile.socialLinks.instagram}</a><br></br>
                            </>
                        )}

                    </div>

                </div>

                <button
                    className="w-full bg-blue-500 text-white py-2 rounded-md mb-3 hover:bg-blue-600"
                    onClick={() => handleNavigation("/user-home")}
                >
                    Back
                </button>
                
                <button
                    className="w-full bg-blue-500 text-white py-2 rounded-md mb-3 hover:bg-blue-600"
                    onClick={() => handleNavigation("/edit-profile")}
                >
                    Edit My Profile
                </button>

            </div>
        </div>
    );
};

export default Profile;
