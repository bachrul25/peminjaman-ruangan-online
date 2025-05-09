import React from 'react';

const Register = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[url('/bg1.jpg')] bg-cover bg-center relative font-hind">
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      <div className="relative z-10 w-full max-w-lg p-10 bg-white rounded-3xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-900 mb-1 text-left">
          Register new account
        </h2>
        <p className="text-sm text-gray-600 mb-6 text-left">
          Join as new Roompi’s member
        </p>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="e.g. someone@gmail.com"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main placeholder-gray-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Type your password"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main placeholder-gray-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm your password</label>
            <input
              type="password"
              placeholder="Retype your password"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main placeholder-gray-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#008395] text-white py-2 rounded-md transition duration-200 text-lg font-medium hover:bg-[#008395]"
        >
  Create account
</button>
        </form>

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

