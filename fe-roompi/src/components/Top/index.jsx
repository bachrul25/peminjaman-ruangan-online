import { useEffect, useState } from "react";
import RoomCard from "../RoomCard";
import { Link } from "react-router";
import { getRooms } from "../../_services/rooms";

const Top = () => {

    const [rooms, setRooms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const roomsResponse = await getRooms(currentPage); // tambahkan page kalau perlu
            setRooms(roomsResponse.data); // roomsResponse adalah hasil dari data.data
            setCurrentPage(roomsResponse.current_page);
            setTotalPages(roomsResponse.last_page);
        } catch (error) {
            console.error("Gagal mengambil data ruangan:", error);
        }
        };

        fetchData();
    }, [currentPage]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
        }
    };

    return (
        <section className="bg-white pt-16 pb-16 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-[160px]">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                    <div className="flex-1">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl hind-madurai-bold text-black mb-6">
                            DISCOVER THE PERFECT WORKSPACE FOR YOUR NEEDS!
                        </h2>
                        <p className="text-black text-base sm:text-lg md:text-xl hind-madurai-regular max-w-3xl">
                            Every space at ROOMPI’S ROOM is designed to inspire and comfort. Choose your favorite room and boost productivity in the perfect setting!
                        </p>
                    </div>
                    <Link to="/rooms">
                        <button className="bg-primary hind-madurai-bold text-base text-white px-6 py-3 rounded-full">
                            See all →
                        </button>
                    </Link>
                </div>

                {/* Grid Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {rooms
                        .sort((a, b) => b.rating - a.rating) // Urutkan berdasarkan rating tertinggi
                        .slice(0, 3)                         // Ambil 3 data teratas
                        .map((room) => (
                            <RoomCard key={room.id_ruangan} room={room} />
                        ))}
                </div>
            </div>
        </section>
    );
};

export default Top;
