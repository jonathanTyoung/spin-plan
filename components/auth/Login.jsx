import { useState, React } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import { getUserByEmail } from "../services/userServices.jsx"

export const Login = () => {
    const [email, set] = useState("dj1@musicflow.com")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        getUserByEmail(email).then((foundUsers) => {
            if (foundUsers.length === 1) {
                const user = foundUsers[0]
                localStorage.setItem(
                    "spin_plan_user",
                    JSON.stringify({
                        id: user.id,
                        isDj: user.isDj,
                    })
                )
                if (user.isDj) {
                    navigate("/profile")
                } else {
                    navigate("/")
                }
                } else {
                    window.alert("Invalid login")
                }
            })
    }

    return (
        <main className="container-login">
            <section>
                <form className="form-login" onSubmit={handleLogin}>
                    <h2>Spin Plan</h2>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <div className="form-group">
                            <input
                                type="email"
                                value={email}
                                onChange={(evt) => set(evt.target.value)}
                                className="form-control"
                                placeholder="Email address"
                                required
                                autoFocus
                            />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <button className="cyber-btn" type="submit">
                                Sign in
                            </button>
                        </div>
                    </fieldset>
                </form>
            </section>
            <section>
                <Link to="/register">Not a member yet?</Link>
            </section>
        </main>
    )
}