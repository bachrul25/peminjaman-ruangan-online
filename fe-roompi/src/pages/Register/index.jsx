import React from 'react';
import bg from '../../assets/images/bg.png';
import NavBar from '../../components/NavBar';

const Register = () => {
  return (
    <div>
      <NavBar />
      <div
        className="w-full min-h-screen flex items-center justify-center bg-cover bg-center relative font-hind px-4"
        style={{ backgroundImage: `url(${bg})` }}
      >
        {/* Overlay untuk blur dan efek gelap */}
        <div className="absolute inset-0 bg-black/25 backdrop-blur-xs"></div>

        {/* Form Container */}
        <div className="z-10 w-full max-w-[90%] sm:max-w-[400px] md:max-w-[500px] bg-white rounded-2xl shadow-lg px-6 py-8 sm:px-8 sm:py-10">
          <h2 className="text-xl sm:text-2xl hind-madurai-semibold text-black mb-1 text-left">
            Register New Account
          </h2>
          <p className="text-base sm:text-lg hind-madurai-regular grey mb-6 text-left">
            Join as new Roompi’s member
          </p>

          <form className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-base sm:text-lg text-left hind-madurai-regular text-black mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="e.g. someone@gmail.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-main text-base sm:text-lg grey"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-base sm:text-lg text-left hind-madurai-regular text-black mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Type your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-main text-base sm:text-lg grey"
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-base sm:text-lg text-left hind-madurai-regular text-black mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Retype your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-main text-base sm:text-lg grey"
                required
              />
            </div>

            {/* Tombol Submit */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-44 sm:w-52 bg-primary text-white hind-madurai-medium py-2 rounded-xl hover:bg-[#006f80] transition duration-200 text-base sm:text-lg"
              >
                Create Account
              </button>
            </div>
          </form>

          {/* Link ke Login */}
          <div className="text-sm sm:text-base hind-madurai-regular mt-4 text-center text-gray-700">
            Already have an account?{' '}
            <a href="/login" className="text-black hind-madurai-bold hover:underline">
              Log in here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
