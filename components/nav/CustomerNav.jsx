import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"
import { useState } from "react";

export const CustomerNav = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()

    return (
        <nav className="navbar">
  <button className="hamburger" onClick={() => setOpen(!open)}>
    ☰
  </button>

  <ul className={`nav-list ${open ? "open" : ""}`}>
    <li className="cyber-btn">
      <Link to="/">
        <span className="cyber-glitch">Home</span>
        <span>Home</span>
      </Link>
    </li>
    <li className="cyber-btn">
      <Link to="/event-form">
        <span className="cyber-glitch">Create Event</span>
        <span>Create Event</span>
      </Link>
    </li>
    <li className="cyber-btn">
      <Link to="/upcoming-events">
        <span className="cyber-glitch">Upcoming Events</span>
        <span>Upcoming Events</span>
      </Link>
    </li>
    <li className="cyber-btn">
      <Link to="/DJs">
        <span className="cyber-glitch">DJs</span>
        <span>DJs</span>
      </Link>
    </li>
    <li className="cyber-btn">
      <Link to="/add-on-list">
        <span className="cyber-glitch">Additional Packages</span>
        <span>Additional Packages</span>
      </Link>
    </li>
    {localStorage.getItem("spin_plan_user") && (
      <li className="cyber-btn">
        <Link
          to="/login"
          onClick={() => {
            localStorage.removeItem("spin_plan_user");
            navigate("/", { replace: true });
          }}
        >
          <span className="cyber-glitch">Logout</span>
          <span>Logout</span>
        </Link>
      </li>
    )}
  </ul>
</nav>
    )
};