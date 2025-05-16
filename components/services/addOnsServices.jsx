export const getAddOns = () => {
    return fetch(`http://localhost:8088/addOns`).then((res) => res.json())
}