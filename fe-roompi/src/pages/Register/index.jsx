import React, { useState } from 'react';
import bg from '../../assets/images/bg.png';
import NavBar from '../../components/NavBar';
import { Link, useNavigate } from 'react-router';
import { registerUser } from '../../_services/auth';



const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    telepon: '',
    email: '',
    password: '',
  });
  const [ error, setError ] = useState(null);
  const [ loading, setLoading ] = useState(false);
  const [success, setSuccess] = useState('');
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
    setSuccess('');

    try {
      if (formData.password !== e.target.password_confirmation.value) {
        setError({ password: ['Passwords do not match'] });
        setLoading(false);
        return
      }
      const response = await registerUser(formData);
      
      if (response.success) {
        setSuccess('Registration successful! Redirecting to login...');
        navigate('/login');
      }
    } catch (err) {
      if (err.response?.status === 422) {
        setError(err.response.data.errors);
      } else {
        setError({ general: [err.response?.data?.message || 'Registration failed'] });
      }
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

          {error?.general && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-center">
              {error.general[0]}
            </div>
          )}

          {success && (
            <div className="mb-4 p-2 bg-green-100 text-green-700 rounded text-center">
              {success}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label className="block text-base sm:text-lg text-left hind-madurai-regular text-black mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="e.g. someone"
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-main text-base sm:text-lg grey"
                required
                value={formData.name}
                onChange={handleChange}
              />
              {error?.name && <span className="text-red-500 text-sm">{error.name[0]}</span>}
            </div>

            {/* No telp */}
            <div>
              <label className="block text-base sm:text-lg text-left hind-madurai-regular text-black mb-1">
                Phone Number
              </label>
              <input
                type="text"
                name="telepon"
                placeholder="e.g. 085125250375"
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-main text-base sm:text-lg grey"
                required
                value={formData.telepon}
                onChange={handleChange}
              />
              {error?.telepon && <span className="text-red-500 text-sm">{error.telepon[0]}</span>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-base sm:text-lg text-left hind-madurai-regular text-black mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="e.g. someone@gmail.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-main text-base sm:text-lg grey"
                required
                value={formData.email}
                onChange={handleChange}
              />
              {error?.email && <span className="text-red-500 text-sm">{error.email[0]}</span>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-base sm:text-lg text-left hind-madurai-regular text-black mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Type your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-main text-base sm:text-lg grey"
                required
                value={formData.password}
                onChange={handleChange}
              />
              {error?.password && <span className="text-red-500 text-sm">{error.password[0]}</span>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-base sm:text-lg text-left hind-madurai-regular text-black mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="password_confirmation"
                placeholder="Retype your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-main text-base sm:text-lg grey"
                required
                onChange={handleChange}
              />
            </div>

            {/* Tombol Submit */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-44 sm:w-52 bg-primary text-white hind-madurai-medium py-2 rounded-xl hover:bg-[#006f80] transition duration-200 text-base sm:text-lg"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </div>
          </form>

          {/* Link ke Login */}
          <div className="text-sm sm:text-base hind-madurai-regular mt-4 text-center text-gray-700">
            Already have an account?{' '}
            <Link to="/login" className="text-black hind-madurai-bold hover:underline">
              Log in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;