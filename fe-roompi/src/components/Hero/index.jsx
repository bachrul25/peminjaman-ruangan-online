import React, { useEffect, useState } from 'react';
import logoPutih from '../../assets/images/logo-putih.png';
import bg from '../../assets/images/bg.png';
import guest from '../../assets/images/guest.png';
import location from '../../assets/images/location.png';
import search from '../../assets/images/search.png';
import { useNavigate } from 'react-router';
import { getTypes } from '../../_services/types';

function Hero() {
    const navigate = useNavigate();
    const [types, setType] = useState([])

    const [selectedTipe, setSelectedTipe] = useState('');
    const [minCapacity, setMinCapacity] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const typeData = await getTypes();
                setType(typeData)
            } catch (error) {
                
            }
        }

        fetchData();
    })

    const handleSubmitFilter = (e) => {
        e.preventDefault();

        // Buat query parameter untuk URL
        const params = new URLSearchParams();
        if (selectedTipe) params.append('tipe_id', selectedTipe);
        if (minCapacity) params.append('min_capacity', minCapacity);

        // Redirect ke halaman RoomsPage dengan query string
        navigate(`/rooms?${params.toString()}`);
    };
    
    return(
        <section className="relative h-[600px] bg-cover bg-center" style={{backgroundImage: `url(${bg})`}}>
            {/* Overlay */}
            <div className="relative inset-0 z-10 flex flex-col items-center justify-center h-full px-4 text-center text-white">
                <img src={logoPutih} alt="Roompi Logo" className="h-24 mb-4 sm:h-28 md:h-32 sm:mb-6" />
            </div>

            {/* Content */}
            <div className="absolute bottom-[-180px] sm:bottom-[-150px] md:bottom-[-120px] left-0 right-0 z-10 flex flex-col items-center px-4 sm:px-10 md:px-20 lg:px-40 xl:px-[160px]">
                <div className="w-full px-4 py-6 text-black shadow-lg bg-secondary rounded-3xl sm:px-8 md:px-10 sm:py-8 md:py-10">
                    <h2 className="mb-2 text-2xl sm:text-3xl md:text-4xl hind-madurai-bold text-start">Good Morning!</h2>
                    <p className="mb-4 text-lg hind-madurai-regular text-start sm:text-xl md:text-2xl">
                        Find and book flexible spaces, anytime with <span className="font-semibold primary">ROOMPI</span>
                    </p>

                    {/* Search Form */}
                    <form onSubmit={handleSubmitFilter}>
                        <div className="grid items-center grid-cols-1 gap-8 px-4 py-4 bg-white rounded-2xl sm:grid-cols-2 md:grid-cols-2 sm:px-6">
                            {/* Categories */}
                            <div className="flex items-center">
                                <img src={location} alt="" className="h-6 sm:h-8" />
                                <div className="w-full ml-2 mr-4 sm:ml-3">
                                    <label className="block text-sm sm:text-base hind-madurai-bold text-start">Categories</label>
                                    <select
                                        id="categories"
                                        name="categories"
                                        value={selectedTipe}
                                        onChange={(e) => setSelectedTipe(e.target.value)}
                                        className="w-full text-sm cursor-pointer hind-madurai-regular sm:text-base grey focus:outline-none"
                                    >
                                        <option value="">Default categories</option>
                                        {types.map((type) => (
                                            <option value={type.id_tipe}>{type.nama}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Guest */}
                            <div className="flex items-center">
                                <img src={guest} alt="" className="h-6 sm:h-8" />
                                <div className="w-full ml-2 sm:ml-3">
                                    <label className="block text-sm sm:text-base hind-madurai-bold text-start">Min. Capacity</label>
                                    <input 
                                        type="number"
                                        id="session"
                                        name="session"
                                        min={1}
                                        placeholder='Default capacity'
                                        value={minCapacity}
                                        onChange={(e) => setMinCapacity(e.target.value)}
                                        className='w-full text-base cursor-pointer hind-madurai-regular grey focus:outline-none' />
                                </div>
                                <button type='submit' className="p-3 ml-2 text-white rounded-full cursor-pointer bg-primary">
                                    <img src={search} alt="" className="" />
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
