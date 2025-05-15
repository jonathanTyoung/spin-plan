import { useEffect } from "react"
import { getAllDJsByUserId } from "../services/djServices.jsx"

export const DJList = () => {
    const [allDJs, setAllDJs] = useState()

    useEffect(() => {
        getAllDJsByUserId().then((DJsArray) => {
            setAllDJs(DJsArray)
        })
    }, [])




    return (
        <article className="DJs-list">
            {allDJs.map((DJObj) => {
                <section
                    className="DJ-section"
                    key={DJObj.id}
                    DJ={DJObj}
                >
                    {/* <Link to={`/event-details/${DJObj.id}`}> */}
                    <header className="DJ-info">Event:{DJObj.user?.name}</header>
                    <div>
                        <div className="DJ-info">Rate:</div>
                        <div>{DJObj.cost}</div>
                    </div>
                    {/* <div>
                        <div className="DJ-info">Link to Sample</div>
                        <div>{DJObj.user.sampleLink}</div>
                    </div> */}
                </section>
            })}
        </article>
    )
}