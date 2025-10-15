const API_URL = import.meta.env.VITE_API_URL;

export const getCustomerByUserId = async (userId) => {
  try {
    const res = await fetch(`${API_URL}/customers?userId=${userId}&_expand=user`);
    if (!res.ok) {
      throw new Error(`Failed to fetch customer: ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching customer by userId:", error);
    throw error;
  }
};
