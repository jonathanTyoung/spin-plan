import { useState, useEffect } from 'react';
import './VinylButton.css'; // Assuming you'll create this CSS file
import { useNavigate } from 'react-router-dom';

export const VinylButton = ({ onCreateEvent }) => {

  const navigate = useNavigate()

  // Generate vinyl grooves on component mount
  useEffect(() => {
    const groovesContainer = document.getElementById('grooves');
    const grooveCount = 15;

    // Clear existing grooves first (important for React)
    if (groovesContainer) {
      groovesContainer.innerHTML = '';

      for (let i = 0; i < grooveCount; i++) {
        const groove = document.createElement('div');
        groove.className = 'groove';
        const size = 60 + (i * 8);
        groove.style.width = size + '%';
        groove.style.height = size + '%';
        groove.style.top = (100 - size) / 2 + '%';
        groove.style.left = (100 - size) / 2 + '%';
        groovesContainer.appendChild(groove);
        const colors = ['#FBD0A6', '#F37022', '#B11016', '#2ABA9E', '#007096']; //added later on
        groove.style.border = `2px solid ${colors[i % colors.length]}`;

      }
    }
  }, []);

  // Handle click on vinyl
  const handleVinylClick = () => {
    if (onCreateEvent) {
      onCreateEvent();
    }
    // If no callback provided, you could add default navigation here
    // Example: window.location.href = '/create-event';
  };

  return (
    <div className="welcome-container">
      <h1>Welcome to Spin Plan</h1>

      <div className="vinyl-container" onClick={handleVinylClick}>
        <div className="vinyl-record">
          <div className="vinyl-grooves" id="grooves"></div>
        </div>
        <div className="center-label" onClick={() => navigate("/event-form")}>CREATE EVENT</div>
        <div className="glow-effect"></div>
        <div className="start-text">Click to start creating your event!</div>
      </div>
    </div>
  );
};

export default VinylButton;