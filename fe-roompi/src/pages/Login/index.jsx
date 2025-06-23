import React, { useState } from 'react';
import bg from '../../assets/images/bg.png';
import NavBar from '../../components/NavBar';
import { Link, useNavigate } from 'react-router';
import { loginUser } from '../../_services/auth';



const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [ error, setError ] = useState(null);
  const [ loading, setLoading ] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await loginUser(formData);
      
      
      if (response.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

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

          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-center">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email input */}
            <div>
              <label className="block text-base sm:text-lg text-left hind-madurai-regular text-black mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-main text-base sm:text-lg grey"
                placeholder="e.g. someone@gmail.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Password input */}
            <div>
              <label className="block text-base sm:text-lg text-left hind-madurai-regular text-black mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-main text-base sm:text-lg grey"
                placeholder="Type your password"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {/* Submit button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-44 sm:w-52 bg-primary text-white hind-madurai-medium py-2 rounded-xl hover:cursor-pointer hover:bg-secondary transition duration-200 text-base sm:text-lg"
              >
                {loading ? "Loging in..." : "Log In"}
              </button>
            </div>
          </form>

          {/* Footer link */}
          <p className="text-sm sm:text-base hind-madurai-regular mt-4 text-center text-gray-700">
            Don&apos;t have an account yet?{' '}
            <Link
              to="/register"
              className="text-black hind-madurai-bold hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;