import React from 'react';

const Register = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[url('/bg1.jpg')] bg-cover bg-center relative font-hind px-4">
      {/* Overlay for dark blur effect */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* Form Container */}
      <div className="relative z-10 w-full max-w-lg bg-white rounded-3xl shadow-lg px-6 py-8 sm:px-10 sm:py-10">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-1 text-left">
          Register New Account
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mb-6 text-left">
          Join as new Roompi’s member
        </p>

        <form className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="e.g. someone@gmail.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main text-sm sm:text-base placeholder-gray-400"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Type your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main text-sm sm:text-base placeholder-gray-400"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              placeholder="Retype your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main text-sm sm:text-base placeholder-gray-400"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#008395] text-white py-2 rounded-md transition duration-200 hover:bg-[#006f80] text-sm sm:text-base font-medium"
          >
            Create Account
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-left text-sm text-gray-700">
          Already have an account?{' '}
          <a href="/login" className="text-main font-semibold hover:underline">
            Log in here
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
