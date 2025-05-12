import { Outlet, Route, Routes } from "react-router-dom"
import { NavBar } from "../nav/NavBar.jsx"
import { Welcome } from "../welcome/Welcome.jsx"
import { EventList } from "../eventList/EventList.jsx"
import { EventForm } from "../forms/EventForm.jsx"

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
                <Route path="CreateEvent" element={<EventForm currentUser={currentUser} />} />
            </Route>
        </Routes >
    )
}