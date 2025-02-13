import { BrowserRouter as Router, Route ,Routes} from 'react-router-dom'
import Register from '../views/register/register'


const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<div>Home</div>} />
                <Route path="/register" element={<Register/>} />
            </Routes>
        </Router>
    )
}

export default AppRoutes