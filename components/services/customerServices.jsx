export const getCustomerByUserId = (userId) => {
    return fetch(
        `https://spin-plan-6.onrender.com/customers?userId=${userId}&_expand=user`
    ).then((response) => response.json())
}