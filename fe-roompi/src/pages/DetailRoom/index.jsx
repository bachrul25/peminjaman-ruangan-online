import React, { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import imgDummy from "../../assets/images/img-dummy.png";
import { FaChevronLeft, FaMapMarkerAlt, FaUser } from 'react-icons/fa';
import { Link, useLocation, useNavigate, useParams } from 'react-router';
import { showRoom } from '../../_services/rooms';
import { checkMultipleAvailability, createLoan } from '../../_services/loans';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

function RoomDetail() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const defaultSession = parseInt(queryParams.get("session")) ; 
  const [selectedSession, setSelectedSession] = useState(defaultSession);
  const { id_ruangan } = useParams(); // id diambil dari URL
  const [room, setRooms] = useState({});
  const [roomAvailability, setRoomAvailability] = useState({});
  const [tanggalHariIni, setTanggalHariIni] = useState("");
  

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const [RoomData] = await Promise.all([
          showRoom(id_ruangan),
        ]);

        // Tanggal hari ini
        const today = new Date();
        const tanggal = today.toISOString().split('T')[0];

        // Panggil API untuk ketersediaan sesi
        const availabilityResponse = await checkMultipleAvailability(tanggal, [id_ruangan]);

        setRoomAvailability(availabilityResponse);
        setTanggalHariIni(tanggal);
        setRooms(RoomData);
        
      } catch (error) {
        console.error("Error fetching room data:", error);
        
      }
    }
    
    fetchRoom();
  }, [id_ruangan]);
  
  const navigate = useNavigate();
  const [ loading, setLoading ] = useState(false);
  const formData = {
    ruangan_idruangan: id_ruangan,
    sesi_idsesi: selectedSession,
    tanggal_pinjam: tanggalHariIni,
  }

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createLoan(formData);
      return navigate(`/booking-success/${room?.id_ruangan}`)
    } catch (error) {
      console.error("Error during booking:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }


  return (
    <div>
      <NavBar />

      <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-[160px] mt-10 mb-28">
        {/* Back */}
        <button className="flex items-center gap-2 mb-4 text-lg hind-madurai-bold primary sm:text-xl lg:text-2xl">
          <FaChevronLeft />
          Go Back
        </button>

        {/* Gambar */}
        <div className="pt-6 mt-4 border-t-2 border-primary">
          <div className="overflow-hidden rounded-3xl">
            <img
              src={imgDummy}
              alt="Bohe Room"
              className="object-cover w-full h-64 sm:h-80 md:h-96"
            />
          </div>
        </div>

        {/* Judul & Kapasitas */}
        <div className="flex flex-col justify-between gap-2 pb-4 mt-6 border-b-2 sm:flex-row sm:items-center border-primary">
          <h2 className="text-xl sm:text-2xl hind-madurai-bold primary">{room.nama_ruangan}</h2>
          <div className="flex items-center text-lg primary sm:text-xl hind-madurai-bold">
            <FaUser className="mr-2" />
            {room.kapasitas}
          </div>
        </div>

        {/* Lokasi & Deskripsi */}
        <div className="flex flex-col gap-6 mt-6 lg:flex-row lg:gap-20">
          {/* Lokasi */}
          <div className="flex items-start gap-2 lg:w-1/3">
            <FaMapMarkerAlt className="mt-1 primary" />
            <p className="text-base text-black hind-madurai-regular sm:text-lg">
              {room.alamat}
            </p>
          </div>

          {/* Deskripsi */}
          <p className="text-base text-black sm:text-lg hind-madurai-regular lg:w-2/3">
            {room.tipe?.deskripsi}
          </p>
        </div>

        {/* Form Booking */}
        <div className="flex flex-col gap-6 mt-8 lg:flex-row lg:gap-20">
          {/* Tanggal */}
          <div className="w-full lg:w-1/3">
            <label className="block mb-2 text-lg text-black hind-madurai-bold sm:text-xl">
              Choose Date
            </label>
            <input
              type="date"
              id="dateCheckIn"
              name="dateCheckIn"
              value={tanggalHariIni}
              onChange={(e) => setTanggalHariIni(e.target.value)}
              className="w-full px-4 py-2 text-base border-2 rounded cursor-pointer hind-madurai-bold border-primary primary focus:outline-none"
            />
          </div>

          {/* Sesi */}
          <div className="w-full lg:w-2/3">
            <label className="block mb-2 text-lg text-black hind-madurai-bold sm:text-xl">
              Available Time Slots
            </label>
            <div className="flex flex-col justify-center space-y-3 md:flex-row md:space-x-3 md:space-y-0">
              {roomAvailability?.data?.length > 0 ? (
                <>
                  <button
                    onClick={() => {
                      if (roomAvailability.data[0].session_1_available) {
                        setSelectedSession(1);
                      }
                    }}
                    className={`w-full md:w-1/2 px-4 py-2 rounded hind-madurai-bold text-base ${
                      roomAvailability.data[0].session_1_available
                          ? selectedSession === 1
                            ? "bg-secondary primary"
                            : "bg-primary text-white"
                          : "bg-secondary text-white cursor-not-allowed"
                      }`}
                      disabled={!roomAvailability.data[0].session_1_available}
                  >
                    Sesi 1 (09.00 - 12.00)
                  </button>
                  <button
                    onClick={() => {
                      if (roomAvailability.data[0].session_2_available) {
                        setSelectedSession(2);
                      }
                    }}
                    className={`w-full md:w-1/2 px-4 py-2 rounded hind-madurai-bold text-base ${
                      roomAvailability.data[0].session_2_available
                          ? selectedSession === 2
                            ? "bg-secondary primary"
                            : "bg-primary text-white"
                          : "bg-secondary text-white cursor-not-allowed"
                      }`}
                      disabled={!roomAvailability.data[0].session_2_available}
                  >
                    Sesi 2 (13.00 - 16.00)
                  </button>
                </>
              ) : (
                <DotLottieReact
                    src="https://lottie.host/23b16525-b459-4439-8ff8-988cac9361ed/uxoKeCLnsu.lottie"
                    loop
                    autoplay
                    className="w-16 h-16"
                />
              )}
            </div>
          </div>
        </div>

        {/* Tombol Booking */}
        <div className="mt-10">
          <button 
          onClick={handleBooking}
          className={`w-full py-3 text-lg text-white transition rounded-lg ${
          loading ? "bg-secondary" : "bg-primary"
          } hind-madurai-bold sm:text-xl hover:bg-teal-800`}>
            {loading ? (
              <DotLottieReact
                src="https://lottie.host/23b16525-b459-4439-8ff8-988cac9361ed/uxoKeCLnsu.lottie"
                loop
                autoplay
                className="w-8 h-8 mx-auto"
              />
            ) : (
              "BOOKING"
            )}
          </button>
        </div>
      </div>


      <Footer />
    </div>
  );
};

export default RoomDetail;
