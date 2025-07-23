import { useEffect, useState } from "react"
import { getEachAddOn } from "../services/addOnServices.jsx"
import "./addOnList.css"
import { AddOnCard } from "./AddOnCard.jsx"

export const AddOnList = () => {

    return (
        <article className="addOn-container">
            <h2 className="dj-card-header">Additional Packages</h2>
            < AddOnCard />
        </article>
    )
}