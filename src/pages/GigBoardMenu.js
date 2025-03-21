import React from 'react';
import '../styles/GigBoardMenu.css';
import { useNavigate } from 'react-router-dom';

const GigBoardMenu = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="gig-board-menu">
            <h2>Gig Board Menu</h2>
            <button className="gig-button" onClick={() => handleNavigation('/browse-gigs')}>Browse Gig Board</button>
            <button className="gig-button" onClick={() => handleNavigation('/view-my-gigs')}>View My Gigs</button>
            <button className="gig-button" onClick={() => handleNavigation('/post-new-gig')}>Post A New Gig</button>
        </div>
    );
};

export default GigBoardMenu;
