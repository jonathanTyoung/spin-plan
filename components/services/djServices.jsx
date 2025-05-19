
export const getAllDJsByUserId = () => {
    return fetch(`http://localhost:8088/DJs?_expand=user`).then((res) => res.json())
}

export const createDJ = (djData) => {
    return fetch("http://localhost:8088/DJs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(djData),
    }).then((res) => res.json())
}

export const updateDJProfile = (DJId) => {
    return fetch(`http://localhost:8088/DJs?_expand=user`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(DJId),
    })
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


export const getDJById = (DJId) => {
    return fetch(`http://localhost:8088/DJs/${DJId}?_expand=user`)
        .then(res => res.json());
};