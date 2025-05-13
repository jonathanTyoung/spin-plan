import { useEffect, useState } from "react"
import { getAllEvents, getAllEventsWithDJNameAndEventType } from "../services/EventServices.jsx"
import "./UpcomingEvents.css"
import { Link } from "react-router-dom"


export const UpcomingEvents = ({ currentUser }) => {
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
    <article className="event">
      <header className="upcoming-events-header">Your Upcoming Events</header>
      {currentUserEvents.map((eventObj) => (
        <section
          className="event-section"
          key={eventObj.id}
          event={eventObj}
        >
          <Link to={`/event-details/${eventObj.id}`}>
          <header className="event-info">Event:{eventObj.eventType?.name}</header>
          <footer>
            <div>
              <div className="event-info">Description of Event</div>
              <div>{eventObj.description}</div>
            </div>
            <div>
              <div className="event-info">DJ Name</div>
              <div>{eventObj.DJName}</div>
            </div>
            <div>
              <div className="event-info">Total Cost of Event:</div>
              <div>{formatCurrency(eventObj.totalCost)}</div>
            </div>
          </footer>
          </Link>
        </section>
      ))}
    </article>
  )
}