import { useEffect, useState } from "react";
import {
  getAllDJsByUserId,
  getAvailabilityTypes,
  getExperienceLevels,
} from "../services/djServices.jsx";
import "./djCard.css";

export const DjCard = ({ DJObj, currentUser }) => {
  const [allDJs, setAllDJs] = useState([]);
  const [experienceLevels, setExperienceLevels] = useState([]);
  const [availabilityTypes, setAvailabilityTypes] = useState([]);

  useEffect(() => {
    getAllDJsByUserId().then((DJArray) => {
      console.log("DJArray:", DJArray);
      DJArray.forEach((dj) => {
        console.log(`DJ userId type of value: ${typeof dj.userId}`); // <-- this will say "string" or "number"
         console.log(typeof dj.experienceLevelId, dj.experienceLevelId);
      });
      setAllDJs(DJArray);
    });
  }, []);

  useEffect(() => {
    getExperienceLevels().then((experienceLevelsArray) => {
      console.log("experienceLevelsArray:", experienceLevelsArray);
      setExperienceLevels(experienceLevelsArray);
    });
  }, []);

  useEffect(() => {
    getAvailabilityTypes().then((availabilityTypesArray) => {
      console.log("availabilityTypesArray:", availabilityTypesArray);
      setAvailabilityTypes(availabilityTypesArray);
    });
  }, []);

  // Function to format rate as USD
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <article className="dj-grid-container">
      {allDJs.map((DJObj) => (
        <section key={DJObj.id} className="dj-card-section">
          <div className="dj-card">
            <header className="dj-card__header">
              🎧 DJ: {DJObj.user?.name}
            </header>

            <div className="dj-card__row">
              <div className="dj-card__label">Bio:</div>
              <div className="dj-card__value">{DJObj?.bio}</div>
            </div>

            <div className="dj-card__row">
              <div className="dj-card__label">Experience Level:</div>
              <div className="dj-card__value">
                {experienceLevels.find(
                  (level) => level.id === DJObj.experienceLevelId
                )?.level || "Unknown"}
              </div>
            </div>

            <div className="dj-card__row">
              <div className="dj-card__label">Availability:</div>
              <div className="dj-card__value">
                {availabilityTypes.find(
                  (type) => type.id === DJObj.availabilityTypeId
                )?.label || "Unknown"}
              </div>
            </div>

            <div className="dj-card__row">
              <div className="dj-card__label">Rate:</div>
              <div className="dj-card__value">
                {formatCurrency(DJObj.rate)}/hour
              </div>
            </div>

            <div className="dj-card__row dj-sample-row">
              {DJObj.sample ? (
                <a
                  className="btn"
                  href={DJObj.sample}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="btn-flip-side btn-flip-side--red">
                    <span>Click Here</span>
                    <span>Listen to Sample</span>
                  </div>
                </a>
              ) : (
                <div className="no-sample">No sample available</div>
              )}
            </div>
          </div>
        </section>
      ))}
    </article>
  );
};
