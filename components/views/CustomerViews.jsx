import { Outlet, Route, Routes } from "react-router-dom"
import { Welcome } from "../welcome/Welcome.jsx"
import { EventForm } from "../forms/EventForm.jsx"
import { UpcomingEvents } from "../events/UpcomingEvents.jsx"
import { EventDetails } from "../events/EventDetails.jsx"
import { CustomerNav,  } from "../nav/CustomerNav.jsx"



export const CustomerViews = ({ currentUser }) => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <>
                        <CustomerNav />
                        <Outlet />
                    </>
                }
            >
                <Route index element={<Welcome />} />
                <Route path="event-form" element={<EventForm currentUser={currentUser} />} />
                <Route path="upcoming-events">
                    <Route index element={<UpcomingEvents currentUser={currentUser} />} />
                    <Route path=":eventId" element={<EventDetails currentUser={currentUser} />} />

                </Route>
            </Route>
        </Routes >
    )
}