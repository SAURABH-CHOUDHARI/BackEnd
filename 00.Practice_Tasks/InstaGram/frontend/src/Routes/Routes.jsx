import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Register from '../views/register/Register'
import Profile from '../views/profile/Profile'
import Login from '../views/login/Login'
import Feed from '../views/feed/Feed'


const AppRoutes = () => {


    return (
        <>
            <Router>
            <Routes>
                <Route path="/" element={<Feed/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/profile" element={<Profile/>} />
            </Routes>
        </Router>

        </>
    )
}

export default AppRoutes