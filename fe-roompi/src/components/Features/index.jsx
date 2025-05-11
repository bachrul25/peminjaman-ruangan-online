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
        <div className="bg-white mt-40 pt-12 mb-28 px-[160px]">
            <h1 className="hind-madurai-bold text-center text-4xl">WHY CHOOSE US?</h1>
            <div className="max-w-6xl mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {features.map((feature, index) => (
                <div key={index} className="flex flex-col items-center">
                    <div className="bg-blue-100 text-blue-500 text-3xl rounded-xl p-4 mb-4">
                        <img src={ feature.icon } className="w-10" alt="" />
                    </div>
                    <h3 className="text-xl hind-madurai-bold mt-12 text-black">
                    {feature.title}
                    </h3>
                    <p className="text-base hind-madurai-regular text-black mt-6">{feature.description}</p>
                </div>
                ))}
            </div>
        </div>
    );
};

export default Features;
