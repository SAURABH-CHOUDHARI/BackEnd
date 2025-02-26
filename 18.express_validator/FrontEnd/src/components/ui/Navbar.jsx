import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-black text-white py-4 px-6 flex justify-between items-center shadow-md">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-white">
                MyLogo
            </Link>

            {/* Create Button */}
            <Link to="/create">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
                    Create
                </button>
            </Link>
        </nav>
    );
};

export default Navbar;