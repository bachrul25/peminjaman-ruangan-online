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

            <div className="mt-4 mb-14 left-0 right-0 z-10 flex flex-col items-center text-white text-center px-[160px]">

                {/*  Subtext  */}
                <div className="bg-secondary text-black rounded-4xl px-10 py-10 w-full shadow-lg">
                
                    {/*  Search Form  */}
                    <form action="" method="post">
                        <div className="bg-white rounded-full grid grid-cols-1 md:grid-cols-4 gap-4 items-center p-6">
                            <div className="flex items-center">
                                <img src={ location } alt="" className="h-8" />
                                <div className="ml-3">
                                    <label className="block text-base hind-madurai-bold text-start">
                                        Categories
                                    </label>
                                    <select
                                        id="categories"
                                        name="categories"
                                        class="w-full hind-madurai-regular text-base grey focus:outline-none cursor-pointer"
                                        >
                                        <option value="">Add room categories</option>
                                        <option value="option1">Option One</option>
                                        <option value="option2">Option Two</option>
                                        <option value="option3">Option Three</option>
                                        <option value="option4">Option Four</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <img src={ calender } alt="" className="h-8" />
                                <div className="ml-3">
                                    <label className="block text-base hind-madurai-bold text-start">
                                        Check in
                                    </label>
                                    <input
                                        type="date"
                                        id="dateCheckIn"
                                        name='dateCheckIn'
                                        className="w-full hind-madurai-regular text-base grey focus:outline-none cursor-pointer" />
                                </div>
                            </div>
                            <div className="flex items-center">
                                <img src={ calender } alt="" className="h-8" />
                                <div className="ml-3">
                                    <label className="block text-base hind-madurai-bold text-start">
                                        Check out
                                    </label>
                                    <input 
                                        type="date" 
                                        id="dateCheckOut"
                                        name='dateCheckOut'
                                        className="w-full hind-madurai-regular text-base grey focus:outline-none cursor-pointer" />
                                </div>
                            </div>
                            <div className="flex items-center">
                                <img src={ guest } alt="" className="h-8" />
                                <div className="ml-3">
                                    <label className="block text-base hind-madurai-bold text-start">
                                        Guest
                                    </label>
                                    <input 
                                    type="text"
                                    id='guest'
                                    name='guest' 
                                    placeholder="Add guests" 
                                    className="w-full hind-madurai-regular text-base grey focus:outline-none cursor-pointer" />
                                </div>
                                <button className="p-4 rounded-full bg-primary text-white">
                                    <img src={ search } alt="" />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div className="px-[160px] mt-14">
                <div className="flex items-center justify-between mb-11">
                    <h2 className="text-3xl W-3/4 hind-madurai-bold text-black">
                        ROOMPI'S ROOM
                    </h2>
                    <select
                        id="categories"
                        name="categories"
                        class="w-1/4 hind-madurai-regular text-base text-black focus:outline-none cursor-pointer border-1 border-black rounded-lg px-4 py-2"
                        >
                        <option value="">Price</option>
                        <option value="option1">Option One</option>
                        <option value="option2">Option Two</option>
                        <option value="option3">Option Three</option>
                        <option value="option4">Option Four</option>
                    </select>
                </div>

                {/* Grid Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {currentRooms.map((room) => (
                    <RoomCard key={room.id} room={room} />
                ))}
                </div>

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