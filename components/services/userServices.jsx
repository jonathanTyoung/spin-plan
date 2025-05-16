export const getAllUsers = () => {
    return fetch(`http://localhost:8088/users`)
        .then((res) => res.json())
}

export const getUserByEmail = (email) => {
    return fetch(`http://localhost:8088/users?email=${email}`)
        .then((res) => res.json())
}

export const createUser = (customer) => {
    return fetch("http://localhost:8088/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
    }).then((res) => res.json())
}

export const getNonDjUsers = () => {
    return fetch(`http://localhost:8088/users?isDj=false`).then((res) =>
        res.json()
    )
}
export const getDjUsers = () => {
    return fetch(`http://localhost:8088/users?isDj=true`).then((res) =>
        res.json()
    )
}

