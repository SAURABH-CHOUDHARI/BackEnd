import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "../Views/Register";
import Login from "../Views/Login";
import Protected from "../components/Protected";
import Home from "../Views/Home";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Protected><Home /></Protected>} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                
            </Routes>
        </Router>
    );
};

export default AppRoutes;
