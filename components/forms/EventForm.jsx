import { useState } from "react"
import "./Form.css"
import { useNavigate } from "react-router-dom"
import { createEvent } from "../../services/eventServices.jsx"

export const TicketForm = ({ currentUser }) => {
    const [ticket, setTicket] = useState({ description: "", emergency: false })

    const navigate = useNavigate()

    const handleSave = (event) => {
        event.preventDefault()
        
        if (ticket.description) {
            const newEvent = {
                userId: currentUser.id,
                description: ticket.description,
                emergency: ticket.emergency,
                dateCompleted: ""
            }

            createEvent(newEvent).then(() => {
                navigate(`/tickets`)
            })
        } else {
            window.alert("Please fill out description!")
        }
    }

    return (
        <form>
            <h2>Create New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label>Description</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Brief description of problem"
                        onChange={(event) => {
                            const ticketCopy = { ...ticket }
                            ticketCopy.description = event.target.value
                            setTicket(ticketCopy)
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group" onChange={(event) => {
                    const ticketCopy = { ...ticket }
                    ticketCopy.emergency = event.target.checked
                    setTicket(ticketCopy)
                }}>
                    <label>
                        Emergency:
                        <input type="checkbox"
                        />
                    </label>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <button
                        className="form-btn btn-info"
                        onClick={(handleSave)}
                    >Submit Ticket
                    </button>
                </div>
            </fieldset>
        </form>
    )
}
