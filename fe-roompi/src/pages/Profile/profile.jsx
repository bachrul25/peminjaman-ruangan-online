import React from 'react';
import { FaEdit } from 'react-icons/fa';
import NavBar from '../../components/NavBar';

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
      <div className="w-full min-h-screen bg-white text-gray-800 px-6 py-10 hind-madurai-regular">
        <div className="max-w-4xl mx-auto text-start">
          <h2 className="text-xl md:text-2xl font-semibold text-[#008395] mb-2 hind-madurai-semibold">
            Account
          </h2>
          <div className="w-full border-b-2 border-[#008395] mb-6" />

          <div className="flex justify-end mb-6">
            <button className="flex items-center gap-2 text-sm text-gray-700 hover:underline">
              <FaEdit />
              Edit Profile
            </button>
          </div>

          <table className="w-full text-sm md:text-base">
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
                  <td className="font-medium w-40 text-[#008395]">{label}</td>
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
    </>
  );
};

export default Profile;
