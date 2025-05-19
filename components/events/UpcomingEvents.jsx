import { useEffect, useState } from "react"
import { getAllEvents, getAllEventsWithDJNameAndEventType } from "../services/EventServices.jsx"
import "./UpcomingEvents.css"
import { Link, useParams } from "react-router-dom"
import { EventCard } from "./EventCard.jsx"


export const UpcomingEvents = ({ currentUser }) => {

  return (
    <article className="">
      <h2 className="upcoming-events-header">Your Upcoming Events</h2>
      <EventCard currentUser={currentUser} />
    </article>

  )
}