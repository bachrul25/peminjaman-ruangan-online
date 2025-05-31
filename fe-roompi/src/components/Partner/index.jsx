import React from "react";
import logo1 from "../../assets/logos/logo-1.png";
import logo2 from "../../assets/logos/logo-2.png";
import logo3 from "../../assets/logos/logo-3.png";
import logo4 from "../../assets/logos/logo-4.png";
import logo5 from "../../assets/logos/logo-5.png";
import logo6 from "../../assets/logos/logo-6.png";

const logos = [
  logo1, logo2, logo3, logo4, logo5, logo6,
  logo1, logo2, logo3, logo4, logo5, logo6,
];

const Partner = () => {
  return (
    <div className="bg-white py-12 overflow-hidden">
      <h1 className="text-center hind-madurai-bold text-2xl sm:text-3xl md:text-4xl mb-10 sm:mb-16">
        OUR PARTNERS
      </h1>
      <div className="relative">
        <div className="flex gap-10 animate-scroll whitespace-nowrap px-4 sm:px-8">
          {logos.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`logo-${index}`}
              className="h-8 sm:h-10 md:h-12 opacity-70 inline-block"
            />
          ))}
        </div>
      </div>

      {/* Animasi scroll */}
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            animation: scroll 30s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Partner;
