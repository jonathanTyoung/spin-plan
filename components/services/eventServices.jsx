export const getAllEvents = () => {
    return fetch(`https://spin-plan-6.onrender.com/events`).then((res) =>
        res.json())
}

export const createEvent = (event) => {
    return fetch(`https://spin-plan-6.onrender.com/events`, {
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
    return fetch(`https://spin-plan-6.onrender.com/events/${event.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
    });
};

export const getEventTypes = () => {
    return fetch(`https://spin-plan-6.onrender.com/eventTypes`).then((res) =>
        res.json())
}

export const getAllDJsById = () => {
    return fetch(`https://spin-plan-6.onrender.com/djs?_expand=user`).then((res) =>
        res.json())
}

export const getAllEventsWithDJNameAndEventType = async () => {
    const [events, DJs, users, eventTypes] = await Promise.all([
        fetch('https://spin-plan-6.onrender.com/events').then(res => res.json()),
        fetch('https://spin-plan-6.onrender.com/DJs').then(res => res.json()),
        fetch('https://spin-plan-6.onrender.com/users').then(res => res.json()),
        fetch('https://spin-plan-6.onrender.com/eventTypes').then(res => res.json())
    ]);

    return events?.map(event => {
        const dj = DJs.find(dj => dj.id === Number(event.DJId));
        const user = dj ? users.find(user => user.id === parseInt(dj.userId)) : null;
        const eventType = eventTypes.find(type => type.id === Number(event.eventTypeId));
        return {
            ...event,
            DJName: user ? user?.name : "Unknown DJ",
            eventTypeName: eventType ? eventType.name : "Unknown Event Type"
        };
    });
};


export const getFullEventProfile = (DJId) => {
    return fetch(`https://spin-plan-6.onrender.com/events?DJId=${DJId}&_expand=user&_expand=eventType&_expand=DJ`)
        .then(res => res.json());
};


export const getEventById = (id) => {
    return fetch(`https://spin-plan-6.onrender.com/events/${id}`)
        .then(res => res.json());
};

export const cancelEvent = (eventId) => {
    return fetch(`https://spin-plan-6.onrender.com/events/${eventId}`, {
        method: "DELETE"
    }).then(res => {
        if (!res.ok) throw new Error("Failed to delete event");
        return true;
    });
};


export const getAllEventsAndUsersAndEventTypes = (eventId) => {
    return fetch(`https://spin-plan-6.onrender.com/events?eventId=${eventId}&_expand=user&_expand=eventType`).then((res) =>
        res.json())
}

