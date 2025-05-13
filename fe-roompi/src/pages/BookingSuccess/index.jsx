import React from 'react';
import '../../assets/css/global.css';
import Footer from '../../components/Footer';
import { Link } from 'react-router';
import NavBar from '../../components/NavBar';

const BookingSuccess = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Header */}
        <NavBar />
     
      {/* Main Content */}
      <main className="flex flex-col items-center justify-center text-center px-4 py-16">
        <h1 className="text-2xl font-semibold mb-4">Great! Your room has been successfully booked.</h1>
        <p className="text-base text-gray-700 mb-10">
          Please check your Whatsapp for proof of order confirmation<br />
          and payment for your order.
        </p>

        {/* Checkmark Icon */}
        <div className="mb-10">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="50" fill="#008B99" />
            <path
              d="M30 52 L45 67 L70 38"
              stroke="white"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <Link
          to="/"
          className="bg-[#008B99] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#007481] transition"
        >
          BACK TO HOME
        </Link>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default BookingSuccess;
