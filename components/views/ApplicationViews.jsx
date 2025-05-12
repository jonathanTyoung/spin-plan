import { useState, useEffect } from "react"
// import { EmployeeViews } from "./EmployeeViews.jsx"
import { CustomerViews } from "./CustomerViews.jsx"

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    const localSpinPlanUser = localStorage.getItem("spin_plan_user")
    const SpinPlanUserObject = JSON.parse(localSpinPlanUser)

    setCurrentUser(SpinPlanUserObject)
  }, [])


return (
    <CustomerViews currentUser={currentUser}/>
)
}
//   return currentUser.isDJ ? (
//   <EmployeeViews currentUser={currentUser} /> 
// ) : ( 
//   <CustomerViews currentUser={currentUser} />
// )
// }