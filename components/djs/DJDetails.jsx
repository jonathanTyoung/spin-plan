import { useState } from "react"
import { updateDJProfile, getDJByUserId } from "../services/djServices.jsx"
import { useParams } from "react-router-dom";

export const DJDetails = ({ currentUser }) => {
    const [dj, setDj] = useState();
    const { userId } = useParams()

    useEffect(() => {
        console.log("Current User ID:", currentUser?.id); // Debug: Log user ID
        console.log("Current User Object:", currentUser); // Debug: Log full user object

        if ({userId}) {
            setDj(null); // Clear stale data
            getDJByUserId(userId)
                .then((djData) => {
                    console.log("Fetched DJ Data:", djData); // Debug: Log API response
                    setDj(djData); // Expect single object or null
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching DJ:", error);
                    setError("Failed to load DJ profile.");
                    setDj(null);
                    setLoading(false);
                });
        }
    }, [userId]); // Re-run when userId parameter changes

    // Function to format cost as USD
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount || 0);
    };

    const handleChange = (evt) => {
        const { id, value } = evt.target;
        setDj(prev => ({ ...prev, [id]: value }));
    };

    const handleUpdate = (evt) => {
        evt.preventDefault();
        updateDJProfile(dj).then(() => alert(" Your DJ Profile has been updated!"));
    };

    // Function to format availability dates
    const formatDates = (days) => {
        if (!Array.isArray(days) || days.length === 0) {
            return "No availability specified";
        }
        // Ensure proper capitalization and join with commas
        return days.map((day) => day.charAt(0).toUpperCase() + day.slice(1).toLowerCase())
            .join(", ");
    };

    return (
        <form onSubmit={handleUpdate} >
            <h2>Edit Your Event Details</h2>
            <fieldset>
                <div className="form-group">
                    <label>Description</label>
                    <input
                        type="text"
                        id="description"
                        value={dj.user.bio || ""}
                        className="form-control"
                        placeholder="Brief description of event"
                        onChange={handleChange}
                    />
                </div>
            </fieldset>
        </form>
    )
};
