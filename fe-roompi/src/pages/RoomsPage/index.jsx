import NavBar from "../../components/NavBar";
import guest from '../../assets/images/guest.png';
import calender from '../../assets/images/calender.png';
import location from '../../assets/images/location.png';
import search from '../../assets/images/search.png';
import Footer from "../../components/Footer";
import RoomCard from "../../components/RoomCard";
import imgDummy from "../../assets/images/img-dummy.png";
import Newsletter from "../../components/Newsletter";
import { useState } from "react";
import Pagination from "../../components/Pagination";

// Data dummy
const rooms = [
    { id: 1, title: "Deluxe", type: "Deluxe", cost: 320000, image: imgDummy, rating: 4.8, capacity: 10, activeSession: 1 },
    { id: 2, title: "Suite", type: "Suite", cost: 320000, image: imgDummy, rating: 4.8, capacity: 7, activeSession: 1 },
    { id: 3, title: "Premium", type: "Premium", cost: 320000, image: imgDummy, rating: 4.8, capacity: 15, activeSession: 1 },
    { id: 4, title: "Deluxe", type: "Deluxe", cost: 320000, image: imgDummy, rating: 4.8, capacity: 10, activeSession: 1 },
    { id: 5, title: "Suite", type: "Suite", cost: 320000, image: imgDummy, rating: 4.8, capacity: 7, activeSession: 1 },
    { id: 6, title: "Premium", type: "Premium", cost: 320000, image: imgDummy, rating: 4.8, capacity: 15, activeSession: 1 },
];

function RoomsPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const roomsPerPage = 3;
    const totalPages = Math.ceil(rooms.length / roomsPerPage);

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

            {/* Filter Area */}
            <div className="mt-4 mb-14 z-10 flex flex-col items-center text-center px-4 sm:px-6 lg:px-10 xl:px-20">
                <div className="bg-secondary text-black rounded-3xl w-full shadow-lg px-6 py-10">
                    <form method="post">
                        <div className="bg-white rounded-3xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
                            {/* Kategori */}
                            <div className="flex items-center">
                                <img src={location} alt="" className="h-8" />
                                <div className="ml-3 w-full">
                                    <label className="block text-base hind-madurai-bold text-start">Categories</label>
                                    <select className="w-full hind-madurai-regular text-base text-gray-700 border rounded-md px-2 py-1 focus:outline-none">
                                        <option value="">Add room categories</option>
                                        <option value="option1">Option One</option>
                                        <option value="option2">Option Two</option>
                                    </select>
                                </div>
                            </div>

                            {/* Check-in */}
                            <div className="flex items-center">
                                <img src={calender} alt="" className="h-8" />
                                <div className="ml-3 w-full">
                                    <label className="block text-base hind-madurai-bold text-start">Check in</label>
                                    <input type="date" className="w-full text-base border rounded-md px-2 py-1 focus:outline-none" />
                                </div>
                            </div>

                            {/* Check-out */}
                            <div className="flex items-center">
                                <img src={calender} alt="" className="h-8" />
                                <div className="ml-3 w-full">
                                    <label className="block text-base hind-madurai-bold text-start">Check out</label>
                                    <input type="date" className="w-full text-base border rounded-md px-2 py-1 focus:outline-none" />
                                </div>
                            </div>

                            {/* Guest + Button */}
                            <div className="flex items-center">
                                <img src={guest} alt="" className="h-8" />
                                <div className="ml-3 w-full flex items-center gap-2">
                                    <div className="flex-1">
                                        <label className="block text-base hind-madurai-bold text-start">Guest</label>
                                        <input type="text" placeholder="Add guests" className="w-full text-base border rounded-md px-2 py-1 focus:outline-none" />
                                    </div>
                                    <button type="submit" className="p-3 bg-primary rounded-full">
                                        <img src={search} alt="" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* Room List */}
            <div className="px-4 sm:px-6 lg:px-10 xl:px-20 mt-14">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-11 gap-4">
                    <h2 className="text-2xl sm:text-3xl hind-madurai-bold text-black">ROOMPI'S ROOM</h2>
                    <select className="w-full sm:w-60 text-base border border-black rounded-lg px-4 py-2 focus:outline-none">
                        <option value="">Price</option>
                        <option value="option1">Option One</option>
                        <option value="option2">Option Two</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
