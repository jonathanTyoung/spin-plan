import { useEffect, useState } from "react"
import "./DJList.css"
import { getDjUsers } from "../services/userServices.jsx"
import { getAllDJsByUserId } from "../services/djServices.jsx"
import { DjCard } from "./djCard.jsx"

export const DJList = ({ DJObj, currentUser }) => {


    return (
        <article>
            <h2>DJs</h2>
            < DjCard
                currentUser={currentUser}
                DJObj={DJObj} />
        </article>
    )
}