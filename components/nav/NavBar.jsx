import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return <ul className="navbar">
        <li className="navbar-item">
            <Link to="/">Home</Link>
        </li>
        <li className="navbar-item">
            <Link to="/event-form">Create Event</Link>
        </li>
        <li className="navbar-item">
            <Link to="/upcoming-events">Upcoming Events</Link>
        </li>
        <li className="navbar-item">
            <Link to="/djs">DJs</Link>
        </li>
        {/* <li className="navbar-item">
            <Link to="/profile">Profile</Link>
        </li> */}
        {localStorage.getItem("spin_plan_user") ? (
            <li className="navbar-item navbar-logout">
                <Link
                    className="navbar-link"
                    to="/login"
                    onClick={() => {
                        localStorage.removeItem("spin_plan_user")
                        navigate("/", { replace: true })
                    }}
                >
                    Logout
                </Link>
            </li>
        ) : (
            ""
        )}

    </ul>
}