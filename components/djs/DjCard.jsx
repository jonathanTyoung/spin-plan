import { useEffect, useState } from "react"
import { getAllDJsByUserId } from "../services/djServices.jsx"
import { Link } from "react-router-dom"

export const DjCard = ({ DJObj, currentUser }) => {
    const [allDJs, setAllDJs] = useState([])

    useEffect(() => {
        getAllDJsByUserId().then((DJArray) => {
            console.log("DJArray:", DJArray)
            setAllDJs(DJArray)
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
    <article>
        {allDJs.map((DJObj) => (
            <section key={DJObj.id} className="DJ-section">
                <div className="dj-card">
                        <header className="dj-card__header">Dj: {DJObj.user.name}</header>

                        <div className="dj-card__row">
                            <div className="dj-card__label">Price:</div>
                            <div className="dj-card__value">{DJObj.cost}</div>
                        </div>
                        <div className="DJ-label">
                            Sample:{" "}
                            {DJObj.sample ? (
                                <a href={DJObj.sample} target="_blank" rel="noopener noreferrer">
                                    Listen
                                </a>
                            ) : (
                                "No sample available"
                            )}
                        </div>
                </div>
            </section>
        ))};
    </article>
)
}