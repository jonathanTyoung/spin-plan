import { Link, useNavigate, useParams } from "react-router-dom"
import "./NavBar.css"
import { useState } from "react";

export const DJNav = ({ currentUser }) => {
  const [open, setOpen] = useState(false);
  // const [ djd ] = useParams()
  const navigate = useNavigate()

  return (
    <nav className="navbar">
      <button className="hamburger" onClick={() => setOpen(!open)}>
        ☰
      </button>

      <section className={`nav-list ${open ? "open" : ""}`}>
        <div className="cyber-btn">
          <Link to="/">
            <span className="cyber-glitch">Home</span>
            <span>Home</span>
          </Link>
        </div>
        <div className="cyber-btn">
          <Link to="/event-form">
            <span className="cyber-glitch">Create Event</span>
            <span>Create Event</span>
          </Link>
        </div>
        <div className="cyber-btn">
          <Link to="/upcoming-events">
            <span className="cyber-glitch">Upcoming Events</span>
            <span>Upcoming Events</span>
          </Link>
        </div>
        <div className="cyber-btn">
          <Link to="/DJs">
            <span className="cyber-glitch">DJs</span>
            <span>DJs</span>
          </Link>
        </div>
        <div className="cyber-btn">
          <Link to="/add-on-list">
            <span className="cyber-glitch">Additional Packages</span>
            <span>Additional Packages</span>
          </Link>
        </div>
        <div className="cyber-btn">
          <Link to={`/profile`}>
            <span className="cyber-glitch">Profile</span>
            <span>Profile</span>
          </Link>
        </div>

        {localStorage.getItem("spin_plan_user") && (
          <div className="cyber-btn">
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
          </div>
        )}
      </section>
    </nav>
  );
};
