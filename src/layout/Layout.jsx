import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/core/Footer";
import Navbar from "../components/core/Navbar";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
