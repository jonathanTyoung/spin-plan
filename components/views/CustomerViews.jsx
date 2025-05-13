import { Outlet, Route, Routes } from "react-router-dom"
import { NavBar } from "../nav/NavBar.jsx"
import { Welcome } from "../welcome/Welcome.jsx"
import { EventForm } from "../forms/EventForm.jsx"
import { UpcomingEvents } from "../events/UpcomingEvents.jsx"
import { EventDetails } from "../events/EventDetails.jsx"



export const CustomerViews = ({ currentUser }) => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <>
                        <NavBar />
                        <Outlet />
                    </>
                }
            >
                <Route index element={<Welcome />} />
                <Route path="event-form" element={<EventForm currentUser={currentUser} />} />
                <Route path="upcoming-events" element={<UpcomingEvents currentUser={currentUser} />} />
                <Route path="event-details/:eventId" element={<EventDetails currentUser={currentUser} />} />


            </Route>
        </Routes >
    )
}