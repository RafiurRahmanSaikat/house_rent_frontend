import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import backEndApi from "../../utils/constant";

const Signup = () => {
  const [imageData, setImageData] = useState({ file: null, preview: null });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    if (!imageData.file) {
      toast.error("Please upload an image.");
      return;
    }

    const password = formData.get("password");
    const confirmPassword = formData.get("confirm_password");
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const imgBBApiKey = "1852d1780a7c1d17aff8afe66b4878a8";
    const imgFormData = new FormData();
    imgFormData.append("image", imageData.file);

    setLoading(true);

    try {
      const imgbbResponse = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgBBApiKey}`,
        imgFormData
      );

      const imageUrlFromImgBB = imgbbResponse.data.data.url;

      formData.delete("image");

      formData.append("image", imageUrlFromImgBB);

      await axios.post(`${backEndApi}/account/register/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.info("Check Your Email to Activate Account");
      setLoading(false);
      setImageData({ file: null, preview: null });
      e.target.reset();
      navigate("/login");
    } catch (error) {
      setLoading(false);
      console.log(error.response.data);
      toast.error("Registration failed. Please ensure all fields are valid.");
    }
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImageData({
        file: selectedFile,
        preview: URL.createObjectURL(selectedFile),
      });
    } else {
      setImageData({ file: null, preview: null });
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-[50vh] px-5 py-5">
      <div className="xl:max-w-7xl bg-white drop-shadow-lg border border-black/20 w-full rounded-md flex justify-between items-stretch px-5 xl:px-5 py-2.5">
        <div className="sm:w-[60%] lg:w-[50%] bg-cover bg-center items-center justify-center hidden md:flex relative">
          <div className="absolute top-5 left-50 text-center space-y-4">
            <p className="text-lg m-2 font-semibold text-gray-700">
              Already a member?
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
            <div className="mx-auto w-full sm:max-w-md md:max-w-lg flex flex-col gap-5 items-center">
              {imageData.preview && (
                <div className="mt-4">
                  <img
                    src={imageData.preview}
                    alt="Preview"
                    className="w-40 h-40 object-cover rounded-full"
                  />
                </div>
              )}

              <input
                name="image"
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:border focus:outline-none"
              />

              <input
                name="username"
                className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:border focus:outline-none"
                type="text"
                placeholder="Username"
                required
              />
              <input
                name="email"
                className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:border focus:outline-none"
                type="email"
                placeholder="Email Address"
                required
              />
              <input
                name="first_name"
                className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:border focus:outline-none"
                type="text"
                placeholder="First Name"
                required
              />
              <input
                name="last_name"
                className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:border focus:outline-none"
                type="text"
                placeholder="Last Name"
                required
              />
              <input
                name="password"
                className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:border focus:outline-none"
                type="password"
                placeholder="Password"
                required
              />
              <input
                name="confirm_password"
                className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:border focus:outline-none"
                type="password"
                placeholder="Confirm Password"
                required
              />
              <select
                name="account_type"
                defaultValue="User"
                className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:border focus:outline-none"
                required
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
                required
              />
              <input
                name="mobile_number"
                className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:border focus:outline-none"
                type="text"
                placeholder="Mobile Number"
                required
              />

              <button
                type="submit"
                className="w-full py-3 px-5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none"
                disabled={loading}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
