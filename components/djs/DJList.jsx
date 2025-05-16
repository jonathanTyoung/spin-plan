import { useEffect, useState } from "react"
import "./DJList.css"
import { getDjUsers } from "../services/userServices.jsx"
import { getAllDJsByUserId } from "../services/djServices.jsx"

export const DJList = () => {
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
        <article className="DJs-container">
            {allDJs.map((DJObj) => (
                <section className="DJ-section">
                    <div className="DJ-info">Name {DJObj.user.name}</div>
                    <div className="DJ-info">Rate: {formatCurrency(DJObj.cost)}</div>
                    <div className="DJ-info">
                        Sample:{" "}
                        {DJObj.user.sample ? (
                            <a href={DJObj.user.sample} target="_blank" rel="noopener noreferrer">
                                Listen
                            </a>
                        ) : (
                            "No sample available"
                        )}
                    </div>
                </section>
            ))}
        </article>
    )
}