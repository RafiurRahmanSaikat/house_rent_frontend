import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
function Login() {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-[70vh] bg-gray-100">
      <div className="flex bg-white shadow-lg rounded-3xl max-w-4xl p-5 items-center space-x-6">
        {/* Left Section */}
        <div className="md:w-1/2 px-8">
          <h2 className="text-4xl font-bold text-[#002D74] mb-4">Login</h2>
          {/* <h2 className="text-2xl font-bold text-[#741500] mb-4">
            Confirm Password
          </h2>
          */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <input
              value={formData.username}
              onChange={handleChange}
              type="text"
              id="username"
              name="username"
              className="p-4 rounded-xl border border-gray-300 focus:outline-none focus:border-[#002D74]"
              placeholder="Username"
              required
            />
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="p-4 rounded-xl border border-gray-300 w-full focus:outline-none focus:border-[#002D74]"
                placeholder="Password"
                required
              />
              {/* Eye Icon for Password Visibility */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                fill="gray"
                className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer"
                viewBox="0 0 16 16"
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"></path>
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"></path>
              </svg>
            </div>
            <button
              className="bg-[#002D74] text-white py-3 rounded-xl hover:bg-[#1f456b] transition duration-300 font-semibold"
              type="submit"
            >
              Login
            </button>
          </form>
          <hr className="my-6 border-gray-300" />
          <div className="text-sm flex justify-between items-center">
            <p>Don't have an account?</p>
            <Link
              to="/signup"
              className="bg-[#002D74] text-white py-2 px-4 rounded-xl hover:bg-[#1f456b] transition duration-300"
            >
              Register
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="md:block hidden w-1/2">
          <img
            className="rounded-2xl object-cover h-full"
            src="/assets/bg.jpg"
            alt="Login Illustration"
          />
        </div>
      </div>
    </section>
  );
}

export default Login;
