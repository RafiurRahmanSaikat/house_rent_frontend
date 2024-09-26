import { Menu } from "lucide-react";
import React, { useContext, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import backEndApi from "../../../utils/constant";
import useFetch from "../../../utils/useFetch";
import Loading from "../../core/Loading";
import AdminDashboard from "../Admin/AdminDashboard";
import UserDashboard from "../User/UserDashboard";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const [refresh, setRefresh] = useState(false);

  const toggleSidebar = useOutletContext().toggleSidebar;

  const url =
    user?.account_type === "User"
      ? `${backEndApi}/house/my-houses/`
      : `${backEndApi}/house/admin-house-list/`;

  const { data, loading, error } = useFetch(
    url,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    },
    [refresh]
  );

  if (loading) return <Loading />;

  const handleRefresh = () => {
    setRefresh((prev) => !prev);
  };
  const Header = () => {
    return (
      <header className="bg-white shadow-sm">
        <div className=" mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h3 className="text-2xl font-semibold text-gray-900">
            {user?.account_type} Dashboard
          </h3>
          <button onClick={toggleSidebar} className="md:hidden">
            <Menu size={24} />
          </button>
        </div>
      </header>
    );
  };
  return (
    <div className="flex flex-col h-screen bg-gray-100 md:flex-row">
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <section className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className=" mx-auto py-6 sm:px-6 lg:px-8">
            {user?.account_type === "User" ? (
              <UserDashboard
                data={data}
                loading={loading}
                error={error}
                token={token}
                onRefresh={handleRefresh}
              />
            ) : (
              <AdminDashboard
                data={data}
                loading={loading}
                error={error}
                token={token}
                onRefresh={handleRefresh}
              />
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
