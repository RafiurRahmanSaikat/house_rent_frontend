import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import EmptyState from "../../core/EmptyState";
import ErrorPage from "../../core/ErrorPage";
import Loading from "../../core/Loading";
import backEndApi from "../../../utils/constant";

const AdminDashboard = ({ data, token, error, loading, onRefresh }) => {
  console.log("Admin", data);
  const handleApproveAdvertisement = async (houseId) => {
    try {
      await axios.post(
        `${backEndApi}/house/approve-advertisement/`,
        { house_id: houseId },
        { headers: { Authorization: `Token ${token}` } }
      );
      toast.success("Advertisement Approved!");
      onRefresh();
    } catch (error) {
      // console.error("Failed to Approve:", error);
      toast.error(error.message);
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorPage message={error.message} />;
  if (!data || data.length === 0) return <EmptyState />;

  return (
    <div className="overflow-auto">
      <table className="min-w-full bg-white border border-gray-300 shadow-sm rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            {[
              "Title",
              "Description",
              "Location",
              "Price",
              "Categories",
              "Owner",
              "Status",
              "Actions",
            ].map((header) => (
              <th
                key={header}
                className="p-1 text-center text-xs font-extrabold text-red-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data?.map((item) => (
            <tr key={item?.id} className="hover:bg-gray-50">
              <td className="p-1  text-sm text font-medium text-gray-900">
                {item?.house?.title}
              </td>

              <td className="text-sm  px-3">
                {item.house?.description.substring(0, 100)} ...
              </td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-center text-gray-500">
                {item?.house?.location}
              </td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-center text-gray-500">
                ${item?.house?.price}
              </td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-center text-gray-500">
                {item?.house?.category?.map((cat) => (
                  <span
                    key={cat.id}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-1"
                  >
                    {cat.name}
                  </span>
                ))}
              </td>
              <td className="px-10 py-2 whitespace-nowrap">
                <div className="flex items-center">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={item?.house?.owner?.image}
                    alt=""
                  />
                  <div className="ml-4">
                    <div className="text-sm text-center font-medium text-gray-900">
                      {item?.house?.owner?.user.first_name}{" "}
                      {item?.house?.owner?.user.last_name}
                    </div>
                    <div className="text-sm text-center text-gray-500">
                      {item?.house?.owner?.user.email}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-3 py-2 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    item?.is_approved
                      ? item?.is_rented
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {item?.is_approved
                    ? item?.is_rented
                      ? "Sold"
                      : "Available"
                    : "Not Advertised"}
                </span>
              </td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-center font-medium">
                <button
                  onClick={() => handleApproveAdvertisement(item?.house?.id)}
                  disabled={item?.is_approved}
                  className={`px-4 py-2 rounded ${
                    item.is_approved
                      ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {item.is_approved ? "Already Approved" : "Approve"}
                </button>
                {/* <button
                  onClick={() => handleApproveAdvertisement(item?.house?.id)}
                  className="text-indigo-600 hover:text-indigo-900"
                  disabled={item?.is_approved}
                >
                  {item?.is_approved ? "Approved" : "Approve"}
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
