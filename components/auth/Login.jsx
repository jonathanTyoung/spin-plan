

// Copied file from Honey Rae's. Please be sure there aren't naming errors.
// Line 66 may or may not be needed (see commented out line)

import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import { getUserByEmail } from "../services/userServices.js"

export const Login = () => {
    const [email, set] = useState("isabella.white@gmail.com")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        getUserByEmail(email).then((foundUsers) => {
            if (foundUsers.length === 1) {
                const employee = foundUsers[0]
                localStorage.setItem(
                    "spin_plan_user",
                    JSON.stringify({
                        id: employee.id,
                        isAdmin: employee.isAdmin,
                    })
                )

                navigate("/")
            } else {
                window.alert("Invalid login")
            }
        })
    }

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <section className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <form className="space-y-6" onSubmit={handleLogin}>
                    <h1 className="text-3xl font-bold text-center text-gray-800">Shepherd's Pie</h1>
                    <h2 className="text-lg text-center text-gray-600">Please sign in</h2>
                    <fieldset>
                        <div className="form-group">
                            <input
                                type="email"
                                value={email}
                                onChange={(evt) => set(evt.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Email address"
                                required
                                autoFocus
                            />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <button
                                className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="submit"
                            >
                                Sign in
                            </button>
                        </div>
                    </fieldset>
                </form>
            </section>
            <section className="mt-4">
                {/* Uncomment if needed */}
                {/* <Link to="/register" className="text-blue-500 hover:underline">
                    Not a member yet?
                </Link> */}
            </section>
        </main>
    );
};