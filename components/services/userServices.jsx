const API_URL = import.meta.env.VITE_API_URL;

// Generic fetch helper
const apiFetch = async (endpoint, options = {}) => {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, options);
    if (!res.ok) throw new Error(`API error: ${res.statusText}`);
    return res.json();
  } catch (error) {
    console.error(`API error on ${endpoint}:`, error);
    throw error;
  }
};

// Users
export const getAllUsers = () => apiFetch("/users");
export const getUserByEmail = (email) => apiFetch(`/users?email=${email}`);
export const createUser = (userObj) =>
  apiFetch("/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userObj),
  });
export const getNonDjUsers = () => apiFetch("/users?isDj=false");
export const getDjUsers = () => apiFetch("/users?isDj=true");
export const getUserById = (id) => apiFetch(`/users/${id}`);
export const updateUserProfile = (userObj) =>
  apiFetch(`/users/${userObj.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userObj),
  });
