import { FaUser, FaStar } from "react-icons/fa";
import '../../assets/css/global.css';
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { imageStorage } from "../../_api";

const RoomCard = ({ room, availability, besok }) => {
  const navigate = useNavigate();
  const [ login, setLogin ] = useState(false);
  const [sesi1, setSesi1] = useState(true);
  const [sesi2, setSesi2] = useState(true);
  const isBesok = besok;

  const handleSessionClick = (session) => {
    navigate(`/detail-room/${room.id_ruangan}?session=${session}`);
  };

  const handleSeeDetail = () => {
    navigate(`/detail-room/${room.id_ruangan}`);
  };
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLogin(true);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      if (isBesok) {
        // jika booking untuk besok, dua-duanya tersedia
        setSesi1(true);
        setSesi2(true);
      } else {
        const batas1 = new Date();
        batas1.setHours(8, 0, 0); 
        setSesi1(now < batas1);

        const batas2 = new Date();
        batas2.setHours(13, 0, 0); 
        setSesi2(now < batas2);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isBesok]);


  const loading = availability === undefined;

  return (
    <div className="flex flex-col p-4 bg-white shadow-md rounded-xl">
      {/* Gambar + Rating */}
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={`${imageStorage}/${room.foto_ruangan}`}
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
      <span
        onClick={handleSeeDetail}
        className="text-sm text-blue-600 cursor-pointer sm:text-base hind-madurai-regular hover:underline"
      >
        See detail &gt;
      </span>

      {/* Harga */}
      <p className="my-4 text-lg text-black hind-madurai-bold sm:text-xl">
        Rp. {room.harga} /Session
      </p>

      {/* Tombol Sesi */}
      <div className="space-y-3">
        { login ? (
          <>
            <button
              onClick={() => availability?.session1 && sesi1 && handleSessionClick(1)}
              className={`w-full py-2 flex justify-center text-center items-center rounded hind-madurai-bold text-sm sm:text-lg transition-colors ${
                availability?.session1 && sesi1
                  ? "bg-primary text-white"
                  : "bg-gray-400 text-white cursor-not-allowed"
              }`}
              disabled={!availability?.session1 || !sesi1}
            >
              {loading ? (
                <DotLottieReact
                  src="https://lottie.host/23b16525-b459-4439-8ff8-988cac9361ed/uxoKeCLnsu.lottie"
                  loop
                  autoplay
                  className="w-8 h-8"
                />
              ) : (
                `Sesi 1 (08.00 - 12.00)`
              )}
            </button>

            <button
              onClick={() => availability?.session2 && sesi2 && handleSessionClick(2)}
              className={`w-full py-2 flex justify-center text-center items-center rounded hind-madurai-bold text-sm sm:text-lg transition-colors ${
                availability?.session2 && sesi2
                  ? "bg-primary text-white"
                  : "bg-gray-400 text-white cursor-not-allowed"
              }`}
              disabled={!availability?.session2 || !sesi2}
            >
              {loading ? (
                <DotLottieReact
                  src="https://lottie.host/23b16525-b459-4439-8ff8-988cac9361ed/uxoKeCLnsu.lottie"
                  loop
                  autoplay
                  className="w-8 h-8"
                />
              ) : (
                `Sesi 2 (13.00 - 17.00)`
              )}
            </button>
          </>
          ) : (
            <>
            <button
                className="w-full py-2 text-sm text-white rounded hind-madurai-bold sm:text-lg bg-secondary"
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
