import React from 'react';
import { Link } from 'react-router';
import NavBar from '../../components/NavBar';

const BookingConfirmation = () => {
  return (
	<>
     <NavBar />
     <div className="max-w-3xl mx-auto p-6 font-sans">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Great! Your room has been successfully booked.
        </h1>
        <p className="text-lg text-gray-600">
          Thank you for booking a room at ROOMP!
          <br />
          Please check your email for proof of order confirmation.
        </p>
      </div>

      {/* Back to Home Link */}
      <div className="border-t border-b border-gray-200 py-4 mb-8">
        <Link to="/" 
          className="text-blue-600 hover:text-blue-800 font-medium text-lg"
        >
          BACK TO HOME
        </Link>
      </div>

      {/* Support Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Support</h2>
        <div className="grid grid-cols-3 gap-4">
          {/* Column 1 */}
          <div>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-600 hover:text-gray-800">Help Center</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-gray-800">Safety Information</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-gray-800">Cancellation options</Link></li>
            </ul>
          </div>
          
          {/* Column 2 */}
          <div>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-600 hover:text-gray-800">About us</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-gray-800">Privacy policy</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-gray-800">Community Blog</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-gray-800">Terms of service</Link></li>
            </ul>
          </div>
          
          {/* Column 3 */}
          <div>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-600 hover:text-gray-800">FAQ</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-gray-800">Get in touch</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-gray-800">Partnerships</Link></li>
            </ul>
          </div>
        </div>
      </div>
         <Footer />
    </div>

	</>
  );
};

export default BookingConfirmation;