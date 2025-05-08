import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return <ul className="navbar">
        <li className="navbar-item">
            <Link to="/">Home</Link>
        </li>
        <li className="navbar-item">
            <Link to="/Create Event">Create Event</Link>
        </li>
        <li className="navbar-item">
            <Link to="/Upcoming Events">Upcoming Events</Link>
        </li>
        <li className="navbar-item">
            <Link to="/customers">Customers</Link>
        </li>
        <li className="navbar-item">
            <Link to="/profile">Profile</Link>
        </li>
        {localStorage.getItem("honey_user") ? (
            <li className="navbar-item navbar-logout">
                <Link
                    className="navbar-link"
                    to=""
                    onClick={() => {
                        localStorage.removeItem("honey_user")
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