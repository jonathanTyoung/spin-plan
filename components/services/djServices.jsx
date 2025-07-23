export const getAllDJsByUserId = () => {
    return fetch(`http://localhost:8088/DJs?_expand=user`).then((res) => res.json())
}

export const createDJ = async (djData) => {
  try {
    const response = await fetch("http://localhost:8088/DJs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(djData),
    })

    if (!response.ok) {
      throw new Error(`Failed to create DJ: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error creating DJ:", error)
    throw error // Let the calling component handle the error
  }
}


export const getDJByUserId = (userId) => {
    return fetch(`http://localhost:8088/DJs?userId=${userId}&_expand=user`, {
        headers: {
            "Cache-Control": "no-cache", // Prevent caching
        },
    })
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
    // 1. Fetch the DJ with all relevant expansions
    const djRes = await fetch(`http://localhost:8088/DJs?userId=${userId}&_expand=user&_expand=experienceLevel&_expand=availabilityType`);
    const djData = await djRes.json();
    const dj = djData[0];

    if (!dj) return null;

    // // 2. Fetch all DjAvailableDays rows for this DJ and expand availableDay
    // const daysRes = await fetch(`http://localhost:8088/DjAvailableDays?DjId=${dj.id}&_expand=availableDay`);
    // const dayLinks = await daysRes.json();

    // // 3. Map to an array of availableDay objects
    // dj.availableDays = dayLinks.map(link => link.availableDay);

    return dj;
};



export const updateDJProfile = (id, editedDj) => {
    return fetch(`http://localhost:8088/djs/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedDj)
    }).then(res => {
        if (!res.ok) {
            throw new Error("Failed to update DJ profile");
        }
        return res.json();
    });
};




export const updateSelectedDays = () => {
    return<></>
}

export const getExperienceLevels = () => {
    return fetch(`http://localhost:8088/experienceLevels`).then((res) => res.json())
}
export const getAvailabilityTypes = () => {
    return fetch(`http://localhost:8088/availabilityTypes`).then((res) => res.json())
}
export const getAvailableDays = () => {
    return fetch(`http://localhost:8088/availableDays`).then((res) => res.json())
}