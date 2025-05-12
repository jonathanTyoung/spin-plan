import { useEffect, useState } from "react"
import { getAllEvents } from "../../services/EventService"
import "./Events.css"
import { Event } from "./Event"

export const UpcomingEvents = ({ currentUser }) => {
  const [allEvents, setAllEvents] = useState([])
  const [showEmergencyOnly, setShowEmergencyOnly] = useState(false)
  const [showOpenOnly, setShowOpenOnly] = useState(false)
  const [filteredEvents, setFilteredEvents] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  const getAndSetEvents = () => {
    getAllEvents().then((eventsArray) => {
      if (currentUser.isStaff) {
        setAllEvents(eventsArray);
      } else {
        const customerEvents = eventsArray.filter(
          (ticket) => ticket.userId === currentUser.id
        );
        setAllEvents(customerEvents);
      }
    });
  };

  useEffect(() => {
    getAndSetEvents()
  }, [currentUser]) // ONLY runs on the initial render of the component 


  useEffect(() => {
    if (showEmergencyOnly) {
      const emergencyEvents = allEvents.filter(
        ticket => ticket.emergency === true
      )
      setFilteredEvents(emergencyEvents)
    } else {
      setFilteredEvents(allEvents)
    }
  }, [showEmergencyOnly, allEvents]) // runs on the initial render AND when the useEffect changes 

  useEffect(() => {
    const foundEvents = allEvents.filter(
      ticket => ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredEvents(foundEvents)
  }, [searchTerm, allEvents]) // runs on the initial render AND when the useEffect changes 

  useEffect(() => {
    if (showOpenOnly) {
      const openEvents = allEvents.filter((ticket) => ticket.dateCompleted === ""
      )
      setFilteredEvents(openEvents)
    } else {
      setFilteredEvents(allEvents)
    }
  }, [showOpenOnly, allEvents])

  return (
    <div className="events-container">
      <h2>Events</h2>
      <TicketFilterBar
        setShowEmergencyOnly={setShowEmergencyOnly}
        setShowOpenOnly={setShowOpenOnly}
        setSearchTerm={setSearchTerm}
        currentUser={currentUser} />
      <article className="events">
        {filteredEvents.map((ticketObj) => {
          return (
            <Ticket
              ticket={ticketObj}
              currentUser={currentUser}
              getAndSetEvents={getAndSetEvents}
              key={ticketObj.id} />
          )
        })}
      </article>
    </div>
  )
}