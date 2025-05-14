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
            {/*  Overlay  */}
            <div className="inset-0 relative z-10 flex flex-col items-center self-end justify-center h-full text-white text-center px-4">
                {/*  Logo  */}
                <img src={ logoPutih } alt="Roompi Logo" className="h-32 mb-6" />

            </div>

            {/*  Content  */}
            <div className="absolute bottom-[-120px] left-0 right-0 z-10 flex flex-col items-center text-white text-center px-[160px]">

                {/*  Subtext  */}
                <div className="bg-secondary text-black rounded-4xl px-10 py-10 w-full shadow-lg">
                <h2 className="text-4xl hind-madurai-bold text-start mb-1">Good Morning!</h2>
                <p className="mb-4 hind-madurai-regular text-start text-2xl">Find and book flexible spaces, anytime with <span className="primary font-semibold">ROOMPI</span></p>

                    {/*  Search Form  */}
                    <form action="" method="post">
                    <div className="bg-white rounded-full grid grid-cols-1 md:grid-cols-4 gap-4 items-center px-6 py-3">
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
            </section>

    )
}

export default Hero;