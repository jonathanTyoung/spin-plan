import "./EventCard.css";
import { getAllDJsById, getAllEvents, getAllEventsAndUsersAndEventTypes, getEventTypes, getFullEventProfile } from "../services/EventServices.jsx";
import { useEffect, useState } from "react";



export const DjEventCard = ({ currentUser }) => {
  console.log("DjEventCard rendered");
  const [currentDjEvents, setCurrentDjEvents] = useState([])

  useEffect(() => {
    let currentDj = null;

    getAllDJsById()
      .then((allDjs) => {
        console.log("All DJs:", allDjs);
        console.log("Current user ID:", currentUser.id);

        // Find DJ for current user
        currentDj = allDjs.find(dj => dj.userId === currentUser.id);

        if (!currentDj) {
          // No DJ found, clear events and stop
          setCurrentDjEvents([]);
          console.log("No events found yet bro")
          return null;
        }

        // If DJ found, fetch all events
        return getAllEventsAndUsersAndEventTypes();  // you need to define this or replace with your event fetching function
      })
      .then((allEventsArray) => {
        if (!allEventsArray || !currentDj) return;

        // Filter events for this DJ
        const filteredEvents = allEventsArray.filter(
          event => event.DJId.toString() === currentDj.id.toString()
        );

        setCurrentDjEvents(filteredEvents);
      })
      .catch((error) => {
        console.error("Error fetching DJs or events:", error);
        setCurrentDjEvents([]);
      });
  }, [currentUser]);


  // Function to format rate as USD
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  return (
    <article>
      {currentDjEvents.map((event) => (
        <section
          className="event-section"
          key={event.id}
        >
          <ol className="event-card">
            <header className="event-card__header">Event: {event.eventType?.name}</header>

            <div className="event-card__row">
              <div className="event-card__label">Description:</div>
              <div className="event-card__value">{event.description}</div>
            </div>

            <div className="event-card__row">
              <div className="event-card__label">Hours Booked</div>
              <div className="event-card__value">{event.hours} Hours</div>
            </div>

            <div className="event-card__row">
              <div className="event-card__label">Client Name:</div>
              <div className="event-card__value">{event.user?.name}</div>
            </div>
            <div className="event-card__row">
              <div className="event-card__label">Client Email:</div>
              <div className="event-card__value">{event.user?.email}</div>
            </div>


            <div className="event-card__row">
              <div className="event-card__label">Date of Event:</div>
              <div className="event-card__value">{event.date}</div>
            </div>

            <div className="event-card__row">
              <div className="event-card__label">Total Cost:</div>
              <div className="event-card__value">{formatCurrency(event.totalCost * event.hours)}</div>
            </div>
          </ol>
        </section>
      ))}
    </article>
  )
}
