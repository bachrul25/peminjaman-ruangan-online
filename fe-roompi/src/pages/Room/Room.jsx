import React from 'react';
import { Link } from 'react-router';
import NavBar from '../../components/NavBar';

const Room = () => {
    return (
        <>
          <NavBar />
         <div className="min-h-screen bg-gray-50">
    
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Back link */}
        <div className="mb-6">
          <a href="#" className="flex items-center text-indigo-600 hover:text-indigo-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Order Summary</span>
          </a>
        </div>

        {/* Room Info */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Bohé Room</h1>
              <div className="flex items-center mb-4">
                <span className="text-yellow-500 mr-1">⭐</span>
                <span className="text-gray-700">4.8</span>
                <span className="mx-2 text-gray-300">|</span>
                <span className="text-gray-700">15 reviews</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start">
              <div className="text-gray-500 mr-3 mt-1">📍</div>
              <div>
                <p className="text-gray-700 font-medium">Gedung Graha Pena, Lt. 5, No. 507</p>
                <p className="text-gray-600">Jl. Ahmad Yani No. 88, Surabaya</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="text-gray-500 mr-3 mt-1">📅</div>
              <div>
                <p className="text-gray-700">Rabu, 12 Mei 2025, Sesi 1 (09.00 - 12.00)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Details */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Detail Transaksi</h2>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-700">1 SESSION BOHÉ ROOM</span>
              <span className="text-gray-800 font-medium">Rp 320.000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">SERVICE FEE</span>
              <span className="text-gray-800 font-medium">Rp 10.000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">TAX</span>
              <span className="text-gray-800 font-medium">Rp 10.000</span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-800 font-bold">TOTAL PAYMENT</span>
              <span className="text-indigo-600 font-bold text-xl">Rp 340.000</span>
            </div>
          </div>

          <h2 className="text-xl font-bold text-gray-800 mb-4">Metode Pembayaran</h2>
          
          <div className="space-y-3">
            <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-indigo-500 cursor-pointer">
              <div className="bg-blue-100 p-2 rounded mr-4">
                <span className="text-blue-800 font-bold">DC</span>
              </div>
              <div>
                <p className="font-medium text-gray-800">Debit Card</p>
                <p className="text-sm text-gray-500">ATM / Transfer bank, ATM bersama, Debit or credit card, Mobile / internet banking</p>
              </div>
            </div>

            <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-indigo-500 cursor-pointer">
              <div className="bg-purple-100 p-2 rounded mr-4">
                <span className="text-purple-800 font-bold">QR</span>
              </div>
              <div>
                <p className="font-medium text-gray-800">QRIS</p>
                <p className="text-sm text-gray-500">ATM / Transfer bank, ATM bersama, Debit or credit card, Mobile / internet banking</p>
              </div>
            </div>

            <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-indigo-500 cursor-pointer">
              <div className="bg-orange-100 p-2 rounded mr-4">
                <span className="text-orange-800 font-bold">SP</span>
              </div>
              <div>
                <p className="font-medium text-gray-800">ShopeePay</p>
                <p className="text-sm text-gray-500">ATM / Transfer bank, ATM bersama, Debit or credit card, Mobile / internet banking</p>
              </div>
            </div>

            <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-indigo-500 cursor-pointer">
              <div className="bg-green-100 p-2 rounded mr-4">
                <span className="text-green-800 font-bold">OV</span>
              </div>
              <div>
                <p className="font-medium text-gray-800">OVO</p>
                <p className="text-sm text-gray-500">ATM / Transfer bank, ATM bersama, Debit or credit card, Mobile / internet banking</p>
              </div>
            </div>
          </div>

          <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold mt-6 hover:bg-indigo-700 transition-colors">
            COMPLETE YOUR PAYMENT
          </button>
        </div>
      </div>

       <Footer />
    </div>
    </>
    );
};

export default Room;