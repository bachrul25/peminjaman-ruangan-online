import React, { useState } from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import imgDummy from "../../assets/images/img-dummy.png";
import { FaChevronLeft, FaMapMarkerAlt, FaUser } from 'react-icons/fa';
import { Link, useParams } from 'react-router';

function RoomDetail({ rooms }) {
  // const [selectedDate, setSelectedDate] = useState('');
  const [selectedSession, setSelectedSession] = useState('sesi1');

  const { id } = useParams(); // id diambil dari URL
  const room = rooms.find(r => r.id === parseInt(id));

  return (
    <div>
      <NavBar />

      <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-[160px] mt-10 mb-28">
        {/* Back */}
        <button className="flex items-center gap-2 hind-madurai-bold primary text-lg sm:text-xl lg:text-2xl mb-4">
          <FaChevronLeft />
          Go Back
        </button>

        {/* Gambar */}
        <div className="pt-6 mt-4 border-t-2 border-primary">
          <div className="rounded-3xl overflow-hidden">
            <img
              src={imgDummy}
              alt="Bohe Room"
              className="w-full h-64 sm:h-80 md:h-96 object-cover"
            />
          </div>
        </div>

        {/* Judul & Kapasitas */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-6 pb-4 border-b-2 border-primary gap-2">
          <h2 className="text-xl sm:text-2xl hind-madurai-bold primary">{room?.title}</h2>
          <div className="flex items-center primary text-lg sm:text-xl hind-madurai-bold">
            <FaUser className="mr-2" />
            {room?.capacity}
          </div>
        </div>

        {/* Lokasi & Deskripsi */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-20 mt-6">
          {/* Lokasi */}
          <div className="flex items-start gap-2 lg:w-1/3">
            <FaMapMarkerAlt className="primary mt-1" />
            <p className="text-black hind-madurai-regular text-base sm:text-lg">
              Gedung Graha Pena, Lt. 5, No. 507<br />
              Jl. Ahmad Yani No. 88, Surabaya
            </p>
          </div>

          {/* Deskripsi */}
          <p className="text-black text-base sm:text-lg hind-madurai-regular lg:w-2/3">
            Bohe Room adalah ruang meeting modern yang dirancang untuk menghadirkan kenyamanan dan produktivitas. Dilengkapi
            dengan meja panjang, kursi ergonomis, layar presentasi, dan pencahayaan hangat, ruangan ini cocok untuk rapat tim,
            presentasi klien, maupun sesi brainstorming. Desain interior minimalis dan suasana tenang menjadikan Bohe Room
            pilihan ideal bagi kebutuhan profesional Anda.
          </p>
        </div>

        {/* Form Booking */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-20 mt-8">
          {/* Tanggal */}
          <div className="lg:w-1/3 w-full">
            <label className="block mb-2 text-black hind-madurai-bold text-lg sm:text-xl">
              Choose Date
            </label>
            <input
              type="date"
              id="dateCheckIn"
              name="dateCheckIn"
              className="w-full px-4 py-2 hind-madurai-bold text-base border-2 border-primary rounded primary focus:outline-none cursor-pointer"
            />
          </div>

          {/* Sesi */}
          <div className="lg:w-2/3 w-full">
            <label className="block mb-2 text-black hind-madurai-bold text-lg sm:text-xl">
              Available Time Slots
            </label>
            <div className="flex flex-col md:flex-row md:space-x-3 space-y-3 md:space-y-0">
              <button
                className={`w-full md:w-1/2 px-4 py-2 rounded hind-madurai-bold text-base ${
                  selectedSession === 'sesi1'
                    ? 'bg-primary text-white'
                    : 'bg-secondary text-white'
                }`}
                onClick={() => setSelectedSession('sesi1')}
              >
                Sesi 1 (09.00 - 12.00)
              </button>
              <button
                className="w-full md:w-1/2 px-4 py-2 rounded hind-madurai-bold text-base bg-secondary text-white cursor-not-allowed"
                disabled
              >
                Sesi 2 (13.00 - 16.00)
              </button>
            </div>
          </div>
        </div>

        {/* Tombol Booking */}
        <div className="mt-10">
          <Link to={`/booking-success/${room?.id}`}>
            <button className="w-full bg-primary text-white hind-madurai-bold text-lg sm:text-xl py-3 rounded-lg hover:bg-teal-800 transition">
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
