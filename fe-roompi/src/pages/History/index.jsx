import React, { useEffect, useState } from 'react';
import { FaClock } from 'react-icons/fa';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';

const History = () => {
  const [transactions, setTransactions] = useState([]);

  // Ambil data dari backend Laravel
  useEffect(() => {
    fetch('/api/history', {
      headers: {
        Accept: 'application/json',
      },
      credentials: 'include' // penting jika pakai Sanctum
    })
      .then(response => response.json())
      .then(data => {
        setTransactions(data);
      })
      .catch(error => {
        console.error('Error fetching history:', error);
      });
  }, []);

  const now = new Date();

  return (
    <div className="w-full min-h-screen bg-white">
      <NavBar />

      <div className="flex flex-col items-center sm:items-start text-center sm:text-start mt-6 mb-52 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-[160px]">
        <h2 className="mb-2 text-2xl md:text-3xl hind-madurai-bold primary">
          Transaction history
        </h2>
        <div className="w-full border-b-2 border-[#008B9A] mb-6"></div>

        {transactions.length === 0 ? (
          <p className="text-gray-500">No transactions found.</p>
        ) : (
          transactions.map((trx, index) => {
            const startTime = new Date(`${trx.bookingDate}T${trx.start}`);
            const endTime = new Date(`${trx.bookingDate}T${trx.end}`);
            const checkInAvailable = new Date(startTime.getTime() - 30 * 60000);

            const isCheckInEnabled = now >= checkInAvailable && now <= endTime;
            const isCheckOutEnabled = now >= startTime && now <= endTime;

            return (
              <div
                key={index}
                className="flex flex-col w-full gap-6 px-6 py-6 mb-6 bg-white border border-gray-300 shadow-sm sm:flex-row rounded-xl sm:px-10 md:px-16 sm:py-8 sm:gap-0"
              >
                {/* Konten Deskripsi */}
                <div className='w-full sm:w-3/4'>
                  <p className="mb-1 text-lg hind-madurai-bold primary md:text-xl">
                    {trx.roomName}
                  </p>
                  <p className="mb-1 text-base break-words md:text-lg grey hind-madurai-regular">
                    {trx.address}
                  </p>
                  <div className="flex flex-wrap items-center justify-center mb-4 text-base md:text-lg grey hind-madurai-regular sm:justify-start">
                    <FaClock className="mr-2 primary" />
                    {`${trx.bookingDate}, ${trx.session} (${trx.start} - ${trx.end})`}
                  </div>
                </div>

                {/* Tombol Check In / Out */}
                <div className="flex flex-col items-center justify-center w-full gap-3 sm:w-1/4 sm:items-end">
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
          })
        )}
      </div>

      <Footer />
    </div>
  );
};

export default History;
