
import "./Form.css"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAvailabilityTypes, getAvailableDays, getExperienceLevels, getFullDJProfile, updateDJProfile } from "../services/djServices.jsx"
import { getUserById, updateUserProfile } from "../services/userServices.jsx"

export const DJForm = ({ currentUser }) => {
    const [dj, setDj] = useState(null)
    const [experienceLevels, setExperienceLevels] = useState([])
    const [availabilityTypes, setAvailabilityTypes] = useState([])
    const [availableDays, setAvailableDays] = useState([])
    const [selectedDays, setSelectedDays] = useState([])
    const [user, setUser] = useState({ name: "", email: "" });

    const [successMessage, setSuccessMessage] = useState("")
    const navigate = useNavigate()

    console.log("currentUser ", currentUser)

    useEffect(() => {
        if (!currentUser) {
            console.log("user doesn't exist")
        } else {
            console.log("currentUser ", currentUser)
        }
    }, [])


    // Load current user's DJ profile on mount or when currentUser changes
    useEffect(() => {
        if (currentUser?.id) {
            console.log("currentUser ", currentUser)
            getFullDJProfile(currentUser.id)
                .then((djObj) => {
                    setDj(djObj)  // djObj is a single DJ object including user info
                })
                .catch((error) => {
                    console.error("Error fetching DJ profile:", error)
                })
        }
    }, [currentUser])

    // Load experience levels for select dropdown
    useEffect(() => {
        getExperienceLevels().then(setExperienceLevels)
    }, [])

    // Load availability types for select dropdown
    useEffect(() => {
        getAvailabilityTypes().then(setAvailabilityTypes)
    }, [])

    // Load availability types for select dropdown
    useEffect(() => {
        getAvailableDays().then(setAvailableDays)
    }, [])

    useEffect(() => {
        if (currentUser?.id) {
            getUserById(currentUser.id).then((data) => {
                setUser({
                    ...data,
                    name: data.name || "",
                    email: data.email || "",
                });
            });
        }
    }, [currentUser]);


    const handleSave = (event) => {
        event.preventDefault();
        if (!dj || !user) return;

        const editedUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            isDj: user.isDj
        };

        const editedDj = {
            bio: dj?.bio,
            rate: dj?.rate,
            experienceLevelId: dj?.experienceLevelId,
            availabilityTypeId: dj?.availabilityTypeId,
            sample: dj?.sample
        };

        Promise.all([
            updateUserProfile(editedUser),
            updateDJProfile(dj.id, editedDj)
        ])
            .then(() => {
                setSuccessMessage("✅ Profile saved successfully!");
                setTimeout(() => setSuccessMessage(""), 3000);
            })
            .catch((error) => {
                console.error("Error saving profile:", error);
                setSuccessMessage("❌ Failed to save profile.");
                setTimeout(() => setSuccessMessage(""), 5000);
            });
    };


    // // Handle checkbox toggle
    // const toggleDaySelection = (dayId) => {
    //     setSelectedDays(prevSelected =>
    //         prevSelected.includes(dayId)
    //             ? prevSelected.filter(id => id !== dayId)
    //             : [...prevSelected, dayId]
    //     );
    // };

    return (
        <form className="profile" onSubmit={handleSave}>
            <h2>Update Profile</h2>

            <fieldset>
                <div className="form-group">
                    <label>Full Name:</label>
                    <input
                        type="text"
                        value={user?.name || ""}
                        onChange={(event) => {
                            const copy = { ...user }
                            copy.name = event.target.value
                            setUser(copy)
                        }}
                        required
                        className="form-control"
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={user?.email || ""}
                        onChange={(event) => {
                            const copy = { ...user }
                            copy.email = event.target.value
                            setUser(copy)
                        }}
                        required
                        className="form-control"
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label>Bio:</label>
                    <input
                        type="text"
                        value={dj?.bio || ""}
                        onChange={(event) => {
                            const copy = { ...dj }
                            copy.bio = event.target.value
                            setDj(copy)
                        }}
                        required
                        className="form-control"
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label>Hourly Rate:</label>
                    <input
                        type="number"
                        value={dj?.rate || ""}
                        onChange={(e) => setDj({ ...dj, rate: parseFloat(e.target.value) || 0 })}
                        required
                        className="form-control"

                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label>Choose Experience Level:</label>
                    <select
                        value={dj?.experienceLevelId || ""}
                        onChange={(e) => setDj({ ...dj, experienceLevelId: parseInt(e.target.value) })}
                        required
                        className="form-control"
                    >
                        <option value="">Select Experience Level...</option>
                        {experienceLevels.map((level) => (
                            <option key={level.id} value={level.id}>
                                {level.level}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label>Choose Availability Type:</label>
                    <select
                        value={dj?.availabilityTypeId || ""}
                        onChange={(e) => setDj({ ...dj, availabilityTypeId: parseInt(e.target.value) })}
                        required
                        className="form-control"
                    >
                        <option value="">Select Availability Type...</option>
                        {availabilityTypes.map((availabilityType) => (
                            <option key={availabilityType.id} value={availabilityType.id}>
                                {availabilityType.label}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            {/* <fieldset>
                <div className="form-group">
                    <label>Available Days:</label>
                    {availableDays.map(day => (  // assuming availabilityTypes = all possible days
                        <div key={day.id} className="form-check">
                            <input
                                type="checkbox"
                                name="availableDays"
                                value={day.id}
                                checked={selectedDays.includes(day.id)}
                                onChange={() => toggleDaySelection(day.id)}
                                className="form-check-input"
                                required
                                id={`available-day-${day.id}`}
                            />
                            <label className="form-check-label" htmlFor={`available-day-${day.id}`}>
                                {day.label}
                            </label>
                        </div>
                    ))}
                </div>
            </fieldset> */}

            <fieldset>
                <div className="form-group">
                    <label>Sample Mix (URL):</label>
                    <input
                        type="url"
                        value={dj?.sample || ""}
                        onChange={(event) => {
                            const copy = { ...dj };
                            copy.sample = event.target.value;
                            setDj(copy);
                        }}
                        required
                        className="form-control"
                        placeholder="https://your-sample-link.com"
                    />
                </div>
            </fieldset>


            {/* Add other fields as needed */}

            <button type="submit" className="btn btn-primary">
                Save Profile
            </button>

            {successMessage && (
                <div className="success-message">
                    {successMessage}
                </div>
            )}

        </form>
    )
}
