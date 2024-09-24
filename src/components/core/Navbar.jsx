import { Menu, X } from "lucide-react";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex flex-wrap items-center justify-between p-3 bg-blue-600 rounded-3xl m-2">
      <a href="/" className="text-xl text-white font-bold">
        Rent Ease
      </a>
      <div className="flex md:hidden">
        <button onClick={handleToggle} id="hamburger">
          {isOpen ? (
            <X className="w-10 h-10" />
          ) : (
            <Menu className="w-10 h-10" />
          )}
        </button>
      </div>
      <div
        className={`toggle md:flex text-right text-bold mt-5 md:mt-0 md:border-none ${
          isOpen ? "block" : "hidden"
        } md:block`}
      >
        <a
          href="/"
          className="block md:inline-block text-white hover:text-blue-200 px-3 py-3 md:border-none"
        >
          Home
        </a>

        <a
          href="#aboutus"
          className="block md:inline-block text-white hover:text-blue-200 px-3 py-3 md:border-none"
        >
          About Us
        </a>

        <a
          href="#contactUs"
          className="block md:inline-block text-white hover:text-blue-200 px-3 py-3 md:border-none"
        >
          Contact
        </a>
      </div>
      <div className="toggle w-full text-end hidden md:flex md:w-auto px-2 py-2 md:rounded">
        {isAuthenticated ? (
          <div className="flex flex-col md:flex-row items-center mt-3 md:mt-0">
            <span className="text-white mr-3">
              Welcome, {user?.user?.username}
            </span>
            <a
              href="/profile"
              className="rounded-full mr-2 bg-sky-600 px-6 py-2 text-white transition-all duration-300 hover:scale-90"
            >
              Profile
            </a>
            <button
              onClick={logout}
              className="rounded-full bg-red-600 px-6 py-2 text-white transition-all duration-300 hover:scale-90"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row items-center mt-3 md:mt-0">
            <a
              href="/login"
              className="rounded-full bg-sky-600 px-6 py-2 text-white transition-all duration-300 hover:scale-90 md:mr-3"
            >
              Log In
            </a>
            <a
              href="/signup"
              className="rounded-full bg-sky-600 px-6 py-2 text-white transition-all duration-300 hover:scale-90"
            >
              Register
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
