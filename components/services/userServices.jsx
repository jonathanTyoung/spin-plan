export const getAllUsers = () => {
    return fetch(`https://spin-plan-6.onrender.com/users`)
        .then((res) => res.json())
}

export const getUserByEmail = (email) => {
    return fetch(`https://spin-plan-6.onrender.com/users?email=${email}`)
        .then((res) => res.json())
}

export const createUser = (customer) => {
    return fetch("https://spin-plan-6.onrender.com/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
    }).then((res) => res.json())
}

export const getNonDjUsers = () => {
    return fetch(`https://spin-plan-6.onrender.com/users?isDj=false`).then((res) =>
        res.json()
    )
}
export const getDjUsers = () => {
    return fetch(`https://spin-plan-6.onrender.com/users?isDj=true`).then((res) =>
        res.json()
    )
}

export const getUserById = (id) => {
  return fetch(`https://spin-plan-6.onrender.com/users/${id}`).then((res) => res.json());
};

export const updateUserProfile = (userObj) => {
    return fetch(`https://spin-plan-6.onrender.com/users/${userObj.id}`, {
        method: "PUT", // or "PATCH" for partial updates
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userObj)
    }).then(res => {
        if (!res.ok) {
            throw new Error("Failed to update user profile");
        }
        return res.json();
    });
};
