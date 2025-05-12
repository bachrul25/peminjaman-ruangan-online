import { FaFacebookF, FaTwitter, FaTiktok, FaYoutube } from "react-icons/fa";
import payment from "../../assets/images/payment.png";

const Footer = () => {
    return (
        <footer className="bg-black text-white px-[160px] pt-16 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {/* Support */}
            <div>
            <h3 className="hind-madurai-bold text-xl mb-4">Support</h3>
            <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hind-madurai-regular text-base">Help Center</a></li>
                <li><a href="#" className="hind-madurai-regular text-base">Safety information</a></li>
                <li><a href="#" className="hind-madurai-regular text-base">Cancellation options</a></li>
            </ul>
            </div>

            {/* Company */}
            <div>
            <h3 className="hind-madurai-bold text-xl mb-4">Company</h3>
            <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hind-madurai-regular text-base">About us</a></li>
                <li><a href="#" className="hind-madurai-regular text-base">Privacy policy</a></li>
                <li><a href="#" className="hind-madurai-regular text-base">Community Blog</a></li>
                <li><a href="#" className="hind-madurai-regular text-base">Terms of service</a></li>
            </ul>
            </div>

            {/* Contact */}
            <div>
            <h3 className="hind-madurai-bold text-xl mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hind-madurai-regular text-base">FAQ</a></li>
                <li><a href="#" className="hind-madurai-regular text-base">Get in touch</a></li>
                <li><a href="#" className="hind-madurai-regular text-base">Partnerships</a></li>
            </ul>
            </div>

            {/* Social */}
            <div>
            <h3 className="hind-madurai-bold text-xl mb-4">Social</h3>
            <div className="flex space-x-4">
                <a href="#" className="bg-white text-black rounded-full p-2">
                <FaFacebookF />
                </a>
                <a href="#" className="bg-white text-black rounded-full p-2">
                <FaTwitter />
                </a>
                <a href="#" className="bg-white text-black rounded-full p-2">
                <FaTiktok />
                </a>
                <a href="#" className="bg-white text-black rounded-full p-2">
                <FaYoutube />
                </a>
            </div>
            </div>
        </div>

        {/* Garis & Copyright */}
        <div className="border-t border-gray-700 mt-24 pt-6 flex flex-col md:flex-row items-center justify-between hind-madurai-regular text-xs">
            <p className="text-gray-400">© Copyright Roompi 2025</p>
            <div className="flex space-x-3 mt-4 md:mt-0">
            {/* Ganti src dengan path gambar masing-masing */}
            <img src={payment} className="h-7" alt="payment" />
            </div>
        </div>
        </footer>
    );
};

export default Footer;
