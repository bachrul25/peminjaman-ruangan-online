import React from 'react';
import bg from '../../assets/images/bg.png';
import NavBar from '../../components/NavBar';

const Login = () => {
  return (
    <div>
      <NavBar />
      <div
        className="w-full min-h-screen flex items-center justify-center bg-cover bg-center relative font-hind px-4"
        style={{ backgroundImage: `url(${bg})` }}
      >
        {/* Overlay blur and dark background */}
        <div className="absolute inset-0 bg-black/25 backdrop-blur-xs"></div>

        {/* Login form container */}
        <div className="z-10 w-full max-w-[90%] sm:max-w-[400px] md:max-w-[500px] bg-white rounded-2xl shadow-lg px-6 py-8 sm:px-8 sm:py-10">
          <h2 className="text-xl sm:text-2xl hind-madurai-semibold text-black mb-1 text-left">
            Login Account
          </h2>
          <p className="text-base sm:text-lg hind-madurai-regular grey mb-6 text-left">
            Login with a registered account
          </p>

          <form className="space-y-4">
            {/* Email input */}
            <div>
              <label className="block text-base sm:text-lg text-left hind-madurai-regular text-black mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-main text-base sm:text-lg grey"
                placeholder="e.g. someone@gmail.com"
                required
              />
            </div>

            {/* Password input */}
            <div>
              <label className="block text-base sm:text-lg text-left hind-madurai-regular text-black mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-main text-base sm:text-lg grey"
                placeholder="Type your password"
                required
              />
            </div>

            {/* Submit button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-44 sm:w-52 bg-primary text-white hind-madurai-medium py-2 rounded-xl hover:bg-[#006f80] transition duration-200 text-base sm:text-lg"
              >
                Log in
              </button>
            </div>
          </form>

          {/* Footer link */}
          <p className="text-sm sm:text-base hind-madurai-regular mt-4 text-center text-gray-700">
            Don&apos;t have an account yet?{' '}
            <a
              href="/register"
              className="text-black hind-madurai-bold hover:underline"
            >
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
