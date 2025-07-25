import { useState, useEffect } from "react"
import "./EventForm.css"
import { useNavigate } from "react-router-dom"
import { createEvent, getEventTypes, getAllDJsById } from "../services/EventServices.jsx"


export const EventForm = ({ currentUser }) => {
    const [event, setEvent] = useState({
        description: "",
        DJId: "",
        hours: 0,
        eventTypeId: "",
        date: "",
        totalCost: 0
    })
    const [DJs, setDJs] = useState([])
    const [eventTypes, setEventTypes] = useState([])
    const navigate = useNavigate()


    useEffect(() => {
        getEventTypes()
            .then((eventTypesArray) => {
                console.log("Fetched event types:", eventTypesArray) // Debugging
                setEventTypes(eventTypesArray)
            })
            .catch((error) => console.error("Error fetching event types:", error))
    }, [])

    useEffect(() => {
        getAllDJsById()
            .then((DJsArray) => {
                console.log("Fetched DJs:", DJsArray) // Debugging
                setDJs(DJsArray)
            })
            .catch((error) => console.error("Error fetching DJs:", error))
    }, [])


    const handleSave = (evt) => {
        evt.preventDefault()

        // Validate all required fields
        if (event.description && event.DJId && event.eventTypeId && event.date) {
            const newEvent = {
                userId: currentUser.id,
                description: event.description,
                DJId: parseInt(event.DJId),
                hours: parseInt(event.hours),
                eventTypeId: parseInt(event.eventTypeId),
                date: event.date,
                totalCost: parseFloat(event.totalCost)
            }

            console.log("Event being sent to the server:", newEvent) // Debugging


            createEvent(newEvent).then(() => {
                navigate(`/upcoming-events`)
            })
        } else {
            window.alert("Please fill out all fields!")
        }
    }

    return (
        <form className="form-container">
            <h2>Create New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label>Description</label>
                    <input
                        type="text"
                        value={event.description}
                        className="form-control"
                        placeholder="Brief description of event"
                        onChange={(e) =>
                            setEvent((prev) => ({
                                ...prev,
                                description: e.target.value,
                            }))
                        }

                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="DJId">Choose DJ</label>
                    <select
                        id="DJId"
                        value={event.DJId || ""}
                        onChange={(evt) => {
                            const { id, value } = evt.target
                            const selectedDJ = DJs.find((dj) => dj.id === parseInt(value)) // Find the selected DJ
                            const cost = selectedDJ ? selectedDJ.rate : 0 // Get the cost of the selected DJ

                            setEvent((prevEvent) => ({
                                ...prevEvent,
                                [id]: value, // Update the selected DJ ID
                                totalCost: cost // Update the total cost
                            }))
                        }}
                        className="form-control"
                        required
                    >
                        <option value="">Select Your DJ...</option>
                        {DJs.map((dj) => (
                            <option key={dj.id} value={dj.id}>
                                {dj.user?.id} - ${dj.rate}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label>Event Hours</label>
                    <input
                        type="number"
                        value={event?.hours}
                        className="form-control"
                        placeholder="# of hours"
                        onChange={(e) =>
                            setEvent((prev) => ({
                                ...prev,
                                hours: e.target.value,
                            }))
                        }

                    />
                </div>
            </fieldset>


            <fieldset>
                <div className="form-group">
                    <label htmlFor="DJId">Choose Event Type</label>
                    <select
                        id="eventTypeId"
                        value={event.eventTypeId || ""}
                        onChange={(evt) => {
                            const { id, value } = evt.target
                            setEvent((prevEvent) => ({
                                ...prevEvent,
                                [id]: value
                            }))
                        }}
                        className="form-control"
                        required
                    >
                        <option value="">Select Your Event Type...</option>

                        {eventTypes.map((type) => ( // for type of eventTypes 
                            <option key={type.id} value={type.id}>
                                {type?.name}
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
                        onChange={(evt) => {
                            const { id, value } = evt.target
                            setEvent((prevEvent) => ({
                                ...prevEvent,
                                [id]: value
                            }))
                        }}
                        className="form-control"
                        required
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label>Total Cost</label>
                    <div className="form-group">
                        ${(event.totalCost * event.hours) || 0}
                    </div>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <button
                        className="cyber-btn"
                        onClick={handleSave}
                    >
                        Submit Event
                    </button>
                </div>
            </fieldset>
        </form>
    )
}
