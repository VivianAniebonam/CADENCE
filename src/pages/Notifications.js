import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Notifications.css";

const Notifications = () => {
  const [applicants, setApplicants] = useState([]);
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Retrieve the logged-in user from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  console.log("Logged in user:", user);

  // Generate an array of Date objects for the last 7 days
  const getLast7Days = () => {
    const result = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      result.push(new Date(d));
    }
    setDates(result);
  };

  // Format a Date object as "Month Day, Year" (e.g., "March 30, 2025")
  const formatDate = (date) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  // Filter applicants whose dateApplied matches the provided date
  const filterApplicants = (date) => {
    return applicants.filter(
      (applicant) =>
        new Date(applicant.dateApplied).toDateString() === date.toDateString()
    );
  };

  // Fetch notifications for the current user (as the gig poster)
  const getApplicants = async () => {
    if (!user?.userId) {
      console.warn("No user ID found in localStorage.");
      setLoading(false);
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:5000/api/applicants/notifications?posterUserId=${user.userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Fetched notifications:", res.data);
      setApplicants(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setApplicants([]);
      setLoading(false);
    }
  };

  // Run this effect only once on component mount
  useEffect(() => {
    getApplicants();
    getLast7Days();
  }, []);

  if (loading) {
    return (
      <div className="notifications-container">
        Loading notifications...
      </div>
    );
  }

  return (
    <div className="notifications-container">
      <h2 className="notifications-title">Notifications</h2>
      <p className="instructions">Notifications for the last week.</p>
      <div className="grid-container">
        {dates.map((date) => (
          <div className="date-card" key={date.toISOString()}>
            <h3 className="date-header">{formatDate(date)}</h3>
            {filterApplicants(date).length > 0 ? (
              filterApplicants(date).map((applicant) => (
                <div key={applicant._id} className="notification-entry">
                  <a
                    href={`/profile/${applicant.applicantUserId}`}
                    className="applicant-link"
                  >
                    {applicant.applicantUsername}
                  </a>{" "}
                  applied to your posting:{" "}
                  <a href={`/gig/${applicant.gigId}`} className="gig-link">
                    {applicant.title}
                  </a>
                </div>
              ))
            ) : (
              <p className="no-notifications">No notifications.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
