import React from 'react';
import '../../assets/css/global.css'; // Import global CSS styles
import './index.css'; // Import component-specific CSS styles
import logo from '../../assets/images/logo.png'; // Import logo image

function NavBar() {
    return (
        <nav className="navbar flex items-center justify-between py-4 bg-white">
            {/* Logo */}
            <div className="flex items-center gap-1 text-teal-700 font-bold text-xl">
                <img
                    src={logo}
                    alt="Logo"
                    className="w-24"
                />
            </div>

            <div className="flex items-center">
                <div className="flex items-center gap-13">
                    {/* Navigation Links */}
                    <a href="#" className="primary hind-madurai-regular">Home</a>
                    <a href="#" className="text-black hind-madurai-regular">Rooms</a>
                    <a href="#" className="text-black hind-madurai-regular">Contact</a>

                    {/* Vertical Divider + Profile */}
                    <div className="h-6 border-l border-teal-600" />
                    <div className="flex items-center gap-2">
                    <span className="hind-madurai-semibold">Bob Smith</span>
                    <img
                        src="https://i.pravatar.cc/32" // Ganti dengan gambar asli jika ada
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover"
                    />
                    </div>
                </div>

            </div>

        </nav>
    );
}

export default NavBar;