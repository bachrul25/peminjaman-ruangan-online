import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    axios
      .get('http://localhost:8000/api/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUserData(response.data.user);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Gagal mengambil data user:', error);
        localStorage.removeItem('token');
        navigate('/login');
      });
  }, [navigate]);

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <>
      <NavBar />

      <div className="bg-white text-gray-800 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-[160px] py-10 sm:py-16 md:py-20 hind-madurai-regular">
        <div className="text-start">
          <h2 className="text-xl sm:text-2xl md:text-3xl hind-madurai-bold primary mb-2">
            Account
          </h2>
          <div className="w-full border-b-2 border-[#008395] mb-6" />

          <div className="flex justify-end mb-6">
            <button className="flex items-center gap-2 text-base md:text-lg hind-madurai-medium primary hover:underline">
              <FaEdit />
              Edit Profile
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm sm:text-base md:text-lg hind-madurai-regular">
              <tbody>
                {[
                  ['Username', userData.username ?? '-'],
                  ['Full Name', userData.nama ?? '-'],
                  ['Phone Number', userData.telepon ?? '-'],
                  ['Email', userData.email ?? '-'],
                  ['Role', userData.role ?? '-'],
                ].map(([label, value], i) => (
                  <tr key={i} className="h-10 sm:h-12">
                    <td className="font-medium w-32 sm:w-40 primary">{label}</td>
                    <td className="w-2">:</td>
                    <td className="break-all">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 sm:mt-12 border-b-2 border-[#008395] w-full" />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Profile;
