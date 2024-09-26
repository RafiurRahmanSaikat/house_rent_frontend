import { DollarSign, Mail, MapPin, Phone } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import backEndApi from "../../../utils/constant";
import useFetch from "../../../utils/useFetch";
import EmptyState from "../../core/EmptyState";
import ErrorPage from "../../core/ErrorPage";
import Loading from "../../core/Loading";

const RentRequestList = () => {
  const [refresh, setRefresh] = useState(false);
  const { data, loading, error } = useFetch(
    `${backEndApi}/house/show-rent/`,
    {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    },
    [refresh]
  );

  const handleAccept = async (id) => {
    try {
      const response = await fetch(
        `${backEndApi}/house/accept-rent-request/${id}/`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      setRefresh((prev) => !prev);

      toast.success("Rent Request Accepted Successfully");
      // console.log("Rent Request Accepted Successfully:", response.data);
      // alert("OKKKK");
    } catch (error) {
      console.error("Error accepting rent request:", error);
      error.status == 401
        ? toast.error("You have to login !!")
        : toast.error(error.message);
    }
  };
  // console.log(data);
  if (loading) return <Loading />;
  if (error) return <ErrorPage message={error.message} />;

  return (
    <div className="container mx-auto">
      {data.length > 0 ? (
        <div className="shadow-md my-10 bg-white px-5 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Rent Requests</h1>
            <h2 className="font-semibold text-2xl">
              {data.length} {data.length > 1 ? "Items" : "Item"}
            </h2>
          </div>

          {data.map((house) => {
            return (
              <div
                key={house.id}
                className="md:flex justify-between py-8 border-t border-gray-500 items-center"
              >
                <div className="md:w-1/3 w-full md:pr-4 flex items-start space-x-4">
                  <img
                    src={house.advertisement.house.image}
                    alt={house.advertisement.house.title}
                    className="w-40 h-40 object-cover rounded-xl"
                  />
                  <div>
                    <p className="text-lg font-bold leading-none text-gray-800">
                      {house.advertisement.house.title}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      {house.advertisement.house.category.map((cat) => (
                        <span
                          key={cat.id}
                          className="px-2 py-1 rounded-full bg-blue-200 text-blue-800 text-xs"
                        >
                          {cat.name}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center space-x-4 mt-2">
                      <MapPin className="h-5 w-5 text-gray-800" />
                      <p className="text-gray-600 text-sm">
                        {house.advertisement.house.location}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4 mt-2">
                      <DollarSign className="h-5 w-5 text-gray-800" />
                      <p className="text-gray-600 text-sm">
                        ${house.advertisement.house.price}
                      </p>
                    </div>
                    <p className="text-gray-600 mt-2 text-sm">
                      {house.advertisement.house.description}
                    </p>
                  </div>
                </div>

                <div className="md:w-1/3 w-full mt-6 md:mt-0 md:pl-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-4">
                      <img
                        src={house.requested_by.image}
                        alt={`${house.requested_by.user.first_name}'s Profile`}
                        className="w-10 h-10 object-cover rounded-full"
                      />
                      <p className="text-gray-600 text-sm">
                        {house.requested_by.user.first_name}{" "}
                        {house.requested_by.user.last_name}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Mail className="h-5 w-5 text-gray-800" />
                      <p className="text-gray-600 text-sm">
                        {house.requested_by.user.email}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Phone className="h-5 w-5 text-gray-800" />
                      <p className="text-gray-600 text-sm">
                        {house.requested_by.mobile_number}
                      </p>
                    </div>

                    <div className="mt-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          house.status === "PENDING"
                            ? "bg-yellow-200 text-yellow-800"
                            : house.status === "APPROVED"
                            ? "bg-green-200 text-green-800"
                            : house.status === "REJECTED"
                            ? "bg-red-200 text-red-800"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {house.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="md:w-1/6 w-full flex justify-end md:mt-0 mt-4">
                  {house.status === "PENDING" && (
                    <button
                      onClick={() => handleAccept(house.id)}
                      className="bg-green-500 text-white px-4 py-2 rounded-md"
                    >
                      Accept
                    </button>
                  )}
                  {house.status !== "PENDING" && (
                    <span
                      className={`px-4 py-2 rounded-md ${
                        house.status === "ACCEPTED"
                          ? "bg-blue-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {house.status}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState text="Rent Request" />
      )}
    </div>
  );
};

export default RentRequestList;
