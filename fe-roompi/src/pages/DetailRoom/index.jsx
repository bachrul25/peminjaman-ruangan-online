import React, { useState } from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import imgDummy from "../../assets/images/img-dummy.png";
import { FaChevronLeft, FaMapMarkerAlt, FaUser } from 'react-icons/fa';

const BookingRoom = () => {
  // const [selectedDate, setSelectedDate] = useState('');
  const [selectedSession, setSelectedSession] = useState('sesi1');

  return (
    <div>
      <NavBar />

      <div className="mx-[160px] mt-14 mb-28 p-8 bg-white rounded-lg shadow">
        {/* Back */}
        <button className="flex items-center gap-2 hind-madurai-bold primary text-2xl hover:cursor-pointer">
          <FaChevronLeft />
          Go Back
        </button>

        {/* Gambar dan Detail */}
        <div className="pt-8 mt-8 border-t-2 border-primary">
          <div className='rounded-3xl overflow-hidden '>
            <img
              src={imgDummy} // Ganti dengan URL gambar nyata
              alt="Bohe Room"
              className="w-full h-96 object-cover"
            />
          </div>
        </div>

        {/* Nama Ruangan dan Kapasitas */}
        <div className="flex items-center justify-between mt-8 pb-4 border-b-2 border-primary">
          <h2 className="text-2xl hind-madurai-bold primary">Bohe Room</h2>
          <div className="flex items-center primary text-xl hind-madurai-bold">
            <FaUser />
            15
          </div>
        </div>


        <div className='flex gap-20'>
          {/* Lokasi */}
          <div className="flex items-start gap-2 mt-4 w-1/3">
            <FaMapMarkerAlt className='primary mt-1' />
            <p className='text-black hind-madurai-regular text-lg'>Gedung Graha Pena, Lt. 5, No. 507<br />Jl. Ahmad Yani No. 88, Surabaya</p>
          </div>

          {/* Deskripsi */}
          <p className="mt-4 text-black text-lg hind-madurai-regular w-2/3">
            Bohe Room adalah ruang meeting modern yang dirancang untuk menghadirkan kenyamanan dan produktivitas.
            Dilengkapi dengan meja panjang, kursi ergonomis, layar presentasi, dan pencahayaan hangat, ruangan ini cocok
            untuk rapat tim, presentasi klien, maupun sesi brainstorming. Desain interior minimalis dan suasana tenang
            menjadikan Bohe Room pilihan ideal bagi kebutuhan profesional Anda.
          </p>
        </div>
        
        <div className='flex gap-20 mt-8'>
          {/* Dropdown Pilih Tanggal */}
          <div className="w-1/3">
            <label className="block mb-2 text-black hind-madurai-bold text-xl">Available Time Slots</label>
            <input
              type="date"
              id="dateCheckIn"
              name='dateCheckIn'
              className="w-full px-4 py-2 hind-madurai-bold text-lg border-2 border-primary rounded primary focus:outline-none cursor-pointer" />
          </div>

          {/* Sesi Waktu */}
          <div className="w-2/3">
            <label className="block mb-2 text-black hind-madurai-bold text-xl">Available Time Slots</label>
            <div className="flex space-x-3">
              <button
                className={`w-1/2 px-4 py-2 rounded hind-madurai-bold text-lg ${
                  selectedSession === 'sesi1'
                    ? 'bg-primary text-white'
                    : 'bg-secondary text-white'
                }`}
                onClick={() => setSelectedSession('sesi1')}
              >
                Sesi 1 (09.00 - 12.00)
              </button>
              <button
                className="w-1/2 px-4 py-2 rounded hind-madurai-bold text-lg bg-secondary text-white cursor-not-allowed"
                disabled
              >
                Sesi 2 (13.00 - 16.00)
              </button>
            </div>
          </div>
        </div>
        

        {/* Tombol Booking */}
        <div className="mt-10">
          <button className="w-full bg-primary text-white hind-madurai-bold text-xl py-3 rounded-lg hover:bg-teal-800 transition">
            BOOKING
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookingRoom;
