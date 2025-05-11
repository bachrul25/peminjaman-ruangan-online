import { FaUser, FaStar } from "react-icons/fa";
import '../../assets/css/global.css';

const RoomCard = ({ room }) => {
    return (
        <div className="bg-white rounded-xl shadow-md p-4">
        <div className="relative rounded-xl overflow-hidden">
            <img src={room.image} alt={room.title} className="w-full h-56 object-cover" />
            <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-sm px-2 py-1 rounded flex items-center gap-1">
            <FaStar className="text-yellow-400" />
            {room.rating}
            </div>
        </div>
        <div className="flex justify-between items-center text-black hind-madurai-bold text-xl mt-2">
            <span>{room.title}</span>
            <div className="flex items-center gap-1">
            <FaUser />
            {room.capacity}
            </div>
        </div>
        <p className="hind-madurai-regular text-lg" style={{ color: `#5E5E5E` }}>{room.type}</p>
        <a href="#" className="text-lg hind-madurai-regular primary  mt-1 inline-block">
            See detail &gt;
        </a>
        <p className="hind-madurai-bold text-xl text-black">Rp. {room.cost} /Session</p>
        <div className="mt-3 space-y-2">
            <button
            className={`w-full py-2 rounded hind-madurai-bold text-lg ${
                room.activeSession === 1
                ? "bg-primary text-white"
                : "bg-secondary text-white"
            }`}
            >
            Sesi 1 (09.00 - 12.00)
            </button>
            <button
            className={`w-full py-2 rounded hind-madurai-bold text-lg ${
                room.activeSession === 2
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