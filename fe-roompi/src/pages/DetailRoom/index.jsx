import React, { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import imgDummy from "../../assets/images/img-dummy.png";
import { FaChevronLeft, FaMapMarkerAlt, FaUser } from 'react-icons/fa';
import { Link, useLocation, useNavigate, useParams } from 'react-router';
import { showRoom } from '../../_services/rooms';
import { checkMultipleAvailability, createLoan } from '../../_services/loans';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { imageStorage } from '../../_api';

function RoomDetail() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const defaultSession = parseInt(queryParams.get("session")) ; 
  const [selectedSession, setSelectedSession] = useState(defaultSession);
  const { id_ruangan } = useParams(); // id diambil dari URL
  const [room, setRooms] = useState({});
  const [roomAvailability, setRoomAvailability] = useState({});
  const [tanggalHariIni, setTanggalHariIni] = useState("");
  const [sesi1Tersedia, setSesi1Tersedia] = useState(true);
  const [sesi2Tersedia, setSesi2Tersedia] = useState(true);
  const [isBesok, setIsBesok] = useState(false);
  const [ login, setLogin ] = useState(false);

  
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      if (isBesok) {
        // jika booking untuk besok, dua-duanya tersedia
        setSesi1Tersedia(true);
        setSesi2Tersedia(true);
      } else {
        const batas1 = new Date();
        batas1.setHours(8, 0, 0); 
        setSesi1Tersedia(now < batas1);

        const batas2 = new Date();
        batas2.setHours(13, 0, 0); 
        setSesi2Tersedia(now < batas2);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isBesok]);


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLogin(true);
    }

    const fetchRoomAndAvailability = async () => {
      try {
        const RoomData = await showRoom(id_ruangan);
        setRooms(RoomData);

        const now = new Date();
        const batasJam = new Date(now);
        batasJam.setHours(17, 0, 0, 0);

        let tanggal;
        if (now >= batasJam) {
          const besok = new Date(now);
          besok.setDate(now.getDate() + 1);
          tanggal = besok.toISOString().split('T')[0];
          setIsBesok(true); // ← ← ← ← penting
        } else {
          tanggal = now.toISOString().split('T')[0];
          setIsBesok(false);
        }

        setTanggalHariIni(tanggal);

        const availabilityResponse = await checkMultipleAvailability(tanggal, [id_ruangan]);
        setRoomAvailability(availabilityResponse);

      } catch (error) {
        console.error("Gagal mengambil data ruangan atau ketersediaan:", error);
      }
    };

    fetchRoomAndAvailability();
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
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 mb-4 text-lg hind-madurai-bold primary sm:text-xl lg:text-2xl">
          <FaChevronLeft />
          Go Back
        </button>

        {/* Gambar */}
        <div className="pt-6 mt-4 border-t-2 border-primary">
          <div className="overflow-hidden rounded-3xl">
            <img
              src={`${imageStorage}/ruangan/${room.foto_ruangan}`}
              alt={room.nama_ruangan}
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
              Date
            </label>
            <input
              type="date"
              id="dateCheckIn"
              name="dateCheckIn"
              value={tanggalHariIni}
              readOnly
              className="w-full px-4 py-2 text-base border-2 rounded hind-madurai-bold border-primary primary focus:outline-none"
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
                      if (roomAvailability.data[0].session_1_available && sesi1Tersedia) {
                        setSelectedSession(1);
                      }
                    }}
                    className={`w-full md:w-1/2 px-4 py-2 rounded hind-madurai-bold text-base ${
                      roomAvailability.data[0].session_1_available && sesi1Tersedia
                        ? selectedSession === 1
                          ? "bg-secondary primary"
                          : "bg-primary text-white"
                        : "bg-gray-400 text-white cursor-not-allowed"
                    }`}
                    disabled={!roomAvailability.data[0].session_1_available || !sesi1Tersedia}
                  >
                    Sesi 1 (08.00 - 12.00)
                  </button>

                  <button
                    onClick={() => {
                      if (roomAvailability.data[0].session_2_available && sesi2Tersedia) {
                        setSelectedSession(2);
                      }
                    }}
                    className={`w-full md:w-1/2 px-4 py-2 rounded hind-madurai-bold text-base ${
                      roomAvailability.data[0].session_2_available && sesi2Tersedia
                        ? selectedSession === 2
                          ? "bg-secondary primary"
                          : "bg-primary text-white"
                        : "bg-gray-400 text-white cursor-not-allowed"
                    }`}
                    disabled={!roomAvailability.data[0].session_2_available || !sesi2Tersedia}
                  >
                    Sesi 2 (13.00 - 17.00)
                  </button>
                </>
              ) : (
                <DotLottieReact
                    src="https://lottie.host/23b16525-b459-4439-8ff8-988cac9361ed/uxoKeCLnsu.lottie"
                    loop
                    autoplay
                    className="w-12 h-12"
                />
              )}
            </div>
          </div>
        </div>

        {/* Tombol Booking */}
        <div className="mt-10">
          {login ? (
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
          ) : (
            <button 
            className="w-full py-3 text-lg text-white rounded-lg hind-madurai-bold sm:text-lg bg-secondary"
            disabled>
              Login to book
            </button>
          )}
        </div>
      </div>


      <Footer />
    </div>
  );
};

export default RoomDetail;
