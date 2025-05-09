import React from 'react';

const Login = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[url('/bg1.jpg')] bg-cover bg-center relative font-hind">
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-xl font-semibold text-black mb-1">Login Account</h2>
        <p className="text-sm text-gray-700 mb-6">Login With a Registered Account</p>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-800">Email</label>
            <input
              type="email"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main"
              placeholder="e.g. someone@gmail.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800">Password</label>
            <input
              type="password"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main"
              placeholder="Type your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#008395] text-white py-2 rounded-md hover:bg-[#008395] transition duration-200"
          >
            Log in
          </button>
        </form>

        <p className="text-sm mt-4 text-center text-gray-700">
          Don't have an account yet?{' '}
          <a href="/register" className="text-black font-semibold hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
