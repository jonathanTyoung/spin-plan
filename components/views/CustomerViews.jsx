import { Outlet, Route, Routes } from "react-router-dom"
import { NavBar } from "../nav/NavBar.jsx"
import { Welcome } from "../welcome/Welcome.jsx"
// import { EventList } from "../eventList/EventList.jsx"

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
                {/* <Route path="tickets">
                    <Route index element={<EventList currentUser={currentUser} />} />
                    <Route path="create" 
                    element={<EventForm currentUser={currentUser} />} 
                    />
                </Route> */}
        </Route>
    </Routes >
    )
}