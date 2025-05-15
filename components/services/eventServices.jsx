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
    return fetch(`http://localhost:8088/events/${event.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
    });
};

export const getEventTypes = () => {
    return fetch(`http://localhost:8088/eventTypes`).then((res) =>
        res.json())
}

export const getAllDJsById = () => {
    return fetch(`http://localhost:8088/DJs/?_expand=user`).then((res) =>
        res.json())
}

export const getAllEventsWithDJNameAndEventType = async () => {
    const [events, DJs, users, eventTypes] = await Promise.all([
        fetch('http://localhost:8088/events').then(res => res.json()),
        fetch('http://localhost:8088/DJs').then(res => res.json()),
        fetch('http://localhost:8088/users').then(res => res.json()),
        fetch('http://localhost:8088/eventTypes').then(res => res.json())
    ]);

    return events?.map(event => {
        const dj = DJs.find(dj => dj.id === Number(event.DJId));
        const user = dj ? users.find(user => user.id === parseInt(dj.userId)) : null;
        const eventType = eventTypes.find(type => type.id === Number(event.eventTypeId));
        return {
            ...event,
            DJName: user ? user.name : "Unknown DJ",
            eventTypeName: eventType ? eventType.name : "Unknown Event Type"
        };
    });
};

export const getEventById = (id) => {
    return fetch(`http://localhost:8088/events/${id}`)
        .then(res => res.json());
};

export const cancelEvent = (eventId) => {
    return fetch(`http://localhost:8088/events/${eventId}`, {
        method: "DELETE"
    }).then(res => {
        if (!res.ok) throw new Error("Failed to delete event");
        return true;
    });
};