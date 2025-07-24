export const getEachAddOn = () => {
    return fetch(`https://spin-plan-6.onrender.com/addOn`).then((res) => res.json())
}