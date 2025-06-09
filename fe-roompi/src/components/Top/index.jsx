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

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const roomsResponse = await getRooms(currentPage); 
                const roomsData = roomsResponse.data;
                setRooms(roomsData); // ini array data ruangan
                setCurrentPage(roomsResponse.current_page); // current_page dari API
                
                // Ambil ID ruangan
                const roomIds = roomsData.map(room => room.id_ruangan);

                // Tanggal hari ini
                const today = new Date();
                const tanggal = today.toISOString().split('T')[0];

                // Panggil API untuk ketersediaan sesi
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
                setLoading(false);
            } catch (error) {
                console.error("Gagal mengambil data ruangan:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currentPage]);

    // const handlePageChange = (page) => {
    //     if (page >= 1 && page <= totalPages) {
    //         setCurrentPage(page); // trigger fetchData untuk halaman baru
    //     }
    // };

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
                            <RoomCard key={room.id_ruangan} room={room} availability={roomAvailability[room.id_ruangan]} />
                        ))}
                    
                </div>
            </div>
        </section>
    );
};

export default Top;
