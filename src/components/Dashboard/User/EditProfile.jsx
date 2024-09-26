import axios from "axios";
import { Lock, Mail, MapPin, Phone, Save, User } from "lucide-react";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext";
import backEndApi from "../../../utils/constant";

const EditProfile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [preview, setPreview] = useState(user.image);
  const [profileData, setProfileData] = useState({
    first_name: user.user.first_name,
    last_name: user.user.last_name,
    email: user.user.email,
    mobile_number: user.mobile_number,
    address: user.address,
    image: user.image,
  });

  const [password, setPassword] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    setPreview(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    let imageUrlToSend = profileData.image;

    if (preview) {
      const imgBBApiKey = "1852d1780a7c1d17aff8afe66b4878a8";
      const imgFormData = new FormData();
      imgFormData.append("image", preview);

      try {
        const imgbbResponse = await axios.post(
          `https://api.imgbb.com/1/upload?key=${imgBBApiKey}`,
          imgFormData
        );
        imageUrlToSend = imgbbResponse.data.data.url;
      } catch (error) {
        toast.error("Failed to upload image to ImgBB.");
        return;
      }
    }

    for (const key in profileData) {
      formData.append(key, profileData[key]);
    }

    formData.append("image", imageUrlToSend);

    try {
      const response = await axios.post(
        `${backEndApi}/account/updateProfile/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );

      response.status == 200
        ? toast.success(response.data.message)
        : toast.warn(response.data.message);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.message);
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (password.new_password !== password.confirm_password) {
      toast.error("New passwords do not match");
      return;
    }
    try {
      const response = await axios.post(
        `${backEndApi}/account/change-password/`,
        {
          current_password: password.current_password,
          new_password: password.new_password,
        },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );

      response.status == 200
        ? toast.success(response.data.message)
        : toast.warn(response.data.message);
      setPassword({
        current_password: "",
        new_password: "",
        confirm_password: "",
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section className="bg-gray-50 text-slate-700 min-h-screen flex flex-col my-auto ">
      <h1 className="text-3xl font-bold py-8 text-center ">
        Profile Management
      </h1>
      <div className="flex-grow flex flex-col md:flex-row justify-center items-start gap-12 px-4 pb-8">
        <div className="bg-gray-50 p-6 rounded-lg w-full md:w-1/2 max-w-2xl ">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <img
                  src={
                    preview && preview.type
                      ? URL.createObjectURL(preview)
                      : `${profileData.image}`
                  }
                  alt="House"
                  className="w-48 h-48 rounded-full object-cover"
                />{" "}
                <label
                  htmlFor="upload_profile"
                  className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 cursor-pointer"
                >
                  <User className="w-5 h-5 " />
                </label>
                <input
                  type="file"
                  id="upload_profile"
                  hidden
                  onChange={handleProfileImageChange}
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="flex-1">
                <label htmlFor="first_name" className="block font-medium">
                  First Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 " />
                  </div>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={profileData.first_name}
                    onChange={handleInputChange}
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 py-3 border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div className="flex-1">
                <label htmlFor="last_name" className="block font-medium">
                  Last Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 " />
                  </div>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={profileData.last_name}
                    onChange={handleInputChange}
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 py-3 border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block font-medium">
                Email
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 " />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 py-3 border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div>
              <label htmlFor="mobile_number" className="block font-medium">
                Mobile Number
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 " />
                </div>
                <input
                  type="tel"
                  id="mobile_number"
                  name="mobile_number"
                  value={profileData.mobile_number}
                  onChange={handleInputChange}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 py-3 border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div>
              <label htmlFor="address" className="block font-medium">
                Address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 pt-3 flex items-start pointer-events-none">
                  <MapPin className="h-5 w-5 " />
                </div>
                <textarea
                  id="address"
                  name="address"
                  rows="2"
                  value={profileData.address}
                  onChange={handleInputChange}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 py-3 border-gray-300 rounded-md"
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm font-medium bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Save className="w-5 h-5 mr-2 " />
              Update Profile
            </button>
          </form>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg w-full md:w-1/2 max-w-2xl my-auto ">
          <h2 className="text-2xl font-semibold mb-6">Password Management</h2>
          <form onSubmit={handlePasswordSubmit} className="space-y-10 mb-8">
            <div>
              <label htmlFor="current_password" className="block font-medium">
                Current Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 " />
                </div>
                <input
                  type="password"
                  id="current_password"
                  name="current_password"
                  value={password.current_password}
                  onChange={handlePasswordChange}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 py-3 border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="new_password" className="block font-medium">
                New Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 " />
                </div>
                <input
                  type="password"
                  id="new_password"
                  name="new_password"
                  value={password.new_password}
                  onChange={handlePasswordChange}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 py-3 border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="confirm_password" className="block font-medium">
                Confirm New Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 " />
                </div>
                <input
                  type="password"
                  id="confirm_password"
                  name="confirm_password"
                  value={password.confirm_password}
                  onChange={handlePasswordChange}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 py-3 border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm font-medium text-white text-xl bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <Lock className="w-5 h-5 mr-2" />
              Change Password
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditProfile;
