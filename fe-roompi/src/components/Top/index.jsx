import React from "react";
import RoomCard from "../RoomCard";
import imgDummy from "../../assets/images/img-dummy.png";
import { Link } from "react-router";


// Contoh data dummy
const rooms = [
    {
        id: 1,
        title: "Deluxe",
        type: "Deluxe",
        cost: 320000,
        image: imgDummy,
        rating: 4.8,
        capacity: 10,
        activeSession: 1,
    },
    {
        id: 2,
        title: "Suite",
        type: "Suite",
        cost: 320000,
        image: imgDummy,
        rating: 4.8,
        capacity: 7,
        activeSession: 1,
    },
    {
        id: 3,
        title: "Premium",
        type: "Premium",
        cost: 320000,
        image: imgDummy,
        rating: 4.8,
        capacity: 15,
        activeSession: 1,
    },
];


const Top = () => {
    return (
        <section className="bg-white pt-18 pb-16 px-[160px]">
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start mb-10">
                <div>
                    <h2 className="text-3xl hind-madurai-bold text-black mb-9">
                    DISCOVER THE PERFECT WORKSPACE FOR YOUR NEEDS!
                    </h2>
                    <p className="text-black text-xl hind-madurai-regular max-w-3xl">
                    Every space at ROOMPI’S ROOM is designed to inspire and comfort. Choose your favorite room and boost productivity in the perfect setting!
                    </p>
                </div>
                <button className="mt-4 md:mt-0 bg-primary hind-madurai-bold text-base text-white px-6 py-2 rounded-full flex items-center gap-2">
                    <Link to="/rooms" className="text-white">
                        See all →
                    </Link>
                </button>
            </div>

            {/* Grid Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {rooms.map((room) => (
                <RoomCard key={room.id} room={room} />
            ))}
            </div>
        </div>
        </section>
    );
};

export default Top;
