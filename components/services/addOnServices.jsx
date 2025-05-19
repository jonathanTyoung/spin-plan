export const getEachAddOn = () => {
    return fetch(`http://localhost:8088/addOn`).then((res) => res.json())
}