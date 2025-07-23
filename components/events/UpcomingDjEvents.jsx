import { useEffect, useState } from "react"
import { getAllEvents, getAllEventsWithDJNameAndEventType } from "../services/EventServices.jsx"
import "./UpcomingEvents.css"
import { Link, useParams } from "react-router-dom"
import { DjEventCard } from "./DjEventCard.jsx"


export const UpcomingDjEvents = ({ currentUser }) => {

  return (
    <article>
      <h2 className="upcoming-events-header">Your Upcoming Events</h2>
      <DjEventCard currentUser={currentUser} />
    </article>

  )
}