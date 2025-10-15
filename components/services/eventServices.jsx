// src/api/eventService.js
const API_URL = import.meta.env.VITE_API_URL;

// 🧰 Helper function for fetch calls
const apiFetch = async (endpoint, options = {}) => {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, options);
    if (!res.ok) {
      throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error(`API error on ${endpoint}:`, error);
    throw error;
  }
};

// 🎟️ Events
export const getAllEvents = () => apiFetch(`/events`);

export const createEvent = (event) =>
  apiFetch(`/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });

export const updateEvent = (event) =>
  apiFetch(`/events/${event.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });

export const getEventById = (id) => apiFetch(`/events/${id}`);

export const cancelEvent = async (eventId) => {
  const res = await fetch(`${API_URL}/events/${eventId}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete event");
  return true;
};

// 🧩 Event Types
export const getEventTypes = () => apiFetch(`/eventTypes`);

// 🎧 DJs and related data
export const getAllDJsById = () => apiFetch(`/djs?_expand=user`);

export const getFullEventProfile = (djId) =>
  apiFetch(`/events?DJId=${djId}&_expand=user&_expand=eventType&_expand=dj`);

export const getAllEventsWithDJNameAndEventType = async () => {
  const [events, DJs, users, eventTypes] = await Promise.all([
    apiFetch(`/events`),
    apiFetch(`/djs`),
    apiFetch(`/users`),
    apiFetch(`/eventTypes`),
  ]);

  return events.map((event) => {
    const dj = DJs.find((dj) => dj.id === Number(event.DJId));
    const user = dj ? users.find((user) => user.id === parseInt(dj.userId)) : null;
    const eventType = eventTypes.find((type) => type.id === Number(event.eventTypeId));

    return {
      ...event,
      DJName: user ? user.name : "Unknown DJ",
      eventTypeName: eventType ? eventType.name : "Unknown Event Type",
    };
  });
};

export const getAllEventsAndUsersAndEventTypes = (eventId) =>
  apiFetch(`/events?eventId=${eventId}&_expand=user&_expand=eventType`);
