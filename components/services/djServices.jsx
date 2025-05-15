
export const getAllDJsByUserId = () => {
    return fetch(`http://localhost:8088/DJs?_expand=user`).then((res) => res.json())
}


