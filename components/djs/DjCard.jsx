import { useEffect, useState } from "react"
import { getAllDJsByUserId, getAvailabilityTypes, getExperienceLevels } from "../services/djServices.jsx"

export const DjCard = ({ DJObj, currentUser }) => {
    const [allDJs, setAllDJs] = useState([])
    const [experienceLevels, setExperienceLevels] = useState([])
    const [availabilityTypes, setAvailabilityTypes] = useState([])

    useEffect(() => {
        getAllDJsByUserId().then((DJArray) => {
            console.log("DJArray:", DJArray)
            setAllDJs(DJArray)
        })
    }, [])

    useEffect(() => {
        getExperienceLevels().then((experienceLevelsArray) => {
            console.log("experienceLevelsArray:", experienceLevelsArray)
            setExperienceLevels(experienceLevelsArray)
        })
    }, [])

    useEffect(() => {
        getAvailabilityTypes().then((availabilityTypesArray) => {
            console.log("availabilityTypesArray:", availabilityTypesArray)
            setAvailabilityTypes(availabilityTypesArray)
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
                            <div className="dj-card__label">Bio:</div>
                            <div className="dj-card__value">{DJObj?.bio}</div>
                        </div>
                        <div className="dj-card__row">
                            <div className="dj-card__label">Experience Level:</div>
                            <div className="dj-card__value">
                                {
                                    experienceLevels.find(level => level.id === DJObj.experienceLevelId)?.level
                                    || "Unknown"
                                }
                            </div>
                        </div>

                        <div className="dj-card__row">
                            <div className="dj-card__label">Availability:</div>
                            <div className="dj-card__value">
                                {
                                    availabilityTypes.find(type => type.id === DJObj.availabilityTypeId)?.label
                                    || "Unknown"
                                }
                            </div>
                        </div>

                        <div className="dj-card__row">
                            <div className="dj-card__label">Days Available:</div>
                            <div className="dj-card__value">{DJObj.availableDays}</div>
                        </div>
                        <div className="dj-card__row">
                            <div className="dj-card__label">Rate:</div>
                            <div className="dj-card__value">{DJObj.rate}</div>
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