import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Protected = ({children}) => {
    const Navigate = useNavigate();


    useEffect(() => {
        const token = localStorage.getItem("token")
        if(!token){
            Navigate("/login")
        }
    }, []);

    return (
        children
    )
}

export default Protected