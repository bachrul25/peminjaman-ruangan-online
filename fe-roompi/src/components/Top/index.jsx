import { useEffect, useState } from "react";
import RoomCard from "../RoomCard";
import { Link } from "react-router";
import { getRooms } from "../../_services/rooms";
import { checkMultipleAvailability } from "../../_services/loans";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Top = () => {

    const [ rooms, setRooms ] = useState([]);
    const [roomAvailability, setRoomAvailability] = useState({});
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ loading, setLoading ] = useState(true);
    const [selectedTipe, setSelectedTipe] = useState('');
    const [minCapacity, setMinCapacity] = useState('');
    const [isBesok, setIsBesok] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const query = new URLSearchParams();
                const tipe = query.get("tipe_id") || "";
                const capacity = query.get("min_capacity") || "";
                const page = parseInt(query.get("page")) || 1;

                setSelectedTipe(tipe);
                setMinCapacity(capacity);
                setCurrentPage(page);
                query.append("page", currentPage);
                if (selectedTipe) query.append("tipe_id", selectedTipe);
                if (minCapacity) query.append("min_capacity", minCapacity);

                const roomsResponse = await getRooms(`?${query.toString()}`);
                const roomsData = roomsResponse.data;
                setRooms(roomsData);
                setCurrentPage(roomsResponse.current_page);

                const roomIds = roomsData.map(room => room.id_ruangan);

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
                const availabilityResponse = await checkMultipleAvailability(tanggal, roomIds);

                const availabilityMap = {};
                if (availabilityResponse.success) {
                    availabilityResponse.data.forEach(item => {
                        availabilityMap[item.id_ruangan] = {
                            session1: item.session_1_available,
                            session2: item.session_2_available,
                        };
                    });
                }

                setRoomAvailability(availabilityMap);
            } catch (error) {
                console.error("Gagal mengambil data ruangan:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currentPage, minCapacity, selectedTipe]);

    return (
        <section className="bg-white pt-16 pb-16 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-[160px]">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="flex flex-col items-start justify-between gap-6 mb-10 md:flex-row md:items-center">
                    <div className="flex-1">
                        <h2 className="mb-6 text-2xl text-black sm:text-3xl md:text-4xl hind-madurai-bold">
                            DISCOVER THE PERFECT WORKSPACE FOR YOUR NEEDS!
                        </h2>
                        <p className="max-w-3xl text-base text-black sm:text-lg md:text-xl hind-madurai-regular">
                            Every space at ROOMPI’S ROOM is designed to inspire and comfort. Choose your favorite room and boost productivity in the perfect setting!
                        </p>
                    </div>
                    <Link to="/rooms">
                        <button className="px-6 py-3 text-base text-white rounded-full bg-primary hind-madurai-bold">
                            See all →
                        </button>
                    </Link>
                </div>

                {/* Grid Cards */}
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {loading ? (
                        <div className="flex items-center justify-center text-center col-span-full">
                                <DotLottieReact
                                    src="https://lottie.host/23b16525-b459-4439-8ff8-988cac9361ed/uxoKeCLnsu.lottie"
                                    loop
                                    autoplay
                                    className="w-64 h-64"
                                />
                        </div>
                    ) : rooms
                        .sort((a, b) => b.rating - a.rating) // Urutkan berdasarkan rating tertinggi
                        .slice(0, 3)                         // Ambil 3 data teratas
                        .map((room) => (
                            <RoomCard key={room.id_ruangan} room={room} availability={roomAvailability[room.id_ruangan]} besok={isBesok} />
                        ))}
                    
                </div>
            </div>
        </section>
    );
};

export default Top;
