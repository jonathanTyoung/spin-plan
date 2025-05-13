import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import { createEvent, getEventTypes, getAllDJsById } from "../services/EventServices.jsx"


export const Events = ({ order, employees }) => {
  const [allEvents, setAllEvents] = useState([]);


useEffect(() => {
    GetAllEvents()
        .then((allEvents) => {
            setAllEvents(allEvents);
        })
        .catch((error) => {
            console.error("Error fetching all events:", error);
        });
}, []); // Empty dependency array ensures this runs only on mount



    return (
        <section className="event">
            <Link to={`/list/${event.id}`}>
                <header className="event-info">Event #{event.id}</header>
                <div>{event.eventStatus}</div>
                <footer>
                    <div>
                        <div className="event-info">DJ Name</div>
                        <div>{event.customerName}</div>
                    </div>
                    <div>
                        <div className="event-info">Customer Number</div>
                        <div>{event.customerPhone}</div>
                    </div>
                </footer>
            </Link>
        </section>
    )
}
