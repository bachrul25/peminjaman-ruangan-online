import { FaUser, FaStar } from "react-icons/fa";
import '../../assets/css/global.css';
import { Link } from "react-router";
import { checkAvailableRoom } from "../../_services/rooms";
import { useState } from "react";

const RoomCard = ({ room }) => {
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
    <div className="flex flex-col p-4 bg-white shadow-md rounded-xl">
      {/* Gambar + Rating */}
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={room.image}
          alt={room.nama_ruangan}
          className="object-cover w-full h-40 md:h-56"
        />
        <div className="absolute flex items-center gap-1 p-2 text-sm text-white rounded-lg top-2 right-2 bg-black/60 hind-madurai-bold">
          <FaStar className="w-4 h-4 text-yellow-400" />
          {room.rating}
        </div>
      </div>

      {/* Judul & Kapasitas */}
      <div className="flex flex-row justify-between items-start sm:items-center text-black mt-5 mb-2.5">
        <span className="text-lg hind-madurai-bold sm:text-xl">{room.nama_ruangan}</span>
        <div className="flex items-center gap-2 mt-1 text-sm sm:text-base sm:mt-0">
          <FaUser />
          {room.kapasitas}
        </div>
      </div>

      {/* Tipe */}
      <p className="mb-1 text-sm text-gray-600 hind-madurai-regular">{room.tipe?.nama}</p>

      {/* Link Detail */}
      <Link
        to={`/detail-room/${room.id_ruangan}`}
        className="text-sm text-blue-600 sm:text-base hind-madurai-regular hover:underline"
      >
        See detail &gt;
      </Link>

      {/* Harga */}
      <p className="my-4 text-lg text-black hind-madurai-bold sm:text-xl">
        Rp. {room.harga} /Session
      </p>

      {/* Tombol Sesi */}
      <div className="space-y-3">

        <button
            className={`w-full py-2 rounded hind-madurai-bold text-sm sm:text-lg transition-colors ${
              sessionAvailable1 === 1
                ? "bg-primary text-white"
                : "bg-secondary text-white"
            }`}
          >
            Sesi 1 (09.00 - 12.00)
          </button>
        <button
            className={`w-full py-2 rounded hind-madurai-bold text-sm sm:text-lg transition-colors ${
              sessionAvailable2 === 1
                ? "bg-primary text-white"
                : "bg-secondary text-white"
            }`}
          >
            Sesi 2 (13.00 - 16.00)
          </button>
      </div>
    </div>
  );
};

export default RoomCard;
