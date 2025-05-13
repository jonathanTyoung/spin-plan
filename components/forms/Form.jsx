// export const Form = ({ props }) => {

//     return (
//         <form>
//             <h2>Create New Event</h2>
//             <fieldset>
//                 <div className="form-group">
//                     <label htmlFor="eventTypeId">Choose Event Type</label>
//                     <select
//                         id="eventTypeId"
//                         value={events.eventTypeId}
//                         onChange={handleInputChange}
//                         className="form-control"
//                         required
//                     >
//                         <option value="">Select an event type</option>
//                         {eventTypes.map((type) => (
//                             <option key={type.id} value={type.id}>
//                                 {type.name}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//             </fieldset>
//             <fieldset>
//                 <div className="form-group">
//                     <label>
//                         Emergency:
//                         <input
//                             type="checkbox"
//                             checked={event.emergency}
//                             onChange={(evt) => {
//                                 setEvent((prevEvent) => ({
//                                     ...prevEvent,
//                                     emergency: evt.target.checked
//                                 }))
//                             }}
//                         />
//                     </label>
//                 </div>
//             </fieldset>
//             <fieldset>
//                 <div className="form-group">
//                     <button
//                         className="form-btn btn-info"
//                         onClick={handleSave}
//                     >
//                         Submit Event
//                     </button>
//                 </div>
//             </fieldset>
//         </form>

//     )
// }