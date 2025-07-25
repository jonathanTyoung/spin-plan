export const getAllDJsByUserId = () => {
  return fetch(`https://spin-plan-6.onrender.com/djs?_expand=user`).then(
    (res) => res.json()
  );
};

export const createDJ = async (djData) => {
  try {
    const response = await fetch("https://spin-plan-6.onrender.com/djs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(djData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create DJ: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating DJ:", error);
    throw error; // Let the calling component handle the error
  }
};

export const getDJByUserId = (userId) => {
  return fetch(
    `https://spin-plan-6.onrender.com/djs?userId=${userId}&_expand=user`,
    {
      headers: {
        "Cache-Control": "no-cache", // Prevent caching
      },
    }
  )
    .then((res) => {
      if (!res.ok) {
        if (res.status === 404) return null; // No DJ found
        throw new Error("Failed to fetch DJ");
      }
      return res.json();
    })
    .then((data) => {
      // API returns an array; return the first DJ or null
      return Array.isArray(data) && data.length > 0 ? data[0] : null;
    })
    .catch((error) => {
      console.error("API Error:", error);
      return null; // Return null on error to avoid breaking the component
    });
};

export const getFullDJProfile = async (userId) => {
  const djRes = await fetch(
    //   `https://spin-plan-6.onrender.com/djs?userId=${userId}&_expand=userId&_expand=experienceLevel&_expand=availabilityType`
      `https://spin-plan-6.onrender.com//djs?_expand=user&_expand=experienceLevel&_expand=availabilityType
`
);
  const djData = await djRes.json();
  const dj = djData[0];

  console.log(
    "Fetched DJ object for DJ profiles:",
    JSON.stringify(dj, null, 2)
  ); // <-- Use dj here

  if (!dj) return null;

  return dj;
};

export const updateDJProfile = (id, editedDj) => {
  return fetch(`https://spin-plan-6.onrender.com/djs/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editedDj),
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to update DJ profile");
    }
    return res.json();
  });
};

export const updateSelectedDays = () => {
  return <></>;
};

export const getExperienceLevels = () => {
  return fetch(`https://spin-plan-6.onrender.com/experienceLevels`).then(
    (res) => res.json()
  );
};
export const getAvailabilityTypes = () => {
  return fetch(`https://spin-plan-6.onrender.com/availabilityTypes`).then(
    (res) => res.json()
  );
};
export const getAvailableDays = () => {
  return fetch(`https://spin-plan-6.onrender.com/availableDays`).then((res) =>
    res.json()
  );
};
