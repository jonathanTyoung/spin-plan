import { Outlet, Route, Routes } from "react-router-dom"
// import { NavBar } from "../components/nav/NavBar"
import { Welcome } from "../welcome/welcome.jsx"


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
                <Route path="tickets">
                    <Route index element={<EventList currentUser={currentUser} />} />
                    <Route path="create" 
                    element={<TicketForm currentUser={currentUser} />} 
                    />
                </Route>
        </Route>
    </Routes >
    )
}