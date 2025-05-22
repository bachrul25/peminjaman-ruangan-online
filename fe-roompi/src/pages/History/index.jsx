import React from 'react';
import { FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import NavBar from '../../components/NavBar';
import Footer from "../../components/Footer";

const sessionTimeMap = {
  'Sesi 1': { start: '09:00', end: '12:00' },
  'Sesi 2': { start: '13:00', end: '16:00' },
  'Sesi 3': { start: '17:00', end: '20:00' },
};

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
    <div className="w-full min-h-screen bg-white">
      <NavBar />

      <div className="flex flex-col items-center sm:items-start text-center sm:text-start mt-6 mb-52 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-[160px]">
        <h2 className="text-2xl md:text-3xl hind-madurai-bold primary mb-2">
          Transaction history
        </h2>
        <div className="w-full border-b-2 border-[#008B9A] mb-6"></div>

        {transactions.map((trx, index) => {
          const session = sessionTimeMap[trx.session];
          const startTime = new Date(`${trx.bookingDate}T${session.start}`);
          const endTime = new Date(`${trx.bookingDate}T${session.end}`);
          const checkInAvailable = new Date(startTime.getTime() - 30 * 60000);

          const isCheckInEnabled = now >= checkInAvailable && now <= endTime;
          const isCheckOutEnabled = now >= startTime && now <= endTime;

          return (
            <div
              key={index}
              className="flex flex-col sm:flex-row border border-gray-300 rounded-xl px-6 sm:px-10 md:px-16 py-6 sm:py-8 mb-6 shadow-sm bg-white w-full gap-6 sm:gap-0"
            >
              {/* Konten Deskripsi */}
              <div className='w-full sm:w-3/4'>
                <p className="hind-madurai-bold primary mb-1 text-lg md:text-xl">
                  {trx.roomName}
                </p>
                <p className="text-base md:text-lg grey mb-1 break-words hind-madurai-regular">
                  {trx.address}
                </p>
                <div className="flex items-center text-base md:text-lg grey mb-4 hind-madurai-regular justify-center sm:justify-start flex-wrap">
                  <FaClock className="mr-2 primary" />
                  {`${trx.bookingDate}, ${trx.session} (${session.start} - ${session.end})`}
                </div>
              </div>

              {/* Tombol Check In / Out */}
              <div className="w-full sm:w-1/4 flex flex-col justify-center items-center sm:items-end gap-3">
                <button
                  disabled={!isCheckInEnabled}
                  className={`${
                    isCheckInEnabled
                      ? 'bg-primary hover:bg-[#006f7d] hover:shadow-md cursor-pointer'
                      : 'bg-secondary cursor-not-allowed'
                  } text-white hind-madurai-bold text-base md:text-lg px-4 py-2 rounded transition duration-300 w-full sm:w-auto`}
                >
                  CHECK IN
                </button>
                <button
                  disabled={!isCheckOutEnabled}
                  className={`${
                    isCheckOutEnabled
                      ? 'bg-primary hover:bg-[#006f7d] hover:shadow-md cursor-pointer'
                      : 'bg-secondary cursor-not-allowed'
                  } text-white hind-madurai-bold text-base md:text-lg px-4 py-2 rounded transition duration-300 w-full sm:w-auto`}
                >
                  CHECK OUT
                </button>
              </div>
            </div>
          );
        })}
      </div>


      <Footer />
    </div>
  );
};

export default History;
