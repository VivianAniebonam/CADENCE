import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfileEdit = () => {
    const navigate = useNavigate();
   
     const handleNavigation = (path) => {
       navigate(path);
     };

    const [instruments, setInstruments] = useState("");
    const [genres, setGenres] = useState("");
    const [influences, setInfluences] = useState("");
    const [city, setCity] = useState("");
    const [youtubeLink, setYoutubeLink] = useState("");
    const [instaLink, setInstagramLink] = useState("");
    const [bio, setBio] = useState("");

    const getProfile = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:5000/api/profile", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            //console.log("Response:", response.data);
            setInstruments(response.data.instruments.join(","));
            setGenres(response.data.genres.join(","));
            setInfluences(response.data.influences.join(","));
            setCity(response.data.city);
            setYoutubeLink(response.data.socialLinks.youtube);
            setInstagramLink(response.data.socialLinks.instagram);
            setBio(response.data.bio);

        } catch (error) {
            //404 = profile not found
            console.log(error.response.status);
        }
    };

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem("token");

            const instrumentsArray = instruments.split(",");
            const genresArray = genres.split(",");
            const influencesArray = influences.split(",");

            const response = await axios.post("http://localhost:5000/api/profile",
                {
                    instruments: instrumentsArray,
                    genres: genresArray,
                    influences: influencesArray,
                    city,
                    socialLinks: {
                        youtube: youtubeLink,
                        instagram: instaLink
                    },
                    bio
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            
            if (response.data !== null) {
                alert("Profile updated successfully");
                navigate("/profile");
            }
        } catch (error) {
            alert("Something went wrong with profile update: " + error);
        }
    };

    useEffect(() => {
        getProfile();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center">
                <h2 className="text-xl font-semibold mb-4">EDIT PROFILE</h2>
                <h3>[User Name]</h3>
                <h4>email: [user email]</h4>

                <br></br>
                <hr></hr>

                <h3>Bio</h3>
                <textarea rows="6" cols="75" value={bio} onChange={(e) => setBio(e.target.value)}></textarea>

                <div className="grid-container">
                    <div className="grid-item"><b>Instruments</b></div>
                    <div className="grid-item">
                        <input required type="text" placeholder="Instruments, separate with commas" value={instruments} onChange={(e) => setInstruments(e.target.value)} />
                    </div>

                    <div className="grid-item"><b>Genres</b></div>
                    <div className="grid-item">
                        <input required type="text" placeholder="Genres, separate with commas" value={genres} onChange={(e) => setGenres(e.target.value)} />
                    </div>

                    <div className="grid-item"><b>Years of Experience</b></div>
                    <div className="grid-item">
                        <input required type="number" placeholder="Years of Experience" />
                    </div>

                    <div className="grid-item"><b>Influences</b></div>
                    <div className="grid-item">
                        <input required type="text" placeholder="Influences, separate with commas" value={influences} onChange={(e) => setInfluences(e.target.value)} />
                    </div>

                    <div className="grid-item"><b>City</b></div>
                    <div className="grid-item">
                        <input required type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                    </div>

                    <div className="grid-item"><b>Social Media Links</b></div>
                    <div className="grid-item">
                        <input type="text" placeholder="Youtube link" value={youtubeLink} onChange={(e) => setYoutubeLink(e.target.value)} />
                        <input type="text" placeholder="Instagram Link" value={instaLink} onChange={(e) => setInstagramLink(e.target.value)} />
                    </div>
                </div>

                <button
                    className="w-full bg-blue-500 text-white py-2 rounded-md mb-3 hover:bg-blue-600"
                    onClick={() => handleNavigation("/profile")}
                >
                    Back
                </button>

                <button
                    className="w-full bg-blue-500 text-white py-2 rounded-md mb-3 hover:bg-blue-600"
                    onClick={handleUpdate}
                >
                    Update
                </button>
            </div>
        </div>
    );
};

export default ProfileEdit;