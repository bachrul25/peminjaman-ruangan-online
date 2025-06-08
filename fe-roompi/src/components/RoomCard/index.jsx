import { FaUser, FaStar } from "react-icons/fa";
import '../../assets/css/global.css';
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { checkAvailableRoom } from "../../_services/loans";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const RoomCard = ({ room }) => {
  const [ login, setLogin ] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sessionAvailable1, setSessionAvailable1] = useState(false);
  const [sessionAvailable2, setSessionAvailable2] = useState(false);
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLogin(true);
    }

    const today = new Date();
    const tanggal = today.toISOString().split('T')[0];
    const idRoom = room?.id_ruangan;

    const checkSesi = async () => {
      try {
        const [response1, response2] = await Promise.all([
          checkAvailableRoom({
              ruangan_idruangan: idRoom,
              sesi_idsesi: 1,
              tanggal_pinjam: tanggal,
            }),
          checkAvailableRoom({
              ruangan_idruangan: idRoom,
              sesi_idsesi: 2,
              tanggal_pinjam: tanggal,
          }),
        ]);

        
        if (response1.success) setSessionAvailable1(true);
        if (response2.success) setSessionAvailable2(true);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    checkSesi();
  }, [room]);


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
        { login ? (
          <>
            <button
                className={`w-full py-2 flex justify-center text-center items-center rounded hind-madurai-bold text-sm sm:text-lg transition-colors ${
                  sessionAvailable1
                    ? "bg-primary text-white"
                    : "bg-secondary text-white"
                }`}
              >
                { loading ? (
                  <DotLottieReact
                      src="https://lottie.host/23b16525-b459-4439-8ff8-988cac9361ed/uxoKeCLnsu.lottie"
                      loop
                      autoplay
                      className="w-8 h-8"
                  />
                ) : (
                  `Sesi 1 (09.00 - 12.00)`
                )}
              </button>
            <button
                className={`w-full py-2 flex justify-center text-center items-center rounded hind-madurai-bold text-sm sm:text-lg transition-colors ${
                  sessionAvailable2
                    ? "bg-primary text-white"
                    : "bg-secondary text-white"
                }`}
              >
                { loading ? (
                  <DotLottieReact
                      src="https://lottie.host/23b16525-b459-4439-8ff8-988cac9361ed/uxoKeCLnsu.lottie"
                      loop
                      autoplay
                      className="w-8 h-8"
                  />
                ) : (
                  `Sesi 2 (13.00 - 16.00)`
                )}
            </button>
          </>
          ) : (
            <>
            <button
                className="w-full py-2 rounded hind-madurai-bold text-sm sm:text-lg bg-secondary text-white"
                disabled
              >
                Login to book
              </button>
            </>
          )}
      </div>
    </div>
  );
};

export default RoomCard;
