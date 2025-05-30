import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import '../../assets/css/global.css';
import logo from '../../assets/images/logo.png';
import { FiMenu, FiX } from 'react-icons/fi';

function NavBar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Cek apakah ada data user di localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Rooms', path: '/rooms' },
    { name: 'History', path: '/history' },
  ];

  return (
    <nav className="navbar sticky top-0 z-50 bg-white px-4 sm:px-6 md:px-10 lg:px-[160px] py-4 shadow-md">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="w-20 sm:w-24" />
        </Link>

        {/* Hamburger for Mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          <ul className="flex gap-10">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`text-lg hind-madurai-regular ${
                    location.pathname === item.path
                      ? 'primary'
                      : 'text-black hover:text-teal-600'
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="h-6 border-l border-teal-600" />
          <Link
            to={user ? '/profile' : '/login'}
            className="flex items-center gap-2"
          >
            <span className="hind-madurai-semibold">
              {user ? user.name : 'Login'}
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-base ${
                location.pathname === item.path
                  ? 'primary'
                  : 'text-black hover:text-teal-600'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <hr className="border-gray-200" />
          <Link
            to={user ? '/profile' : '/login'}
            className="flex items-center gap-2"
            onClick={() => setIsOpen(false)}
          >
            <span className="hind-madurai-semibold">
              {user ? user.name : 'Login'}
            </span>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
