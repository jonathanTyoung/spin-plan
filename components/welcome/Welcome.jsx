import "./welcome.css"
export const Welcome = () => {
    return (
        <div className="welcome-container">
            <h1>
            <span>Welcome to</span>
            <span>Spin Plan</span>
            </h1>
        <div>Your one-stop-shop to find the perfect DJ for your event</div>
        <div 
        className="btn-primary">
            <button >
                Start Creating Your Event
            </button>
        </div>
        </div>
    )
}