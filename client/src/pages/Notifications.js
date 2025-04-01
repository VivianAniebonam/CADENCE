import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Notifications.css";

const Notifications = () => {
  const [selectedFilter, setFilter] = useState("keyword");
  const [keywords, setKeywords] = useState("");
  const [applicants, setApplicants] = useState([]);
  const [dates, setDates] = useState([]);
  const navigate = useNavigate();

  const getApplicants = async () => {
    try {
      //const response = await axios.get("http://localhost:5000/api/gigs/search"); // change to the Applicant route if there is one
      //setApplicants(response.data);
      setApplicants([]);
    } catch (error) {
      console.error("Error fetching applicants:", error);
      setApplicants([]);
    }
  };

  // Date functions
  const Last7Days = () => {
    var result = [];
    for (var i = 0; i < 7; i++) {
      var d = new Date();
      d.setDate(d.getDate() - i);
      result.push(d);
    }
    setDates(result);
  }

  const formatDate = (date) => {
    const month = date.toLocaleString('default', { month: 'long' });
    const dateText = `${month} ${date.getDate()}, ${date.getFullYear()}`;
    return dateText;
  }

  const filterApplicants = (date) => {
    return applicants.filter(applicant => new Date(applicant.dateApplied).toDateString() === date.toDateString());
  }

  useEffect(() => {
    getApplicants();
    Last7Days();
  }, []);

  return (
    <div className="search-container">
      <h2 className="profile-title">NOTIFICATIONS</h2>
      <p style={{ textAlign: "center" }}>Notifications for the last week.</p>
      <div className="grid-container">
        {dates.map((date) => (
          <div className="date-card" key={date}>
            <h2>{formatDate(date)}</h2>
            {filterApplicants(date).length > 0 ? (
              filterApplicants(date).map((applicant) => (
                <div key={applicant._id}>
                  <a href={`/profile/${applicant.applicantUserId}`}>{applicant.applicantUsername}</a> applied to your posting: <a href={`/gig/${applicant.gigId}`}>{applicant.title}</a>
                </div>
              ))
            ) : (
              <p style={{color: "#909090"}}>No notifications.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
