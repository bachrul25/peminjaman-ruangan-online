import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import NavBar from '../../components/NavBar';

// Simulasi sesi waktu
const sessionTimeMap = {
  'Sesi 1': { start: '09:00', end: '12:00' },
  'Sesi 2': { start: '13:00', end: '16:00' },
  'Sesi 3': { start: '17:00', end: '20:00' },
};

// Dummy data, nanti tinggal ganti dengan dari API
const transactions = [
  {
    roomName: 'Bohe Room',
    address: 'Gedung Graha Pena, Lt. 5, No. 507, Jl. Ahmad Yani No. 88, Surabaya',
    bookingDate: '2025-05-12',
    session: 'Sesi 1',
  },
  {
    roomName: 'Bohe Room',
    address: 'Gedung Graha Pena, Lt. 5, No. 507, Jl. Ahmad Yani No. 88, Surabaya',
    bookingDate: '2025-05-12',
    session: 'Sesi 2',
  },
];

const History = () => {
  const now = new Date();

  return (
    <div className="w-full min-h-screen bg-white text-gray-800 font-sans">
      <NavBar />
      
      <div className="max-w-4xl mx-auto text-start">
        {/* Judul */}
        <h2 className="text-xl md:text-2xl font-semibold text-[#008B9A] mb-2">
          Transaction history
        </h2>
        <div className="w-full border-b-2 border-[#008B9A] mb-6"></div>

        {transactions.map((trx, index) => {
          const session = sessionTimeMap[trx.session];
          const startTime = new Date(`${trx.bookingDate}T${session.start}`);
          const endTime = new Date(`${trx.bookingDate}T${session.end}`);
          const checkInAvailable = new Date(startTime.getTime() - 30 * 60000); // 30 menit sebelum sesi

          const isCheckInEnabled = now >= checkInAvailable && now <= endTime;
          const isCheckOutEnabled = now >= startTime && now <= endTime;

          return (
            <div
              key={index}
              className="border border-gray-300 rounded-md p-4 mb-6 shadow-sm"
            >
              <p className="font-semibold text-gray-900 mb-1">{trx.roomName}</p>
              <p className="text-sm text-gray-700 mb-1">{trx.address}</p>
              <div className="flex items-center text-sm text-gray-600 mb-4">
                <FaMapMarkerAlt className="mr-2 text-[#008B9A]" />
                {`${trx.bookingDate}, ${trx.session} (${session.start} - ${session.end})`}
              </div>
              <div className="flex justify-end gap-2">
                <button
                  disabled={!isCheckInEnabled}
                  className={`${
                    isCheckInEnabled
                      ? 'bg-[#008B9A] hover:bg-[#006f7d]'
                      : 'bg-gray-300 cursor-not-allowed'
                  } text-white font-semibold text-sm px-4 py-2 rounded`}
                >
                  CHECK IN
                </button>
                <button
                  disabled={!isCheckOutEnabled}
                  className={`${
                    isCheckOutEnabled
                      ? 'bg-[#008B9A] hover:bg-[#006f7d]'
                      : 'bg-gray-300 cursor-not-allowed'
                  } text-white font-semibold text-sm px-4 py-2 rounded`}
                >
                  CHECK OUT
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default History;
