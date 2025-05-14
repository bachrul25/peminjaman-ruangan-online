import React from "react";
import "../../assets/css/global.css";
import dollar from "../../assets/images/dollar.png";
import secure from "../../assets/images/secure.png";
import refresh from "../../assets/images/refresh.png";

const Features = () => {
    const features = [
        {
            icon: dollar,
            title: "Competitive Prices",
            description:
                "Enjoy affordable rates for a wide range of meeting and coworking spaces, with no hidden fees.",
        },
        {
            icon: secure,
            title: "Secure Booking",
            description:
                "Fast and secure booking process with a reliable system. Your data is protected and your transactions are safe.",
        },
        {
            icon: refresh,
            title: "Seamless Experience",
            description:
                "Find and book your ideal workspace in just a few clicks. An intuitive interface for a smooth and hassle-free experience.",
        },
    ];

    return (
        <div className="bg-white mt-20 sm:mt-32 lg:mt-40 pt-12 mb-20 sm:mb-24 lg:mb-28 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-[160px]">
            <h1 className="hind-madurai-bold text-center text-2xl sm:text-3xl md:text-4xl text-black">
                WHY CHOOSE US?
            </h1>

            <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-center">
                {features.map((feature, index) => (
                    <div key={index} className="flex flex-col items-center px-4">
                        <div className="bg-blue-100 text-blue-500 text-3xl rounded-xl p-4 mb-4">
                            <img src={feature.icon} className="w-10" alt={`${feature.title} icon`} />
                        </div>
                        <h3 className="text-lg sm:text-xl md:text-2xl hind-madurai-bold mt-8 text-black">
                            {feature.title}
                        </h3>
                        <p className="text-sm sm:text-base hind-madurai-regular text-black mt-4">
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Features;
