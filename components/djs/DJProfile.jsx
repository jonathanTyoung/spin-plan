import { useEffect, useState } from "react";
import { getFullDJProfile } from "../services/djServices.jsx";
import "./DJProfile.css";
import { useNavigate } from "react-router-dom";

export const DJProfile = ({ currentUser }) => {
  const [djObj, setDj] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Current User:", currentUser);
    if (currentUser?.id) {
      getFullDJProfile(currentUser.id)
        .then((dj) => {
          console.log("Fetched DJ:", dj);
          setDj(dj);
        })
        .catch((err) => {
          console.error("Error fetching DJ:", err);
        });
    }
  }, [currentUser]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount || 0);
  };

  if (!djObj) return <div>Loading profile...</div>;

  return (
    <article className="dj-profile-article">
      <h2 className="dj-profile-title">Current Profile Details</h2>

      <section className="dj-profile-container">
        <div className="dj-profile-card">
          <header className="dj-profile-header">
            Displayed Name: {djObj.user?.name || "Unknown DJ"}
          </header>

          <div className="dj-profile-row">
            <div className="dj-profile-label">Bio:</div>
            <div className="dj-profile-value">{djObj.bio || "No bio provided"}</div>
          </div>

          <div className="dj-profile-row">
            <div className="dj-profile-label">Rate:</div>
            <div className="dj-profile-value">{formatCurrency(djObj.rate)}</div>
          </div>

          <div className="dj-profile-row">
            <div className="dj-profile-label">Availability Type:</div>
            <div className="dj-profile-value">
              {djObj.availabilityType?.label || "Not specified"}
            </div>
          </div>

          <div className="dj-profile-row">
            <div className="dj-profile-label">Experience Level:</div>
            <div className="dj-profile-value">
              {djObj.experienceLevel?.level || "Not specified"}
            </div>
          </div>

          <div className="dj-profile-row">
            <div className="dj-profile-label">Sample:</div>
            <div className="dj-profile-listen">
              {djObj.sample ? (
                <a href={djObj.sample} target="_blank" rel="noopener noreferrer">
                  Listen to Sample
                </a>
              ) : (
                "No sample available"
              )}
            </div>
          </div>

          <div className="dj-profile-row center">
            <button
              className="dj-profile-btn"
              onClick={() => navigate(`/edit-profile/${currentUser.id}`)}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </section>
    </article>
  );
};
