export const getAllUsers = () => {
    return fetch(`http://localhost:8088/users`)
        .then((res) => res.json())
}
export const getUserByEmail = () => {
    return fetch(`http://localhost:8088/users?email=${email}`)
        .then((res) => res.json())
}
