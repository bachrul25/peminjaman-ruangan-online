import React from 'react';
import { FaEdit } from 'react-icons/fa';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';

const Profile = () => {
  const userData = {
    username: 'Mike_Wz14',
    fullName: 'Mike Wazowski',
    birthDate: '04 June 1989',
    phoneNumber: '+621234567890',
    email: 'mike.wazowski@monster.inc',
    gender: 'Male',
  };

  return (
    <>
      <NavBar />

      <div className="bg-white text-gray-800 px-[160px] py-20 hind-madurai-regular">
        <div className="text-start">
          <h2 className="text-2xl hind-madurai-bold primary mb-2 hind-madurai-semibold">
            Account
          </h2>
          <div className="w-full border-b-2 border-[#008395] mb-6" />

          <div className="flex justify-end mb-6">
            <button className="flex items-center gap-2 text-lg hind-madurai-medium primary hover:underline">
              <FaEdit />
              Edit Profile
            </button>
          </div>

          <table className="w-full text-lg hind-madurai-regular">
            <tbody>
              {[
                ['Username', userData.username],
                ['Full Name', userData.fullName],
                ['Birth Date', userData.birthDate],
                ['Phone Number', userData.phoneNumber],
                ['Email', userData.email],
                ['Gender', userData.gender],
              ].map(([label, value], i) => (
                <tr key={i} className="h-12">
                  <td className="font-medium w-40 primary">{label}</td>
                  <td className="w-2">:</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Garis bawah akhir */}
          <div className="mt-12 border-b-2 border-[#008395] w-full" />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Profile;