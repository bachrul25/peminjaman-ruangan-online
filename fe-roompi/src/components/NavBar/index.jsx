import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/global.css';
import './index.css';
import logo from '../../assets/images/logo.png';

function NavBar() {
    return (
        <nav className="navbar flex items-center justify-between py-4 bg-white">
            {/* Logo */}
            <div className="flex items-center gap-1 text-teal-700 font-bold text-xl">
                <img src={logo} alt="Logo" className="w-24" />
            </div>

            <div className="flex items-center">
                <div className="flex items-center gap-13">
                    {/* Navigation Links */}
                    <Link to="/" className="primary hind-madurai-regular">Home</Link>
                    <Link to="/rooms" className="text-black hind-madurai-regular">Rooms</Link>
                    <Link to="/contact" className="text-black hind-madurai-regular">Contact</Link>

                    {/* Vertical Divider + Profile Link */}
                    <div className="h-6 border-l border-teal-600" />

                    <Link to="/profile" className="flex items-center gap-2">
                        <span className="hind-madurai-semibold">Bob Smith</span>
                        <img
                            src="https://i.pravatar.cc/32"
                            alt="Profile"
                            className="w-8 h-8 rounded-full object-cover"
                        />
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
