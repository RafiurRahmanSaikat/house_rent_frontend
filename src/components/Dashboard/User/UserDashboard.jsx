import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import backEndApi from "../../../utils/constant";
import EmptyState from "../../core/EmptyState";
import ErrorPage from "../../core/ErrorPage";
import Loading from "../../core/Loading";

const UserDashboard = ({ data, token, error, loading, onRefresh }) => {
  console.log("House", data);
  const handleCreateAdvertisement = async (houseId) => {
    try {
      await axios.post(
        `${backEndApi}/house/create-advertisement/`,
        { house_id: houseId },
        { headers: { Authorization: `Token ${token}` } }
      );
      toast.success("Advertisement created successfully!");
      onRefresh();
    } catch (error) {
      error.status == 401
        ? toast.error("You have to login !!")
        : toast.error("Failed to create the advertisement.");
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorPage message={error.message} />;
  if (!data || data.length === 0) return <EmptyState text="House" />;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 shadow-sm rounded-lg overflow-hidden">
        <thead className="bg-blue-100">
          <tr>
            {[
              "Title",
              "Description",
              "Location",
              "Price",
              "Categories",
              "Advertise Status",
              "Actions",
            ].map((header) => (
              <th
                key={header}
                className="px-4 py-2 text-center text-nowrap text-xs font-bold uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">
          {data?.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50 text-center">
              <td className="px-3 py-2 whitespace-nowrap text-sm font-medium ">
                {item.title}
              </td>

              <td className="text-sm text-justify px-3">
                {item.description.length > 350
                  ? `${item.description.substring(0, 350)}...`
                  : item.description}
              </td>

              <td className="px-3 py-2 whitespace-nowrap text-sm ">
                {item.location}
              </td>
              <td className="px-3 py-2 whitespace-nowrap text-sm ">
                ${item.price}
              </td>
              <td className="px-3 py-2 whitespace-nowrap text-sm ">
                {item.category.map((cat) => (
                  <span
                    key={cat.id}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-1"
                  >
                    {cat.name}
                  </span>
                ))}
              </td>
              <td className="px-3 py-2 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    item.is_advertised
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {item.is_advertised ? "Requested" : "Not Requested"}
                </span>
              </td>
              <td className="px-3 py-2 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => handleCreateAdvertisement(item.id)}
                  className={`px-4 py-2 rounded ${
                    item.is_advertised
                      ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                  disabled={item.is_advertised}
                >
                  {item.is_advertised
                    ? "Already Applied"
                    : "Apply To Advertise"}
                </button>
                {!item.is_advertised && (
                  <Link
                    to={`editHouse/${item?.id}`}
                    className="px-4 py-2 ml-2 rounded-full bg-yellow-500 text-white hover:bg-yellow-700"
                  >
                    Edit
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserDashboard;
