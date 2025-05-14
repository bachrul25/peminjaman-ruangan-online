import React from "react";
import bgLetter from "../../assets/images/bg-letter.png";

const Newsletter = () => {
    return (
        <section className="bg-white py-20 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-[160px]">
            <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-lg">
                
                {/* Gambar Kiri */}
                <div className="w-full md:w-1/3 h-52 md:h-auto">
                    <img
                        src={bgLetter}
                        alt="Presentation"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Konten Kanan */}
                <div className="bg-secondary w-full md:w-2/3 flex flex-col justify-center items-center p-6 sm:p-8">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl hind-madurai-bold text-center text-black leading-snug">
                        Get special offers,<br />
                        and more from <span className="text-teal-600 font-bold">ROOMPI</span>
                    </h2>
                    <form className="mt-6 w-full max-w-md flex flex-col sm:flex-row gap-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-3 rounded-full shadow focus:outline-none bg-white hind-madurai-regular text-black text-base"
                        />
                        <button
                            type="submit"
                            className="px-6 py-3 bg-primary text-white hind-madurai-bold rounded-full text-base transition"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
