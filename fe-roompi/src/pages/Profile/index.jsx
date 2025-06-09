import React, { useEffect, useState } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { logout } from '../../_services/auth';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (!token || !user) {
      navigate('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(user); // ubah dari string ke object
      setUserData(parsedUser);
      setLoading(false);
    } catch (error) {
      console.error('Gagal parse data user dari localStorage:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    }
  }, [navigate]);


  const token = localStorage.getItem("token");

  const handleLogout = async () => {
    if (token) {
      await logout({ token });
      localStorage.removeItem("user");
    }
    navigate("/");
  }

  return (
    <>
      <NavBar />

      <div className="bg-white text-gray-800 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-[160px] py-10 sm:py-16 md:py-20 hind-madurai-regular">
        <div className="text-start">
          <h2 className="mb-2 text-xl sm:text-2xl md:text-3xl hind-madurai-bold primary">
            Account
          </h2>
          <div className="w-full border-b-2 border-[#008395] mb-6" />

          <div className="flex justify-end mb-6">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-base md:text-lg hind-madurai-medium primary hover:underline">
              <FaSignOutAlt />
              Sign Out
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center">
              <DotLottieReact
                src="https://lottie.host/23b16525-b459-4439-8ff8-988cac9361ed/uxoKeCLnsu.lottie"
                loop
                autoplay
                className="w-64 h-64"
              />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm sm:text-base md:text-lg hind-madurai-regular">
                <tbody>
                  {[
                    ['Username', userData.name ?? '-'],
                    ['Phone Number', userData.telepon ?? '-'],
                    ['Email', userData.email ?? '-'],
                    ['Role', userData.role ?? '-'],
                  ].map(([label, value], i) => (
                    <tr key={i} className="h-10 sm:h-12">
                      <td className="w-32 font-medium sm:w-40 primary">{label}</td>
                      <td className="w-2">:</td>
                      <td className="break-all">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          

          <div className="mt-10 sm:mt-12 border-b-2 border-[#008395] w-full" />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Profile;
