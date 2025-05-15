import { useEffect, useState } from "react"
import { getAllEvents, getAllEventsWithDJNameAndEventType } from "../services/EventServices.jsx"
import "./UpcomingEvents.css"
import { Link, useParams } from "react-router-dom"


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
    <article className="cyberpunk">
      <h2 className="upcoming-events-header">Your Upcoming Events</h2>
      {currentUserEvents.map((eventObj) => (
        <section
          className="event-section"
          key={eventObj.id}
          event={eventObj}
        >
          <ol>
          <Link to={`/upcoming-events/${eventObj.id}`}>
          <header className="cyberpunk-select">Event:{eventObj.eventTypeName}</header>
            <div>
              <div className="cyberpunk-select">Description of Event</div>
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
          </Link>
          </ol>
        </section>
      ))}
    </article>
  )
}