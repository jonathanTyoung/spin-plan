

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { createDJ, getAvailabilityTypes, getExperienceLevels } from "../services/djServices.jsx"


export const NewDjUser = () => {
  const [storedUser, setStoredUser] = useState(null)
  const [experienceLevels, setExperienceLevels] = useState([])
  const [availabilityTypes, setAvailabilityTypes] = useState([])
  const [djProfile, setDjProfile] = useState({
    id: "",
    userId: "",
    rate: 0,
    bio: "",
    experienceLevelId: "",
    availabilityTypeId: "",
    sample: "",
  })
  const { userId } = useParams()

  const navigate = useNavigate()

  // Load user from localStorage on mount
  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("spin_plan_user"))

    // const newDj = {
    //   userId: storedUser.id,  // <-- this links DJ to the user
    //   rate: djProfile.rate,
    //   bio: djProfile.bio,
    //   experienceLevelId: djProfile.experienceLevelId,
    //   availabilityTypeId: djProfile.availabilityTypeId,
    //   sample: djProfile.sample,
    // }

    if (localUser?.id && localUser.isDj) {
      setStoredUser(localUser)
    } else {
      navigate("/") // fallback
    }
  }, [navigate])

  // Load experience levels for select dropdown
  useEffect(() => {
    getExperienceLevels().then(setExperienceLevels)
  }, [])

  // Load availability types for select dropdown
  useEffect(() => {
    getAvailabilityTypes().then(setAvailabilityTypes)
  }, [])

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setDjProfile((prev) => ({ ...prev, [name]: value }))
  }

  // Handle final Create Profile click
  const handleCreateProfile = (e) => {
    e.preventDefault() // ⛔ Prevents the default form submission

    if (!storedUser) return

    const newDj = {
      ...djProfile,
      userId: storedUser.id,
    }

    createDJ(newDj).then(() => {
      navigate(`/profile`)
    })
  }

  return (
    <form className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Create DJ Profile</h2>

      <input
        type="text"
        name="bio"
        placeholder="Bio"
        value={djProfile.bio}
        onChange={handleChange}
        className="form-control"
      />

      <fieldset>
        <input
          type="number"
          name="rate"
          placeholder="Hourly Rate"
          value={djProfile.rate}
          onChange={handleChange}
          className="form-control"
        />
      </fieldset>

      <fieldset>
        <select
          name="experienceLevelId"  // ✅ Add name
          value={djProfile?.experienceLevelId || ""}
          onChange={handleChange}
          required
          className="form-control"
        >
          <option
            value="">Select Experience Level...</option>
          {experienceLevels.map((level) => (
            <option key={level.id} value={level.id}>
              {level.level}
            </option>
          ))}
        </select>
      </fieldset>

      <fieldset>
        <select
          name="availabilityTypeId"
          value={djProfile?.availabilityTypeId || ""}
          onChange={handleChange}
          required
          className="form-control"
        >
          <option value="">Select Availability...</option>
          {availabilityTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.label}
            </option>
          ))}
        </select>
      </fieldset>

      <fieldset>
        <input
          type="text"
          name="sample"
          placeholder="Sample URL"
          value={djProfile.sample}
          onChange={handleChange}
          className="form-control"
        />
      </fieldset>

      <fieldset>
        <button
          type="button" // ✅ Important: prevents implicit "submit" behavior
          onClick={handleCreateProfile}
          className="bg-cyber-btn"
        >
          Create Profile
        </button>

      </fieldset>
    </form>
  )
}


