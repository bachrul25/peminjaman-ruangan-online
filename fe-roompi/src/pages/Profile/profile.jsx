import React from 'react';
import { FaEdit, FaUserCircle } from 'react-icons/fa';
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
      <div className="w-full min-h-screen bg-white flex items-center justify-center px-4 py-10 font-hind">
        <div className="w-full max-w-2xl bg-gray-50 shadow-xl rounded-2xl p-6 sm:p-10">
          {/* Header */}
          <div className="flex flex-col items-center mb-6">
            <FaUserCircle className="text-[#008395] text-6xl mb-3" />
            <h2 className="text-xl sm:text-2xl font-semibold text-[#008395]">My Profile</h2>
            <p className="text-sm text-gray-600">View and manage your account details</p>
          </div>

          {/* Edit Button */}
          <div className="flex justify-end mb-4">
            <button className="flex items-center gap-2 text-sm text-[#008395] hover:underline font-medium">
              <FaEdit />
              Edit Profile
            </button>
          </div>

          {/* Data List */}
          <div className="space-y-4">
            {[
              ['Username', userData.username],
              ['Full Name', userData.fullName],
              ['Birth Date', userData.birthDate],
              ['Phone Number', userData.phoneNumber],
              ['Email', userData.email],
              ['Gender', userData.gender],
            ].map(([label, value], i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white rounded-xl px-4 py-3 border border-gray-200"
              >
                <span className="text-sm sm:text-base font-medium text-[#008395]">{label}</span>
                <span className="text-sm sm:text-base text-gray-700 mt-1 sm:mt-0">{value}</span>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-8 border-t border-gray-200 pt-4 text-center text-sm text-gray-500">
            Last updated just now
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
