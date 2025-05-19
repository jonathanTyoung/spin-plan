import React, { useState, useEffect } from "react";
import { getAllDJsByUserId, getDJById, updateDJProfile } from "../services/djServices.jsx";
import "./Form.css"
import { useParams } from "react-router-dom";

export const Profile = ({ currentUser }) => {
    const { DJId } = useParams(); // Fixed: Added parentheses and destructuring
    const [allDJs, setAllDJs] = useState([]);
    const [DJ, setDJ] = useState({
        name: "",
        cost: 0,
        bio: "",
        experienceLevel: "",
        availabilityType: "",
        availabilityDates: [],
        sample: ""
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
    getDJById(DJId).then((DJ) => {
        setDJ(DJ)
    })
    }, [DJId, currentUser])

    const handleChange = (event) => {
        const { id, value } = event.target;
        setDJ((prev) => ({
            ...prev,
            [id]: value
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const djId = DJId || DJ.id;
            await updateDJProfile(djId, DJ);
            alert("Profile updated successfully!");
        } catch (err) {
            alert("Failed to update profile. Please try again.");
            console.error("Error updating profile:", err);
        }
    };

    const formatCurrency = (amount) =>
        new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount);

    if (loading) return <div>Loading profile...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <form className="form" onSubmit={handleUpdate}>
            <h2>Edit Your Profile</h2>

            <fieldset>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    value={DJ.name || ""}
                    onChange={handleChange}
                    required
                />
            </fieldset>

            <fieldset>
                <label htmlFor="bio">Bio</label>
                <textarea
                    id="bio"
                    value={DJ.bio || ""}
                    onChange={handleChange}
                    rows="4"
                />
            </fieldset>

            <fieldset>
                <label htmlFor="experienceLevel">Experience Level</label>
                <select
                    id="experienceLevel"
                    value={DJ.experienceLevel || ""}
                    onChange={handleChange}
                >
                    <option value="">Select Experience Level</option>
                    <option value="beginner">Beginner (0-2 years)</option>
                    <option value="intermediate">Intermediate (2-5 years)</option>
                    <option value="advanced">Advanced (5-10 years)</option>
                    <option value="expert">Expert (10+ years)</option>
                </select>
            </fieldset>

            <fieldset>
                <label htmlFor="availabilityType">Availability Type</label>
                <select
                    id="availabilityType"
                    value={DJ.availabilityType || ""}
                    onChange={handleChange}
                >
                    <option value="">Select Type</option>
                    <option value="weekends">Weekends</option>
                    <option value="weekdays">Weekdays</option>
                    <option value="all">All Days</option>
                </select>
            </fieldset>

            <fieldset>
                <label htmlFor="availabilityDates">Availability Dates (comma separated)</label>
                <input
                    type="text"
                    id="availabilityDates"
                    value={Array.isArray(DJ.availabilityDates) ? DJ.availabilityDates.join(", ") : ""}
                    onChange={(e) =>
                        setDJ((prev) => ({
                            ...prev,
                            availabilityDates: e.target.value.split(",").map(d => d.trim()).filter(d => d)
                        }))
                    }
                    placeholder="e.g., 2024-01-15, 2024-01-22, 2024-01-29"
                />
            </fieldset>

            <fieldset>
                <label htmlFor="cost">Rate (USD)</label>
                <input
                    type="number"
                    id="cost"
                    value={DJ.cost || 0}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                />
                <small>Current rate: {formatCurrency(DJ.cost || 0)}</small>
            </fieldset>

            <fieldset>
                <label htmlFor="sample">Sample URL</label>
                <input
                    type="url"
                    id="sample"
                    value={DJ.sample || ""}
                    onChange={handleChange}
                    placeholder=""
                />
            </fieldset>

            <button type="submit" className="cyber-btn">
                Update Profile
            </button>
        </form>
    );
};