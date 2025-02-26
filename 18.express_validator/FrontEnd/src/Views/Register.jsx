import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState([]);  // Ensure state is properly initialized as an array
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError([]); // Clear previous errors before sending a new request

        try {
            const response = await axios.post('http://localhost:3000/v1/api/users/register', {
                username,
                email,
                password
            });

            localStorage.setItem("token", response.data.token);
            navigate("/");
        } catch (err) {
            if (err.response && err.response.data.errors) {
                setError(() => err.response.data.errors); // Update state properly
            }
        }

        setUsername('');
        setEmail('');
        setPassword('');
    };

    return (
        <div className='flex flex-col gap-2 items-center justify-center min-h-screen text-zinc-200 bg-black '>
            <form 
                className='flex flex-col gap-4 bg-black border-4 border-zinc-800 border-solid p-4 rounded-lg shadow-lg w-96'
                onSubmit={handleSubmit} // No need to wrap in another function
            >
                <h2 className='text-2xl font-semibold text-center text-zinc-100'>Register</h2>
                <input
                    type='text'
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className='p-3 border-zinc-800 border-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600'
                    minLength={3}
                    maxLength={20}
                    required
                />
                <input
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='p-3 border-zinc-800 border-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600'
                    required
                />
                <input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='p-3 border-4 border-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600'
                    minLength={3}
                    maxLength={20}
                    required
                />
                <button
                    type='submit'
                    className='bg-black border-4 border-zinc-800 text-white font-semibold py-4 px-5 rounded-md hover:bg-blue-500 transition duration-300'
                >
                    Register
                </button>
            </form>

            {/* Render error messages */}
            {error.length > 0 && (
                <ul className='text-red-400 mt-2'>
                    {error.map((err, index) => (
                        <li key={index}>{err.msg}</li> // Add 'key' and return JSX
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Register;
