import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex flex-wrap justify-center items-center mt-12 gap-2 sm:gap-3">
            {/* Tombol Previous */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-base ${
                    currentPage === 1
                        ? "bg-gray-300 text-white cursor-not-allowed"
                        : "bg-primary text-white hover:bg-primary-dark"
                }`}
            >
                <FaChevronLeft />
            </button>

            {/* Tombol Halaman */}
            <div className="flex overflow-x-auto gap-2 scrollbar-hide">
                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-md border font-semibold text-sm sm:text-base ${
                            currentPage === page
                                ? "bg-primary text-white"
                                : "border-gray-300 hover:bg-gray-100 text-black"
                        }`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            {/* Tombol Next */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-base ${
                    currentPage === totalPages
                        ? "bg-gray-300 text-white cursor-not-allowed"
                        : "bg-primary text-white hover:bg-primary-dark"
                }`}
            >
                <FaChevronRight />
            </button>
        </div>
    );
};

export default Pagination;
