import React from 'react';
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
                    <a href="/" className="nav-link primary hind-madurai-regular">Home</a>
                    <a href="/rooms" className="nav-link text-black hind-madurai-regular">Rooms</a>
                    <a href="/history" className="nav-link text-black hind-madurai-regular">History</a>

                    {/* Vertical Divider + Profile Link */}
                    <div className="nav-divider h-6 border-l border-teal-600" />
                    
                    {/* Profile */}
                    <a href="/profile" className="flex items-center gap-2">
                        <span className="hind-madurai-semibold">Bob Smith</span>
                        <img
                            src="https://i.pravatar.cc/32"
                            alt="Profile"
                            className="w-8 h-8 rounded-full object-cover"
                        />
                    </a>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
