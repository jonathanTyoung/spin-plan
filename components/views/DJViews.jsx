import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom"
import { Welcome } from "../welcome/Welcome.jsx"
import { EventForm } from "../forms/EventForm.jsx"
import { UpcomingEvents } from "../events/UpcomingEvents.jsx"
import { EventDetails } from "../events/EventDetails.jsx"
import { DJList } from "../djs/djList.jsx"
import { AddOnList } from "../addOn/addOnList.jsx"
import { VinylButton } from "../welcome/VinylButton.jsx"
import { DJProfile } from "../djs/DJProfile.jsx"
import { DJNav } from "../nav/DJNav.jsx"
import { DJDetails } from "../djs/DjDetails.jsx"


export const DJViews = ({ currentUser }) => {
    const navigate = useNavigate()

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <>
                        <DJNav />
                        <Outlet />
                    </>
                }
            >
                <Route index element={<VinylButton />} />
                <Route path="event-form" element={<EventForm currentUser={currentUser} />} />

                <Route path="upcoming-events">
                    <Route index element={<UpcomingEvents currentUser={currentUser} />} />
                    <Route path=":eventId" element={<EventDetails currentUser={currentUser} />} />
                </Route>

                <Route path="DJs">
                    <Route index element={< DJList currentUser={currentUser} />} />
                </Route>

                <Route path="add-on-list">
                    <Route index element={< AddOnList currentUser={currentUser} />} />
                </Route>

                <Route
                    path="profile"
                    element={<Navigate to={`/profile/${currentUser.id}`} replace />}/>
                <Route path="profile/:DJId" element={<DJProfile currentUser={currentUser} />} />
                    <Route path=":userId" element={< DJDetails currentUser={currentUser} />} />
            
            </Route>
        </Routes >
    )
}