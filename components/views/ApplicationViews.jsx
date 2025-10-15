import { useState, useEffect } from "react"
import { CustomerViews } from "./CustomerViews.jsx"
import { DJViews } from "./DJViews.jsx"

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const localSpinPlanUser = localStorage.getItem("spin_plan_user")
    if (localSpinPlanUser) {
      try {
        setCurrentUser(JSON.parse(localSpinPlanUser))
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error)
        setCurrentUser(null)
      }
    }
  }, [])

  if (!currentUser) {
    return <div>Loading...</div>
  }

  return currentUser.isDj ? (
    <DJViews currentUser={currentUser} />
  ) : (
    <CustomerViews currentUser={currentUser} />
  )
}
