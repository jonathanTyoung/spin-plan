import { useState, useEffect } from "react"
import { CustomerViews } from "./CustomerViews.jsx"
import { DJViews } from "./DJViews.jsx"

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    const localSpinPlanUser = localStorage.getItem("spin_plan_user")
    const SpinPlanUserObject = JSON.parse(localSpinPlanUser)

    setCurrentUser(SpinPlanUserObject)
  }, [])


return ( currentUser.isDJ ? (
  <DJViews currentUser={currentUser} /> 
) : ( 
  <CustomerViews currentUser={currentUser} />
))
}