import NavBar from "../../components/NavBar";
import guest from '../../assets/images/guest.png';
import search from '../../assets/images/search.png';
import Footer from "../../components/Footer";
import RoomCard from "../../components/RoomCard";
import Newsletter from "../../components/Newsletter";
import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import { getRooms } from "../../_services/rooms";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { checkMultipleAvailability } from "../../_services/loans";
import { useLocation, useNavigate } from "react-router";
import { getTypes } from "../../_services/types";


function RoomsPage() {
    const [rooms, setRooms] = useState([]);
    const [roomAvailability, setRoomAvailability] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState("harga");
    const [selectedTipe, setSelectedTipe] = useState('');
    const [minCapacity, setMinCapacity] = useState('');
    const [isBesok, setIsBesok] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const [types, setType] = useState([])

    const [filtersReady, setFiltersReady] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const typeData = await getTypes();
                setType(typeData)
            } catch (error) {
                
            }
        }

        fetchData();
        
        const queryParams = new URLSearchParams(location.search);
        const tipe = queryParams.get("tipe_id") || "";
        const capacity = queryParams.get("min_capacity") || "";
        const page = parseInt(queryParams.get("page")) || 1;

        setSelectedTipe(tipe);
        setMinCapacity(capacity);
        setCurrentPage(page);
        setFiltersReady(true); // tandai bahwa parsing selesai
    }, [location.search]);

    useEffect(() => {
        if (!filtersReady) return; // Jangan fetch sampai filter siap

        const fetchData = async () => {
            setLoading(true);
            try {

                const query = new URLSearchParams();
                query.append("page", currentPage);
                if (selectedTipe) query.append("tipe_id", selectedTipe);
                if (minCapacity) query.append("min_capacity", minCapacity);

                const roomsResponse = await getRooms(`?${query.toString()}`);
                const roomsData = roomsResponse.data;
                setRooms(roomsData);
                setCurrentPage(roomsResponse.current_page);
                setTotalPages(roomsResponse.last_page);

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
    }, [selectedTipe, minCapacity, currentPage, filtersReady]);


    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page); // trigger fetchData untuk halaman baru
        }
    };

    // const handlePageChange = (page) => {
    //     if (page >= 1 && page <= totalPages) {
    //         const params = new URLSearchParams();
    //         if (selectedTipe) params.append("tipe_id", selectedTipe);
    //         if (minCapacity) params.append("min_capacity", minCapacity);
    //         params.append("page", page);
    //         navigate(`/rooms?${params.toString()}`);
    //     }
    // };

    
    return (
        <div className="bg-white">
            <NavBar />

            <div className="mt-4 mb-14 left-0 right-0 z-10 flex flex-col items-center text-white text-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-[160px]">

            <div className="w-full px-4 py-6 text-black shadow-lg bg-secondary rounded-4xl sm:px-6 md:px-10 sm:py-8 md:py-10">
                <form 
                    onSubmit={(e) => {
                    e.preventDefault();
                    const params = new URLSearchParams();
                    if (selectedTipe) params.append("tipe_id", selectedTipe);
                    if (minCapacity) params.append("min_capacity", minCapacity);
                    navigate(`/rooms?${params.toString()}`);
                }}
                >
                <div className="grid items-center grid-cols-1 gap-8 px-4 py-4 bg-white rounded-3xl sm:grid-cols-2 md:grid-cols-2 sm:px-6">
                    {/* Categories */}
                    <div className="flex items-center">
                        <img src={location} alt="" className="h-6 sm:h-8" />
                        <div className="w-full ml-2 mr-4 sm:ml-3">
                            <label className="block text-sm sm:text-base hind-madurai-bold text-start">Categories</label>
                            <select
                                id="categories"
                                name="categories"
                                value={selectedTipe}
                                onChange={(e) => setSelectedTipe(e.target.value)}
                                className="w-full text-sm cursor-pointer hind-madurai-regular sm:text-base grey focus:outline-none"
                            >
                                <option value="">Default categories</option>
                                {types.map((type) => (
                                    <option value={type.id_tipe}>{type.nama}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Guest */}
                    <div className="flex items-center">
                        <img src={guest} alt="" className="h-6 sm:h-8" />
                        <div className="w-full ml-2 sm:ml-3">
                            <label className="block text-sm sm:text-base hind-madurai-bold text-start">Min. Capacity</label>
                            <input 
                                type="number"
                                id="session"
                                name="session"
                                min={1}
                                placeholder='Default capacity'
                                value={minCapacity}
                                onChange={(e) => setMinCapacity(e.target.value)}
                                className='w-full text-base cursor-pointer hind-madurai-regular grey focus:outline-none' />
                        </div>
                        <button type="submit" className="p-3 ml-2 text-white rounded-full cursor-pointer bg-primary">
                            <img src={search} alt="" className="" />
                        </button>
                    </div>
                </div>
                </form>
            </div>
            </div>

            {/* Grid Layout dan Header */}
            <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-[160px] mt-10 sm:mt-12 mb-10 md:mt-14">
            <div className="flex flex-col justify-between gap-4 mb-6 sm:flex-row sm:items-center sm:mb-10 md:mb-11">
                <h2 className="text-2xl text-black sm:text-3xl lg:text-4xl hind-madurai-bold">
                ROOMPI'S ROOM
                </h2>
                <select
                id="sort"
                name="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 text-sm text-black border border-black rounded-lg sm:w-1/2 md:w-1/3 lg:w-1/4 hind-madurai-regular sm:text-base focus:outline-none"
                >
                    <option value="harga">Price</option>
                    <option value="kapasitas">Capacity</option>
                    <option value="rating">Rating</option>
                    <option value="tipe">Type Room</option>
                </select>
            </div>

            {/* Grid Cards */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 sm:gap-10">
                {loading ? (
                    <div className="flex items-center justify-center text-center col-span-full">
                            <DotLottieReact
                                src="https://lottie.host/23b16525-b459-4439-8ff8-988cac9361ed/uxoKeCLnsu.lottie"
                                loop
                                autoplay
                                className="w-64 h-64"
                            />
                    </div>
                ) : 
                    [...rooms]
                    .sort((a, b) => {
                        if (sortBy === "harga") return a.harga - b.harga;
                        if (sortBy === "kapasitas") return b.kapasitas - a.kapasitas;
                        if (sortBy === "rating") return b.rating - a.rating;
                        if (sortBy === "tipe") {
                            return a.tipe_idtipe - b.tipe_idtipe;
                        }
                        return 0;
                    })
                    .map((room) => (
                        <RoomCard key={room.id_ruangan} room={room} availability={roomAvailability[room.id_ruangan]} besok={isBesok}/>
                    ))}
            </div>

            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
            </div>


            {/* <Newsletter /> */}
            
            <Footer />
        </div>
    );
}



export default RoomsPage;