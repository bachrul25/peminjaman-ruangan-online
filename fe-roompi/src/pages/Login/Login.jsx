import React from 'react';

const Login = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[url('/bg1.jpg')] bg-cover bg-center relative font-hind px-4">
      {/* Overlay blur and dark background */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* Login form container */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-lg px-6 py-8 sm:px-8 sm:py-10">
        <h2 className="text-2xl sm:text-3xl font-semibold text-black mb-1 text-center">
          Login Account
        </h2>
        <p className="text-sm sm:text-base text-gray-700 mb-6 text-center">
          Login with a registered account
        </p>

        <form className="space-y-4">
          {/* Email input */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main text-sm sm:text-base"
              placeholder="e.g. someone@gmail.com"
              required
            />
          </div>

          {/* Password input */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main text-sm sm:text-base"
              placeholder="Type your password"
              required
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-[#008395] text-white py-2 rounded-md hover:bg-[#006f80] transition duration-200 text-sm sm:text-base"
          >
            Log in
          </button>
        </form>

        {/* Footer link */}
        <p className="text-sm mt-4 text-center text-gray-700">
          Don&apos;t have an account yet?{' '}
          <a href="/register" className="text-black font-semibold hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
