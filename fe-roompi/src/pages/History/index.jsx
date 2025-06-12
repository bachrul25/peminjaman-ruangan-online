import React, { useEffect, useState } from 'react';
import { FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import NavBar from '../../components/NavBar';
import Footer from "../../components/Footer";
import { getLoans } from '../../_services/loans';
import { format, formatDistanceToNow } from 'date-fns';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { checkIn, checkOut, getCheckIn, getCheckOut } from '../../_services/check';

const History = () => {
  // const now = new Date();
  const [ historys, setHistory ] = useState([]);
  const [ loading, setLoading ] = useState(true)
  const [checkInStatus, setCheckInStatus] = useState({});


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const query = new URLSearchParams();
    query.append("user_id", user['id']);

    const fetchData = async () => {
      try {
        const [historyData] = await Promise.all([
          getLoans(`?${query.toString()}`),
        ]);

        setHistory(historyData);

        const statusMap = {};

        await Promise.all(historyData.map(async (item) => {
          try {
            const checkInData = await getCheckIn(item.id_pinjam);

            let isCheckedOut = false;
            let denda = null;

            try {
              const checkOutData = await getCheckOut(checkInData.id_checkin);
              isCheckedOut = !!checkOutData;
              denda = Math.abs(checkOutData?.denda); // Ambil nilai denda dari response
              console.log(denda);
              
            } catch (error) {
              isCheckedOut = false;
              denda = null;
            }

            statusMap[item.id_pinjam] = {
              isCheckedIn: true,
              isCheckedOut,
              checkin_id: checkInData.id_checkin,
              denda: denda
            };
          } catch (error) {
            statusMap[item.id_pinjam] = {
              isCheckedIn: false,
              isCheckedOut: false,
              checkin_id: null,
              denda: null
            };
          }
        }));

        setCheckInStatus(statusMap);
      } catch (error) {
        console.log('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCheckIn = async (id_pinjam) => {
    try {
      await checkIn(id_pinjam);
      window.location.reload(); // atau bisa buat fungsi refreshStatus() khusus
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckOut = async (id_pinjam) => {
    const checkin_id = checkInStatus[id_pinjam]?.checkin_id;
    if (!checkin_id) return alert('Data check-in tidak ditemukan');

    try {
      const data = await checkOut(checkin_id);

      setCheckInStatus(prev => ({
        ...prev,
        [id_pinjam]: {
          ...prev[id_pinjam],
          isCheckedOut: true,
          denda: data.denda
        }
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white">
      <NavBar />


      <div className="flex flex-col items-center text-center sm:text-start mt-6 mb-52 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-[160px]">
        <h2 className="w-full mb-2 text-2xl md:text-3xl text-start hind-madurai-bold primary">
          Transaction history
        </h2>
        <div className="w-full border-b-2 border-[#008B9A] mb-6"></div>

        { loading ? (
          <div className="flex items-center justify-center text-center">
            <DotLottieReact
                src="https://lottie.host/23b16525-b459-4439-8ff8-988cac9361ed/uxoKeCLnsu.lottie"
                loop
                autoplay
                className="w-64 h-64"
            />
          </div>
        ) : ( 
          historys.length > 0 ? (
            historys.map((history) => (
              <div
                key={history.id_pinjam}
                className="flex flex-col w-full gap-6 px-6 py-6 mb-6 bg-white border border-gray-300 shadow-sm sm:flex-row rounded-xl sm:px-10 md:px-16 sm:py-8 sm:gap-0"
              >
                {/* Konten Deskripsi */}
                <div className='w-full sm:w-3/4'>
                  <p className="mb-1 text-lg hind-madurai-bold primary md:text-xl">
                    {history?.ruangan?.nama_ruangan}
                  </p>
                  <p className="mb-1 text-base break-words md:text-lg grey hind-madurai-regular">
                    {history?.rungan?.alamat}
                  </p>
                  <div className="flex flex-wrap items-center justify-center mb-2 text-base md:text-lg grey hind-madurai-regular sm:justify-start">
                    <FaClock className="mr-2 primary" />
                    {`${format(new Date(history.tanggal_pinjam), 'dd-MM-yyyy')}, Sesi ${history.sesi_idsesi} (${format(new Date(history?.sesi?.start_time), 'HH:mm')} - ${format(new Date(history?.sesi?.end_time), 'HH:mm')})`}
                  </div>
                  <div className="flex flex-col items-start justify-center text-base md:text-lg grey hind-madurai-regular sm:justify-start">
                    <p className='italic'>
                      Booking {formatDistanceToNow(new Date(history.created_at), { addSuffix: true })}
                    </p>
                    <p>
                      Denda : {
                        checkInStatus[history.id_pinjam]?.isCheckedOut
                          ? `Rp ${checkInStatus[history.id_pinjam]?.denda?.toLocaleString('id-ID') || '-'}`
                          : '-'
                      }
                    </p>
                  </div>
                </div>

                {/* Tombol Check In / Out */}
                <div className="flex flex-col items-center justify-center w-full gap-3 sm:w-1/4 sm:items-end">
                  {
                    checkInStatus[history.id_pinjam]?.isCheckedIn ? (
                      checkInStatus[history.id_pinjam]?.isCheckedOut ? (
                        <button
                          disabled
                          className="bg-gray-400 text-white hind-madurai-bold text-base md:text-lg px-4 py-2 rounded w-full sm:w-auto"
                        >
                          BOOKING DONE
                        </button>
                      ) : (
                        <button
                          onClick={() => handleCheckOut(history.id_pinjam)}
                          className="bg-primary hover:bg-[#006f7d] hover:shadow-md text-white hind-madurai-bold text-base md:text-lg px-4 py-2 rounded w-full sm:w-auto"
                        >
                          CHECK OUT
                        </button>
                      )
                    ) : (
                      <button
                        onClick={() => handleCheckIn(history.id_pinjam)}
                        className="bg-primary hover:bg-[#006f7d] hover:shadow-md text-white hind-madurai-bold text-base md:text-lg px-4 py-2 rounded w-full sm:w-auto"
                      >
                        CHECK IN
                      </button>
                    )
                  }
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center w-full h-64">
              <p className="text-lg text-gray-500 hind-madurai-regular">
                No transaction history found.
              </p>
            </div>
          ))}
      </div>

      <Footer />
    </div>
  );
};

export default History;
