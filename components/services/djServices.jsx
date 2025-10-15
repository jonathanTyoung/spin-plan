// src/api/djService.js (or wherever your API utils live)
const API_URL = import.meta.env.VITE_API_URL;

// 🧰 Optional helper to reduce repetition
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

// 🎧 DJs
export const getAllDJsByUserId = () => apiFetch(`/djs?_expand=user`);

export const createDJ = (djData) =>
  apiFetch(`/djs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(djData),
  });

export const getDJByUserId = async (userId) => {
  try {
    const data = await apiFetch(`/djs?userId=${userId}&_expand=user`, {
      headers: { "Cache-Control": "no-cache" },
    });
    return Array.isArray(data) && data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error("Error fetching DJ by user ID:", error);
    return null;
  }
};

export const getFullDJProfile = async (userId) => {
  const data = await apiFetch(
    `/djs?userId=${userId}&_expand=user&_expand=experienceLevel&_expand=availabilityType`
  );
  const dj = data?.[0] || null;

  console.log(
    "Fetched DJ object for DJ profiles:",
    JSON.stringify(dj, null, 2)
  );
  return dj;
};

// import { apiFetch } from "./apiFetch.jsx"; // wherever your wrapper is

export const updateDJProfile = (id, editedDj) => {
  return apiFetch(`/djs/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(editedDj),
  });
};


// 🗓️ Static data
export const getExperienceLevels = () => apiFetch(`/experienceLevels`);
export const getAvailabilityTypes = () => apiFetch(`/availabilityTypes`);
export const getAvailableDays = () => apiFetch(`/availableDays`);
