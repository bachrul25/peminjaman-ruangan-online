import NavBar from "../../components/NavBar";
import guest from '../../assets/images/guest.png';
import calender from '../../assets/images/calender.png';
import location from '../../assets/images/location.png';
import search from '../../assets/images/search.png';
import Footer from "../../components/Footer";
import RoomCard from "../../components/RoomCard";
import Newsletter from "../../components/Newsletter";
import { useState } from "react";
import Pagination from "../../components/Pagination";
import rooms from "../../Utils/dummy";


function RoomsPage() {

    // State pagination
    const [currentPage, setCurrentPage] = useState(1);
    const roomsPerPage = 6;
    const totalPages = Math.ceil(rooms.length / roomsPerPage);

    // Data yang ditampilkan berdasarkan halaman
    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = rooms.slice(indexOfFirstRoom, indexOfLastRoom);

    const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
        setCurrentPage(pageNumber);
  }
};


    return (
        <div className="bg-white">
            <NavBar />

            <div className="mt-4 mb-14 left-0 right-0 z-10 flex flex-col items-center text-white text-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-[160px]">

            <div className="bg-secondary text-black rounded-4xl px-4 sm:px-6 md:px-10 py-6 sm:py-8 md:py-10 w-full shadow-lg">
                <form action="" method="post">
                <div className="bg-white rounded-3xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-center px-4 sm:px-6 py-4">
                    {/* Categories */}
                    <div className="flex items-center">
                        <img src={location} alt="" className="h-6 sm:h-8" />
                        <div className="ml-2 sm:ml-3 w-full">
                            <label className="block text-sm sm:text-base hind-madurai-bold text-start">Categories</label>
                            <select
                                id="categories"
                                name="categories"
                                className="w-full hind-madurai-regular text-sm sm:text-base grey focus:outline-none cursor-pointer"
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
                        <div className="ml-2 sm:ml-3 w-full">
                            <label className="block text-sm sm:text-base hind-madurai-bold text-start">Date</label>
                            <input
                                type="date"
                                id="dateCheckIn"
                                name="dateCheckIn"
                                className="w-full hind-madurai-regular text-sm sm:text-base grey focus:outline-none cursor-pointer"
                            />
                        </div>
                    </div>


                    {/* Guest */}
                    <div className="flex items-center">
                        <img src={guest} alt="" className="h-6 sm:h-8" />
                        <div className="ml-2 sm:ml-3 w-full">
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
                        <button className="ml-2 p-3 rounded-full bg-primary text-white">
                            <img src={search} alt="" className="" />
                        </button>
                    </div>
                </div>
                </form>
            </div>
            </div>

            {/* Grid Layout dan Header */}
            <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-[160px] mt-10 sm:mt-12 md:mt-14">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-10 md:mb-11 gap-4">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl hind-madurai-bold text-black">
                ROOMPI'S ROOM
                </h2>
                <select
                id="sort"
                name="sort"
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 hind-madurai-regular text-sm sm:text-base text-black focus:outline-none border border-black rounded-lg px-4 py-2"
                >
                <option value="">Price</option>
                <option value="option1">Option One</option>
                <option value="option2">Option Two</option>
                <option value="option3">Option Three</option>
                <option value="option4">Option Four</option>
                </select>
            </div>

            {/* Grid Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                {currentRooms.map((room) => (
                <RoomCard key={room.id} room={room} />
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