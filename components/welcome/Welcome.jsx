import { useNavigate } from "react-router-dom"
import "./welcome.css"

export const Welcome = () => {

    const navigate = useNavigate()

    return (
        <div className="welcome-container">
            <h1>
                <span>Welcome to</span>
                <span>Spin Plan</span>
            </h1>
            <div>Your one-stop-shop to find the perfect DJ for your event</div>
            <div
                className="btn-primary">
                <button onClick={() => navigate("/event-form")}>
                    Start Creating Your Event
                </button>
            </div>
        </div>
    )
}