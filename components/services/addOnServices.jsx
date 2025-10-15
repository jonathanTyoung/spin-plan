const API_URL = import.meta.env.VITE_API_URL;

export const getEachAddOn = async () => {
  try {
    const res = await fetch(`${API_URL}/addOn`);
    if (!res.ok) {
      throw new Error(`Failed to fetch add-ons: ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching add-ons:", error);
    throw error;
  }
};
