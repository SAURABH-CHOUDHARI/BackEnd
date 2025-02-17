import './Register.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Dock from '../../componets/ui/Dock'


const Register = () => {


    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const Navigate = useNavigate()



    function handleSubmit(e) {
        e.preventDefault()

        axios.post('http://localhost:3000/users/register', {
            username,
            email,
            password
        })
            .then(res => {
                const data = res.data
                localStorage.setItem('token', data.token)
                Navigate('/profile')
            })
            .catch(err => {
                if (err.response.data?.message) {
                    setError(err.response.data.message)
                }
            })

    }
    const items = [
        { label: 'Login', onClick: () => Navigate("/login") },
    ];

    return (
        <main>
            <section>
                <form onSubmit={handleSubmit} >
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input onChange={e => setUsername(e.target.value)} value={username} id='username' type="text" placeholder='Enter username' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input value={email} onChange={e => setEmail(e.target.value)} id='email' type="email" placeholder='Enter email' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input value={password} onChange={e => setPassword(e.target.value)} id='password' type="password" placeholder='Enter password' />
                    </div>
                    <button type='submit'>Register</button>
                </form>

                {error && <div className="error">{error}</div>}

            </section>
            <Dock
                items={items}
                panelHeight={68}
                baseItemSize={50}
                magnification={70}
            />
        </main>
    )
}

export default Register