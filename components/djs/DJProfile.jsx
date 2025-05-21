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
        <article>
            <section className="DJ-section">
                <div className="dj-profile">
                    <header className="dj-profile__header">DJ: {dj.user?.name || "Unknown DJ"}</header>

                    <div className="dj-profile__row">
                        <div className="dj-profile__label">Rate:</div>
                        <div className="dj-profile__value">{formatCurrency(dj.rate) || "0"}</div>
                    </div>

                    <div className="dj-profile__row">
                        <div className="dj-profile__label">Bio:</div>
                        <div className="dj-profile__value">{dj.bio || "No bio provided"}</div>
                    </div>

                    <div className="dj-profile__row">
                        <div className="dj-profile__label">Availability Type:</div>
                        <div className="dj-profile__value">{dj.availabilityType?.label || "Not specified"}</div>
                    </div>

                    <div className="dj-profile__row">
                        <div className="dj-profile__label">Experience Level:</div>
                        <div className="dj-profile__value">{dj.experienceLevel?.level || "Not specified"}</div>
                    </div>


                    {/* <div className="dj-profile__row">
                        <div className="dj-profile__label">Available Days:</div>
                        <div className="dj-profile__value">{formatDates(dj.availableDays)}</div>
                    </div> */}

                    <div className="dj-profile__row">
                        <div className="dj-profile__label">Sample:</div>
                        <div className="dj-profile__value">
                            {dj.sample ? (
                                <a href={dj.sample} target="_blank" rel="noopener noreferrer">
                                    Listen
                                </a>
                            ) : (
                                "No sample available"
                            )}
                        </div>
                    </div>
                    <div className="dj-profile__row">
                        <div className="dj-profile__label"></div>
                        <div className="dj-profile__value">
                            <button className="cyber-btn" onClick={() => navigate(`/edit-profile/${currentUser.id}`)}>
                                Edit Profile
                            </button>

                        </div>
                    </div>
                </div>
            </section>
        </article>
    );
};










// import { useEffect, useState } from "react";
// import { getDJByUserId } from "../services/djServices.jsx";

// export const DJProfile = ({ currentUser }) => {
//   const [dj, setDj] = useState(null); // Store single DJ object or null
//   const [loading, setLoading] = useState(true); // Handle loading state
//   const [error, setError] = useState(null); // Handle errors

//   useEffect(() => {
//     console.log("Current User ID:", currentUser?.id); // Debug: Log user ID
//     console.log("Current User Object:", currentUser); // Debug: Log full user object

//     if (currentUser?.id) {
//       setLoading(true);
//       setError(null);
//       getDJByUserId(currentUser.id)
//         .then((djData) => {
//           console.log("Fetched DJ Data:", djData); // Debug: Log API response
//           setDj(djData); // Expect single object or null
//           setLoading(false);
//         })
//         .catch((error) => {
//           console.error("Error fetching DJ:", error);
//           setError("Failed to load DJ profile.");
//           setDj(null);
//           setLoading(false);
//         });
//     } else {
//       console.log("No user logged in"); // Debug: Log when no user
//       setDj(null);
//       setLoading(false);
//       setError(null);
//     }
//   }, [currentUser?.id]); // Re-run when currentUser.id changes

//   // Function to format rate as USD
//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//     }).format(amount);
//   };

//   if (loading) {
//     return <div>Loading DJ profile...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   if (!currentUser) {
//     return <div>Please log in to view your DJ profile.</div>;
//   }

//   if (!dj) {
//     return <div>No DJ profile found for this user.</div>;
//   }

//   return (
//     <article>
//       <section className="DJ-section">
//         <div className="dj-card">
//           <header className="dj-card__header">DJ: {dj.user?.name || dj.name || "Unknown DJ"}</header>
//           <div className="dj-card__row">
//             <div className="dj-card__label">Price:</div>
//             <div className="dj-card__value">{formatCurrency(dj.cost)}</div>
//           </div>
//           <div className="dj-card__row">
//             <div className="dj-card__label">Price:</div>
//             <div className="dj-card__value">{formatCurrency(dj.cost)}</div>
//           </div>
//           <div className="dj-card__row">
//             <div className="dj-card__label">Price:</div>
//             <div className="dj-card__value">{formatCurrency(dj.cost)}</div>
//           </div>
//           <div className="DJ-label">
//             Sample:{" "}
//             {dj.sample ? (
//               <a href={dj.sample} target="_blank" rel="noopener noreferrer">
//                 Listen
//               </a>
//             ) : (
//               "No sample available"
//             )}
//           </div>
//         </div>
//       </section>
//     </article>
//   );
// };