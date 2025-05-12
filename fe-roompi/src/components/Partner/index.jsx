import React from "react";
import logo1 from "../../assets/logos/logo-1.png";
import logo2 from "../../assets/logos/logo-2.png";
import logo3 from "../../assets/logos/logo-3.png";
import logo4 from "../../assets/logos/logo-4.png";
import logo5 from "../../assets/logos/logo-5.png";
import logo6 from "../../assets/logos/logo-6.png";

const logos = [
    logo1,
    logo2,
    logo3,
    logo4,
    logo5,
    logo6,
    logo1,
    logo2,
    logo3,
    logo4,
    logo5,
    logo6,
];

const Partner = () => {
    const scrollStyle = {
        animation: "scroll 30s linear infinite",
        display: "flex",
        gap: "2.5rem", // sama seperti gap-10 di Tailwind
        whiteSpace: "nowrap",
    };

    return (
        <div className="bg-white py-16 overflow-hidden">
            <h1 className="text-center hind-madurai-bold text-4xl mb-16">OUR PARTNERS</h1>
        <div className="whitespace-nowrap animate-scroll flex items-center gap-22" style={scrollStyle}>
            {logos.map((src, index) => (
            <img
                key={index}
                src={src}
                alt={`logo-${index}`}
                className="h-12 inline-block opacity-70"
            />
            ))}
        </div>

        <style>
            {`
            @keyframes scroll {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-50%); }
            }
            `}
        </style>
        </div>
    );
};

export default Partner;
