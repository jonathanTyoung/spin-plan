export const getAllEvents = () => {
    return fetch(`http://localhost:8088/events`).then((res) =>
        res.json())
}

export const createEvent = (event) => {
    return fetch(`http://localhost:8088/events`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to create event")
            }
            return res.json()
        })
        .catch((error) => {
            console.error("Error creating event:", error)
            throw error
        })
}
export const updateEvent = (event) => {
    return fetch(`http://localhost:8088/events`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
    })
}

export const getEventTypes = () => {
    return fetch(`http://localhost:8088/eventTypes`).then((res) =>
        res.json())
}

export const getAllDJsById = () => {
    return fetch(`http://localhost:8088/DJs/?_expand=user`).then((res) =>
        res.json())
}