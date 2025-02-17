import { useState } from "react"
import "./Login.scss"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Dock from '../../componets/ui/Dock'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState('')


    const Navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        setError("") // Clear previous errors
        axios.post("http://localhost:3000/users/login", { email, password })
            .then(res => {
                const data = res.data
                localStorage.setItem('token', data.token)
                Navigate('/')
            })
            .catch(err => {
                if (err.response?.data?.message) {
                    setError(err.response.data.message)
                } else {
                    setError("Something went wrong. Please try again.")
                }
            })
    }
    const items = [
        {  label: 'Register', onClick: () => Navigate("/register") },
    ];

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleLogin} className="input-group">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Login</button>
                </form>
                <p className="register-link">Dont have an account? <a href="/register">Register</a></p>
            </div>
                <Dock
                    items={items}
                    panelHeight={68}
                    baseItemSize={50}
                    magnification={70}
                />
        </div>
    )
}

export default Login
