import React, { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/core/Sidebar";
import { AuthContext } from "../context/AuthContext";

const DashboardLayout = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-col flex-1 overflow-y-auto">
        <Outlet context={{ toggleSidebar }} />
      </div>
    </div>
  );
};

export default DashboardLayout;
