// src/components/Pagination.jsx
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex justify-center items-center mt-12 space-x-3">
        {/* Tombol Previous */}
        <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
            currentPage === 1
                ? "bg-gray-300 text-white cursor-not-allowed"
                : "bg-primary text-white hover:bg-primary-dark"
            }`}
        >
            <FaChevronLeft />
        </button>

        {/* Tombol Halaman */}
        {pages.map((page) => (
            <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 rounded-md border text-black font-semibold ${
                currentPage === page
                ? "bg-primary text-white"
                : "border-gray-300 hover:bg-gray-100"
            }`}
            >
            {page}
            </button>
        ))}

        {/* Tombol Next */}
        <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
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
