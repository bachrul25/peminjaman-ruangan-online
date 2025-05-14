import { FaUser, FaStar } from "react-icons/fa";
import '../../assets/css/global.css';
import { Link } from "react-router";

const RoomCard = ({ room }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col">
      {/* Gambar + Rating */}
      <div className="relative rounded-xl overflow-hidden">
        <img
          src={room.image}
          alt={room.title}
          className="w-full h-40 md:h-56 object-cover"
        />
        <div className="absolute top-2 right-2 bg-black/60 text-white text-sm p-2 rounded-lg flex items-center gap-1 hind-madurai-bold">
          <FaStar className="text-yellow-400 w-4 h-4" />
          {room.rating}
        </div>
      </div>

      {/* Judul & Kapasitas */}
      <div className="flex flex-row justify-between items-start sm:items-center text-black mt-5 mb-2.5">
        <span className="hind-madurai-bold text-lg sm:text-xl">{room.title}</span>
        <div className="flex items-center gap-2 text-sm sm:text-base mt-1 sm:mt-0">
          <FaUser />
          {room.capacity}
        </div>
      </div>

      {/* Tipe */}
      <p className="hind-madurai-regular text-sm text-gray-600 mb-1">{room.type}</p>

      {/* Link Detail */}
      <Link
        to={`/detail-room/${room.id}`}
        className="text-sm sm:text-base hind-madurai-regular text-blue-600 hover:underline"
      >
        See detail &gt;
      </Link>

      {/* Harga */}
      <p className="hind-madurai-bold text-lg sm:text-xl text-black my-4">
        Rp. {room.cost} /Session
      </p>

      {/* Tombol Sesi */}
      <div className="space-y-3">
        {[1, 2].map((sesi) => (
          <button
            key={sesi}
            className={`w-full py-2 rounded hind-madurai-bold text-sm sm:text-lg transition-colors ${
              room.activeSession === sesi
                ? "bg-primary text-white"
                : "bg-secondary text-white"
            }`}
          >
            {sesi === 1 ? "Sesi 1 (09.00 - 12.00)" : "Sesi 2 (13.00 - 16.00)"}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RoomCard;
