import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      await axios.post("http://127.0.0.1:8000/account/register/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.info("Check Your Email to Activate Account");

      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-[50vh] px-5 py-5">
      <div className="xl:max-w-7xl bg-white drop-shadow-lg border border-black/20 w-full rounded-md flex justify-between items-stretch px-5 xl:px-5 py-2.5">
        <div className="sm:w-[60%] lg:w-[50%] bg-cover bg-center items-center justify-center hidden md:flex relative">
          <div className="absolute top-5 left-50 text-center space-y-4">
            <p className="text-lg m-2 font-semibold text-gray-700">
              Already a member ?
            </p>
            <Link
              to="/login"
              className="bg-[#002D74] text-white py-2 px-4 rounded-xl hover:bg-[#1f456b] transition duration-300"
            >
              Login
            </Link>
          </div>
          <img
            src="https://www.tailwindtap.com/assets/components/form/createaccount/login.svg"
            alt="signup"
            className="h-[500px]"
          />
        </div>

        <div className="mx-auto w-full lg:w-1/2 md:p-10 py-5 md:py-0">
          <h1 className="text-center text-2xl sm:text-3xl font-semibold text-blue-800">
            Create Account
          </h1>

          <form onSubmit={onSubmit} className="w-full mt-5 sm:mt-8">
            <div className="mx-auto w-full sm:max-w-md md:max-w-lg flex flex-col gap-5">
              <input
                name="username"
                className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:border focus:outline-none"
                type="text"
                placeholder="Username"
              />
              <input
                name="email"
                className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:border focus:outline-none"
                type="email"
                placeholder="Email Address"
              />
              <input
                name="first_name"
                className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:border focus:outline-none"
                type="text"
                placeholder="First Name"
              />
              <input
                name="last_name"
                className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:border focus:outline-none"
                type="text"
                placeholder="Last Name"
              />
              <input
                name="password"
                className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:border focus:outline-none"
                type="password"
                placeholder="Password"
              />
              <input
                name="confirm_password"
                className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:border focus:outline-none"
                type="password"
                placeholder="Confirm Password"
              />
              <select
                name="account_type"
                className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:border focus:outline-none"
              >
                <option value="" disabled>
                  Select Account Type
                </option>
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
              <input
                name="address"
                className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:border focus:outline-none"
                type="text"
                placeholder="Address"
              />
              <input
                name="mobile_number"
                className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:border focus:outline-none"
                type="text"
                placeholder="Mobile Number"
              />
              <input
                name="image"
                type="file"
                className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:border focus:outline-none"
              />
              <button
                type="submit"
                className="w-full py-3 px-5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
