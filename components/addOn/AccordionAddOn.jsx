import { useEffect, useState } from "react"
import { getEachAddOns } from "../services/addOnServices.jsx"

export const AddOnAccordion = () => {
  const [addOn, setAddOn] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedAddOns, setSelectedAddOns] = useState([])

  useEffect(() => {
    getAddOn().then((addOnsArray) => {
      getEachAddOn(addOnsArray)
    })
  }, [addOns])



  const toggleAccordion = () => setIsOpen(!isOpen)

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target
    if (checked) {
      setSelectedAddOn((prev) => [...prev, value])
    } else {
      setSelectedAddOn((prev) => prev.filter((item) => item !== value))
    }
  }


  return (
    <div className="accordion-container">
      <button type="button" className="accordion-toggle" onClick={toggleAccordion}>
        {isOpen ? "Hide Add-Ons ▲" : "Show Add-Ons ▼"}
      </button>

      {isOpen && (
        <div className="accordion-content">
          {addOn.map((addOnObj) => (
            <label key={addOnObj} className="checkbox-label">
              <input
                type="checkbox"
                value={addOnObj}
                checked={selectedAddOns.includes(addOnObj)}
                onChange={handleCheckboxChange}
              />
              {addOnObj}
            </label>
          ))}
        </div>
      )}
    </div>
  )
}