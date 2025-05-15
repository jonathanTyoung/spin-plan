import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEventById, updateEvent, getAllDJsById, getEventTypes, cancelEvent } from "../services/EventServices.jsx";
import "./EventDetails.css";

export const EventDetails = ({ currentUser }) => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [DJs, setDJs] = useState([]);
    const [eventTypes, setEventTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        // Fetch all necessary data in parallel
        Promise.all([
            getEventById(eventId),
            getAllDJsById(),
            getEventTypes()
        ]).then(([eventData, DJsData, eventTypesData]) => {
            setEvent(eventData);
            setDJs(DJsData);
            setEventTypes(eventTypesData);
            setLoading(false);
        });
    }, [eventId, currentUser]);

    if (loading || !event) return <div>Loading...</div>;

    const handleChange = (evt) => {
        const { id, value } = evt.target;
        setEvent(prev => ({ ...prev, [id]: value }));
    };

    const handleDJChange = (evt) => {
        const { id, value } = evt.target;
        const selectedDJ = DJs.find(dj => dj.id === parseInt(value));
        const cost = selectedDJ ? selectedDJ.cost : 0;
        setEvent(prev => ({...prev, [id]: value, totalCost: cost
        }));
    };

    const handleUpdate = (evt) => {
        evt.preventDefault();
        updateEvent(event).then(() => alert("Event updated!"));
    };

    // Cancel the entire order
    const handleDelete = () => {
        if (window.confirm("Are you sure you want to cancel this event? This action cannot be undone.")) {
            cancelEvent(eventId)
                .then(() => {
                    alert("Event has been successfully canceled.");
                    navigate(`/upcoming-events`);
                })
                .catch((error) => {
                    console.error("Error deleting event:", error);
                    alert("An error occurred while canceling the event. Please try again.");
                });
        }
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
                        value={event.description || ""}
                        className="form-control"
                        placeholder="Brief description of event"
                        onChange={handleChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="DJId">Choose DJ</label>
                    <select
                        id="DJId"
                        value={event.DJId || ""}
                        onChange={handleDJChange}
                        className="form-control"
                        required
                    >
                        <option value="">Select Your DJ...</option>
                        {DJs.map((dj) => (
                            <option key={dj.id} value={dj.id}>
                                {dj.user.name} - ${dj.cost}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="eventTypeId">Choose Event Type</label>
                    <select
                        id="eventTypeId"
                        value={event.eventTypeId || ""}
                        onChange={handleChange}
                        className="form-control"
                        required
                    >
                        <option value="">Select Your Event Type...</option>
                        {eventTypes.map((type) => (
                            <option key={type.id} value={type.id}>
                                {type.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Event Date</label>
                    <input
                        type="date"
                        id="date"
                        value={event.date || ""}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Total Cost</label>
                    <div className="form-control">
                        ${event.totalCost || 0}
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <div className="small-btn">
                    <button
                        type="submit"
                        className="cyber-btn"
                        
                    >
                        Update Event
                    </button>
                </div>
            </fieldset>
            <fieldset>
                <div className="small-btn">
                    <button
                        type="button"
                        className="cyber-btn"
                        onClick={handleDelete}
                    >
                        Delete Event
                    </button>
                </div>
            </fieldset>
        </form>
    );
};