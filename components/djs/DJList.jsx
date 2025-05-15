import { useEffect, useState } from "react"
import { getAllDJsByUserId } from "../services/djServices.jsx"
import "./DJList.css"

export const DJList = () => {
    const [allDJs, setAllDJs] = useState([])

    useEffect(() => {
        getAllDJsByUserId().then((DJsArray) => {
            console.log("DJsArray:", DJsArray)
            setAllDJs(DJsArray)
        })
    }, [])

    return (
        <article className="DJs-container">
            {allDJs.map((DJObj) => (
                <section
                    className="DJ-section"
                    key={DJObj.id}
                    DJ={DJObj}
                >
                    <header className="DJ-info">Event: {DJObj.user?.name}</header>
                    <div>
                        <div className="DJ-info">Rate:</div>
                        <div>{DJObj.cost}</div>
                    </div>
                </section>
            ))}
        </article>
    )
}