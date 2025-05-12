import { useEffect, useState } from "react"
import { getAllEmployees } from "../../services/EmployeeService.jsx"
import { assignEvent, updateEvent, deleteEvent } from "../../services/EventService.jsx"
// import { getEmployeeById } from "../../services/EventService.jsx"

export const Event = ({ event, currentUser, getAndSetEvents }) => {
    const [DJs, setDJs] = useState([])
    const [assignedDJ, setAssignedDJ] = useState({})

    useEffect(() => {
        getAllDJs().then((dJsArray) => {
            setDJs(dJsArray)
        })
    }, [])

    useEffect(() => {
        const foundDJ = dJs.find(
            dJ => dJ.id === event.dJEvents[0]?.dJId
        )
        setAssignedDJ(foundDJ)
    }, [dJs, event])

    const handleClaim = () => {
        const currentDJ = dJs.find(dJ => dJ.userId === currentUser.id)

        const newDJEvent = {
            dJId: currentDJ.id,
            serviceEventId: event.id
        }

        assignEvent(newDJEvent).then(() => {
            getAndSetEvents()
        })
    }

    const handleClose = () => {
        const closeEvent = {
            id: event.id,
            userId: event.userId,
            description: event.description,
            emergency: event.emergency,
            dateCompleted: new Date()
        }
        updateEvent(closeEvent).then(() => {
            getAndSetEvents()
        })
    }
    const handleDelete = () => {
        deleteEvent(event.id).then(() => {
            getAndSetEvents()
        })
    }

    return (
        <section className="event">
            <header className="eventInfo">#{event.id}</header>
            <div>{event.description}</div>
            <footer>
                <div>
                    <div className="event-info">assignee</div>
                    <div>
                        {assignedDJ ? assignedDJ.user?.fullName : "None"}
                    </div>
                </div>
                <div>
                    <div className="event-info">Emergency</div>
                    <div>{event.emergency ? "yes" : "no"}</div>
                </div>
                <div className="btn-container">
                    {/* if the logged in user is an dJ and there's no dJ event associated with the service event,
                     then a button to claim the event should display */}
                    {currentUser.isStaff && !assignedDJ ? (
                        <button className="btn btn-secondary" onClick={handleClaim}>
                            Claim
                        </button>
                    ) : (
                        ""
                    )}
                    {/* if the logged in user is the assigned dJ for the event and there is no dateCompleted,
                    the button to close the event should display */}
                    {assignedDJ?.userId === currentUser.id && !event.dateCompleted ? (
                        <button className="btn btn-warning" onClick={handleClose}>
                            Close
                        </button>
                    ) : (
                        ""
                    )}
                    {/*if the user is a customer and there is no date completed then they can have the option to delete their ticket*/}
                    {!currentUser?.isStaff && (<button className="btn btn-warning" onClick={handleDelete}>Delete</button>
                    )}
                </div>
            </footer>
        </section>
    )
}