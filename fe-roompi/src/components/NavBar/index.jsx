import React from 'react';
import { Link, useLocation } from 'react-router';
import '../../assets/css/global.css';
import logo from '../../assets/images/logo.png';

function NavBar() {
    const location = useLocation();

    const navItems = [
        { name: "Home", path: "/" },
        { name: "Rooms", path: "/rooms" },
        { name: "History", path: "/history" },
    ];

    return (
        <nav className="navbar flex items-center sticky top-0 z-50 justify-between py-4 px-[160px] bg-white">
            {/* Logo */}
            <div className="flex items-center gap-1">
                <Link to="/">
                    <img src={logo} alt="Logo" className="w-24" />
                </Link>
            </div>

            <div className="flex items-center">
                <div className="flex items-center gap-13">
                    {/* Navigation Links */}
                    <ul className="flex space-x-13">
                        {navItems.map((item) => (
                        <li key={item.path}>
                            <Link
                            to={item.path}
                            className={`text-lg hind-madurai-regular ${
                                location.pathname === item.path
                                ? "primary"
                                : "text-black hover:primary"
                            }`}
                            >
                            {item.name}
                            </Link>
                        </li>
                        ))}
                    </ul>

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
