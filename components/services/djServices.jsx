
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