import React, { useState } from 'react';
import '../styles/ManageGigs.css';

const ManageGigPostings = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const gigs = [
        { title: 'Guitarist Wanted for Pop Band', id: 1 },
        { title: 'DJ Needed for Club Event', id: 2 },
        { title: 'Drummer for Jazz Band', id: 3 }
    ];

    const handleDelete = (gigId) => {
        if (window.confirm("Are you sure you want to delete this gig?")) {
            alert(`Gig ID ${gigId} deleted`);
        }
    };

    return (
        <div className="manage-gig-postings">
            <h2>Manage Gig Postings</h2>
            <input 
                type="text" 
                className="search-bar" 
                placeholder="Search by username..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <div className="gig-list">
                {gigs.filter(gig => gig.title.toLowerCase().includes(searchTerm.toLowerCase())).map((gig) => (
                    <div className="gig-item" key={gig.id}>
                        <p>{gig.title}</p>
                        <button className="view-button">View Gig</button>
                        <button className="delete-button" onClick={() => handleDelete(gig.id)}>Delete Gig</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageGigPostings;
