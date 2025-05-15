import React from 'react';
import logoPutih from '../../assets/images/logo-putih.png';
import bg from '../../assets/images/bg.png';
import guest from '../../assets/images/guest.png';
import calender from '../../assets/images/calender.png';
import location from '../../assets/images/location.png';
import search from '../../assets/images/search.png';

function Hero() {   
    return(
        <section className="relative h-[600px] bg-cover bg-center" style={{backgroundImage: `url(${bg})`}}>
            {/* Overlay */}
            <div className="inset-0 relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
                <img src={logoPutih} alt="Roompi Logo" className="h-24 sm:h-28 md:h-32 mb-4 sm:mb-6" />
            </div>

            {/* Content */}
            <div className="absolute bottom-[-180px] sm:bottom-[-150px] md:bottom-[-120px] left-0 right-0 z-10 flex flex-col items-center px-4 sm:px-10 md:px-20 lg:px-40 xl:px-[160px]">
                <div className="bg-secondary text-black rounded-3xl px-4 sm:px-8 md:px-10 py-6 sm:py-8 md:py-10 w-full shadow-lg">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl hind-madurai-bold text-start mb-2">Good Morning!</h2>
                    <p className="mb-4 hind-madurai-regular text-start text-lg sm:text-xl md:text-2xl">
                        Find and book flexible spaces, anytime with <span className="primary font-semibold">ROOMPI</span>
                    </p>

                    {/* Search Form */}
                    <form action="" method="post">
                        <div className="bg-white rounded-2xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-center px-4 sm:px-6 py-4">
                            {/* Categories */}
                            <div className="flex items-center">
                                <img src={location} alt="" className="h-6 sm:h-8" />
                                <div className="ml-2 sm:ml-3 w-full">
                                    <label className="block text-sm sm:text-base hind-madurai-bold text-start">Categories</label>
                                    <select
                                        id="categories"
                                        name="categories"
                                        className="w-full hind-madurai-regular text-sm sm:text-base text-gray-700 focus:outline-none cursor-pointer"
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
                                    <label className="block text-sm sm:text-base hind-madurai-bold text-start">Check in</label>
                                    <input
                                        type="date"
                                        id="dateCheckIn"
                                        name="dateCheckIn"
                                        className="w-full hind-madurai-regular text-sm sm:text-base text-gray-700 focus:outline-none cursor-pointer"
                                    />
                                </div>
                            </div>

                            {/* Check Out */}
                            <div className="flex items-center">
                                <img src={calender} alt="" className="h-6 sm:h-8" />
                                <div className="ml-2 sm:ml-3 w-full">
                                    <label className="block text-sm sm:text-base hind-madurai-bold text-start">Check out</label>
                                    <input
                                        type="date"
                                        id="dateCheckOut"
                                        name="dateCheckOut"
                                        className="w-full hind-madurai-regular text-sm sm:text-base text-gray-700 focus:outline-none cursor-pointer"
                                    />
                                </div>
                            </div>

                            {/* Guest */}
                            <div className="flex items-center">
                                <img src={guest} alt="" className="h-6 sm:h-8" />
                                <div className="ml-2 sm:ml-3 w-full">
                                    <label className="block text-sm sm:text-base hind-madurai-bold text-start">Guest</label>
                                    <input
                                        type="text"
                                        id="guest"
                                        name="guest"
                                        placeholder="Add guests"
                                        className="w-full hind-madurai-regular text-sm sm:text-base text-gray-700 focus:outline-none cursor-pointer"
                                    />
                                </div>
                                <button className="ml-2 p-3 sm:p-4 rounded-full bg-primary text-white">
                                    <img src={search} alt="" className="h-4 sm:h-5" />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Hero;
