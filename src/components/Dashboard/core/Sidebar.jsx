import { X } from "lucide-react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import Info from "./Info";

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  const { user, logout } = useContext(AuthContext);
  console.log(user);

  return (
    <div
      className={`fixed inset-y-0 left-0 z-30 min-w-56 bg-gray-800 transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
    >
      <div className="flex items-center flex-col h-full ">
        <div className="flex items-center justify-between py-4 border-b border-red-700">
          <Link to="/" className="text-center text-xl font-bold text-blue-400">
            Home Page
          </Link>
          <button onClick={toggleSidebar} className="md:hidden text-white">
            <X size={24} />
          </button>
        </div>
        <nav className="flex items-center flex-col flex-1 overflow-y-auto">
          {user.account_type === "User" && (
            <>
              <Link
                to="editProfile"
                className="py-4 text-gray-300 hover:border-b border-blue-700"
              >
                Edit Profile
              </Link>
              <Link
                to="addHouse"
                className="py-4 text-gray-300 hover:border-b border-blue-700"
              >
                Add House
              </Link>
              <Link
                to="rentRequestList"
                className="py-4 text-gray-300 hover:border-b border-blue-700"
              >
                Rent Request
              </Link>
              <Link
                to="favourite"
                className="py-4 text-gray-300 hover:border-b border-blue-700"
              >
                Favorites
              </Link>
            </>
          )}

          <Link
            to="/profile"
            className="py-4 text-gray-300 hover:border-b border-blue-700"
          >
            My Dashboard
          </Link>
        </nav>
        <Info data={user} logout={logout}></Info>
      </div>
    </div>
  );
};

export default Sidebar;
