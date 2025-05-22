import { useEffect, useState } from "react";
import { getDJByUserId, getFullDJProfile } from "../services/djServices.jsx";
import "./DJProfile.css"
import { useNavigate, useParams } from "react-router-dom";

export const DJProfile = ({ currentUser }) => {
    const [dj, setDj] = useState(null); // Store single DJ object or null
    const navigate = useNavigate()

    useEffect(() => {
        console.log("Current User:", currentUser); // Check if it's defined
        if (currentUser?.id) {
            getFullDJProfile(currentUser.id).then((djObj) => {
                console.log("Fetched DJ:", djObj); // See what's returned
                setDj(djObj);
            }).catch(err => {
                console.error("Error fetching DJ:", err);
            });
        }
    }, [currentUser]);


    // Function to format cost as USD
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount || 0);
    };

    if (!dj) return <div>Loading profile...</div>;
    // if (error) return <div>{error}</div>;

    return (
        <article className="dj-profile-article">
  <h2 className="dj-profile-title">Current Profile Details</h2>

  <section className="dj-profile-container">
    <div className="dj-profile-card">
      <header className="dj-profile-header">
        Displayed Name: {dj.user?.name || "Unknown DJ"}
      </header>

      <div className="dj-profile-row">
        <div className="dj-profile-label">Bio:</div>
        <div className="dj-profile-value">{dj.bio || "No bio provided"}</div>
      </div>

      <div className="dj-profile-row">
        <div className="dj-profile-label">Rate:</div>
        <div className="dj-profile-value">{formatCurrency(dj.rate) || "0"}</div>
      </div>

      <div className="dj-profile-row">
        <div className="dj-profile-label">Availability Type:</div>
        <div className="dj-profile-value">
          {dj.availabilityType?.label || "Not specified"}
        </div>
      </div>

      <div className="dj-profile-row">
        <div className="dj-profile-label">Experience Level:</div>
        <div className="dj-profile-value">
          {dj.experienceLevel?.level || "Not specified"}
        </div>
      </div>

      <div className="dj-profile-row">
        <div className="dj-profile-label">Sample:</div>
        <div className="dj-profile-listen">
          {dj.sample ? (
            <a href={dj.sample} target="_blank" rel="noopener noreferrer">
              {dj.sample}
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