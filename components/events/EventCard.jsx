
import { Link } from "react-router-dom";
import "./EventCard.css";
import { getAllEventsWithDJNameAndEventType } from "../services/EventServices.jsx";
import { useEffect, useState } from "react";



export const EventCard = ({ eventObj, currentUser }) => {
  const [allEvents, setAllEvents] = useState([])
  const [currentUserEvents, setCurrentUserEvents] = useState([])

  useEffect(() => {
    getAllEventsWithDJNameAndEventType()
      .then((allEventsArray) => {
        const filteredEvents = allEventsArray.filter(
          (event) => event.userId === currentUser.id
        )
        setCurrentUserEvents(filteredEvents)
      })
      .catch((error) => console.error("Error fetching event types:", error))
  }, [currentUser])

// Function to format rate as USD
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount)
    }



  return (
    <article>
      {currentUserEvents.map((eventObj) => (
        <section
          className="event-section"
          key={eventObj.id}
          event={eventObj}
        >
      <ol className="event-card">
        <Link to={`/upcoming-events/${eventObj.id}`}>
          <header className="event-card__header">Event: {eventObj.eventTypeName}</header>

          <div className="event-card__row">
            <div className="event-card__label">Description:</div>
            <div className="event-card__value">{eventObj.description}</div>
          </div>

          <div className="event-card__row">
            <div className="event-card__label">DJ:</div>
            <div className="event-card__value">{eventObj.DJName}</div>
          </div>

          <div className="event-card__row">
            <div className="event-card__label">Hours Booked</div>
            <div className="event-card__value">{eventObj.hours} Hours</div>
          </div>

          <div className="event-card__row">
            <div className="event-card__label">Date of Event:</div>
            <div className="event-card__value">{eventObj.date}</div>
          </div>

          <div className="event-card__row">
            <div className="event-card__label">Total Cost:</div>
            <div className="event-card__value">{formatCurrency(eventObj.totalCost * eventObj.hours)}</div>
          </div>
        </Link>
      </ol>
    </section>
  ))}
  </article>
  )
}
