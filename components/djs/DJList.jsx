import { useEffect, useState } from "react"
import "./DJList.css"
import { getDjUsers } from "../services/userServices.jsx"
import { getAllDJsByUserId } from "../services/djServices.jsx"
import { DjCard } from "./djCard.jsx"

export const DJList = ({ DJObj, currentUser }) => {


    return (
        <article className="djs-wrapper">
            <h2>List of Active DJs in Town</h2>
            < DjCard
                classname="dj-section"
                currentUser={currentUser}
                DJObj={DJObj} />
        </article>
    )
}