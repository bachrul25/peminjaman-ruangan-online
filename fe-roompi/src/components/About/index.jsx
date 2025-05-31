import React from "react";
import "../../assets/css/global.css";
import bgAbout from "../../assets/images/bg-about.png";
import img1 from "../../assets/images/img-1.png";
import img2 from "../../assets/images/img-2.png";
import img3 from "../../assets/images/img-3.png";

const About = () => {
    return (
        <section
            className="relative bg-cover bg-center bg-no-repeat text-white py-20 sm:py-28 md:py-36"
            style={{ backgroundImage: `url(${bgAbout})` }}
        >
            <div className="w-full px-4 sm:px-8 md:px-12 lg:px-20 xl:px-[160px]">
                <h2 className="text-3xl sm:text-4xl md:text-5xl hind-madurai-bold mb-10 sm:mb-12 md:mb-14">
                    ABOUT ROOMPI
                </h2>

                <div className="border-t border-white w-full pt-8 sm:pt-10 md:pt-12"></div>

                {/* Grid 2 kolom: Deskripsi dan Gambar */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 lg:gap-36 items-start">
                    {/* Deskripsi */}
                    <div>
                        <p className="text-base sm:text-lg md:text-xl hind-madurai-regular">
                            Roompi is a smart solution for booking meeting and coworking spaces on demand, flexible, and effortless.
                            Whether for brainstorming, presentations, or team catch-ups, we connect you to inspiring rooms that fit your vibe and needs.
                        </p>
                    </div>

                    {/* Gambar */}
                    <div className="grid grid-cols-2 grid-rows-2 gap-4">
                        <img
                            src={img3}
                            alt="Room 1"
                            className="rounded-2xl row-span-2 w-full h-full object-cover"
                        />
                        <img
                            src={img2}
                            alt="Room 2"
                            className="rounded-2xl w-full h-full object-cover"
                        />
                        <img
                            src={img1}
                            alt="Room 3"
                            className="rounded-2xl w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
