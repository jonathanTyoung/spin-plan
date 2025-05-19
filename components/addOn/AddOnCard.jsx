
import { useEffect, useState } from "react"
import { getEachAddOn } from "../services/addOnServices.jsx"
import "./addOnList.css"

export const AddOnCard = () => {
    const [addOn, setAddOn] = useState([])


    useEffect(() => {
        getEachAddOn().then((addOnArray) => {
            setAddOn(addOnArray)
        })
    }, [])


    // Function to format rate as USD
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount)
    }


    return (
        <article className="addOn-container">
            {addOn.map((addOnObj) => (
                <section key={addOnObj.id} className="addOn-section">
                    <div className="addOn-info">{addOnObj.name}</div>
                    <div className="addOn-info">Price: {formatCurrency(addOnObj.cost)}</div>
                    {/* <div className="addOn-info">
                    // image sample of the addOn
                    </div> */}
                </section>
            ))}
        </article>
    )
}