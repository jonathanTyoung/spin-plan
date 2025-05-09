import { useEffect, useState } from "react"
import { getAllEvents } from "../services/eventServices.js"


export const EventList = () => {
    const [allEvents, setAllEvents] = useState([])
    
    useEffect(() => {
        getAllEvents().then(eventsArray => {
            setAllEvents(eventsArray)
        })
    }, [])


return <></>

}
