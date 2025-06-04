import React, { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import imgDummy from "../../assets/images/img-dummy.png";
import { FaChevronLeft, FaMapMarkerAlt, FaUser } from 'react-icons/fa';
import { Link, useParams } from 'react-router';
import { checkAvailableRoom, showRoom } from '../../_services/rooms';

function RoomDetail() {
  const { id_ruangan } = useParams(); // id diambil dari URL
  // const [selectedDate, setSelectedDate] = useState('');
  const [selectedSession, setSelectedSession] = useState(0);
  const [room, setRooms] = useState({});
  

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const [RoomData] = await Promise.all([
          showRoom(id_ruangan),
        ]);

        setRooms(RoomData);
        
      } catch (error) {
        console.error("Error fetching room data:", error);
        
      }
    }

    fetchRoom();
  }, [id_ruangan]);

  const today = new Date();
  const [sessionAvailable1, setSessionAvailable1] = useState(0);
  const [sessionAvailable2, setSessionAvailable2] = useState(0);

  const checkSesi = async () => {
    const sesi1 = {
      tanggal: today.toISOString().split('T')[0],
      sesi_id: 1,
    };

    const sesi2 = {
      tanggal: today.toISOString().split('T')[0],
      sesi_id: 2,
    };
    
    try {
      const response1 = await checkAvailableRoom(sesi1);
      const response2 = await checkAvailableRoom(sesi2);

      if (response1.success) setSessionAvailable1(1);
      if (response2.success) setSessionAvailable2(1);


    } catch (error) {
      console.log(error);
    }
  }

  checkSesi();

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
              className="w-full px-4 py-2 text-base border-2 rounded cursor-pointer hind-madurai-bold border-primary primary focus:outline-none"
            />
          </div>

          {/* Sesi */}
          <div className="w-full lg:w-2/3">
            <label className="block mb-2 text-lg text-black hind-madurai-bold sm:text-xl">
              Available Time Slots
            </label>
            <div className="flex flex-col space-y-3 md:flex-row md:space-x-3 md:space-y-0">
              <button
                className={`w-full md:w-1/2 px-4 py-2 rounded hind-madurai-bold text-base ${
                  sessionAvailable1 === 1
                    ? 'bg-primary text-white'
                    : 'bg-secondary text-white'
                }`}
                onClick={() => setSelectedSession(1)}
              >
                Sesi 1 (09.00 - 12.00)
              </button>
              <button
                className={`w-full md:w-1/2 px-4 py-2 rounded hind-madurai-bold text-base ${
                  sessionAvailable2 === 1
                    ? 'bg-primary text-white'
                    : 'bg-secondary text-white'
                }`}
                onClick={() => setSelectedSession(2)}
              >
                Sesi 2 (13.00 - 16.00)
              </button>
            </div>
          </div>
        </div>

        {/* Tombol Booking */}
        <div className="mt-10">
          <Link to={`/booking-success/${room?.id}`}>
            <button className="w-full py-3 text-lg text-white transition rounded-lg bg-primary hind-madurai-bold sm:text-xl hover:bg-teal-800">
              BOOKING
            </button>
          </Link>
        </div>
      </div>


      <Footer />
    </div>
  );
};

export default RoomDetail;
