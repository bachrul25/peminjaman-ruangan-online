import NavBar from "../../components/NavBar";
import guest from '../../assets/images/guest.png';
import calender from '../../assets/images/calender.png';
import location from '../../assets/images/location.png';
import search from '../../assets/images/search.png';
import Footer from "../../components/Footer";
import RoomCard from "../../components/RoomCard";
import Newsletter from "../../components/Newsletter";
import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import { getRooms } from "../../_services/rooms";
// import rooms from "../../Utils/dummy";


function RoomsPage() {
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
        <div className="bg-white">
            <NavBar />

            <div className="mt-4 mb-14 left-0 right-0 z-10 flex flex-col items-center text-white text-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-[160px]">

            <div className="w-full px-4 py-6 text-black shadow-lg bg-secondary rounded-4xl sm:px-6 md:px-10 sm:py-8 md:py-10">
                <form action="" method="post">
                <div className="grid items-center grid-cols-1 gap-4 px-4 py-4 bg-white rounded-3xl sm:grid-cols-2 md:grid-cols-3 sm:px-6">
                    {/* Categories */}
                    <div className="flex items-center">
                        <img src={location} alt="" className="h-6 sm:h-8" />
                        <div className="w-full ml-2 sm:ml-3">
                            <label className="block text-sm sm:text-base hind-madurai-bold text-start">Categories</label>
                            <select
                                id="categories"
                                name="categories"
                                className="w-full text-sm cursor-pointer hind-madurai-regular sm:text-base grey focus:outline-none"
                            >
                                <option value="">Add room categories</option>
                                <option value="option1">Option One</option>
                                <option value="option2">Option Two</option>
                                <option value="option3">Option Three</option>
                                <option value="option4">Option Four</option>
                            </select>
                        </div>
                    </div>

                    {/* Check In */}
                    <div className="flex items-center">
                        <img src={calender} alt="" className="h-6 sm:h-8" />
                        <div className="w-full ml-2 sm:ml-3">
                            <label className="block text-sm sm:text-base hind-madurai-bold text-start">Date</label>
                            <input
                                type="date"
                                id="dateCheckIn"
                                name="dateCheckIn"
                                className="w-full text-sm cursor-pointer hind-madurai-regular sm:text-base grey focus:outline-none"
                            />
                        </div>
                    </div>


                    {/* Guest */}
                    <div className="flex items-center">
                        <img src={guest} alt="" className="h-6 sm:h-8" />
                        <div className="w-full ml-2 sm:ml-3">
                            <label className="block text-sm sm:text-base hind-madurai-bold text-start">Session</label>
                            <select
                                id="session"
                                name="session"
                                class="w-full hind-madurai-regular text-base grey focus:outline-none cursor-pointer"
                                >
                                <option value="">Choose Session</option>
                                <option value="1">Session 1</option>
                                <option value="2">Session 2</option>
                            </select>
                        </div>
                        <button className="p-3 ml-2 text-white rounded-full bg-primary">
                            <img src={search} alt="" className="" />
                        </button>
                    </div>
                </div>
                </form>
            </div>
            </div>

            {/* Grid Layout dan Header */}
            <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-[160px] mt-10 sm:mt-12 md:mt-14">
            <div className="flex flex-col justify-between gap-4 mb-6 sm:flex-row sm:items-center sm:mb-10 md:mb-11">
                <h2 className="text-2xl text-black sm:text-3xl lg:text-4xl hind-madurai-bold">
                ROOMPI'S ROOM
                </h2>
                <select
                id="sort"
                name="sort"
                className="w-full px-4 py-2 text-sm text-black border border-black rounded-lg sm:w-1/2 md:w-1/3 lg:w-1/4 hind-madurai-regular sm:text-base focus:outline-none"
                >
                <option value="">Price</option>
                <option value="option1">Option One</option>
                <option value="option2">Option Two</option>
                <option value="option3">Option Three</option>
                <option value="option4">Option Four</option>
                </select>
            </div>

            {/* Grid Cards */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 sm:gap-10">
                {rooms.map((room) => (
                <RoomCard key={room.id_ruangan} room={room} />
                ))}
            </div>

            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
            </div>


            <Newsletter />
            
            <Footer />
        </div>
    );
}



export default RoomsPage;