import axios from "axios";
import { Trash2, User } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext";
import backEndApi from "../../../utils/constant";
import EmptyState from "../../core/EmptyState";
import Loading from "../../core/Loading";

const Favourite = () => {
  const [houses, setHouses] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const ids = user?.favourites || [];

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        setLoading(true);
        const responses = await Promise.all(
          ids.map((id) =>
            axios.get(`${backEndApi}/house/favorites_advertisements/${id}/`, {
              headers: {
                Authorization: `Token ${token}`,
              },
            })
          )
        );
        setHouses(responses.map((response) => response.data));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching houses:", error);
      }
    };

    fetchHouses();
  }, [refresh, ids]);
  console.log(houses, "Favorites");
  const handleFavorite = async (adId) => {
    console.log(adId);
    try {
      const response = await axios.post(
        `${backEndApi}/account/profile/favorites/remove/${adId}/`,
        {},
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.error(response.data.message);
      setHouses((prevHouses) =>
        prevHouses.filter((house) => house.id !== adId)
      );
    } catch (error) {
      toast.error("Error Deleting favorite. Please try again.");
    }
  };
  if (loading) return <Loading />;

  if (houses.length === 0) return <EmptyState text={"Favourite House"} />;

  return (
    <div className="flex flex-col items-center ">
      <div className="text-center p-10">
        <h1 className="font-bold text-4xl mb-4">
          Favourite House Advertisements
        </h1>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center gap-y-20 gap-x-14 mt-10 mb-5">
        {houses.map((house) => (
          <div
            key={house.id}
            className="min-w-[22vw] mx-8   bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
          >
            <a href="#">
              <img
                src={house.house.image}
                alt={house.house.title}
                className=" object-cover rounded-t-xl w-full"
              />
              <div className="px-4 py-3 w-auto">
                <div className="">
                  {house.house.category.map((cat) => (
                    <span
                      key={cat.id}
                      className="text-nowrap  font-semibold text-xs text-white bg-blue-500 rounded-full mx-0.5 p-1"
                    >
                      {cat.name}
                    </span>
                  ))}
                </div>
                <div className="">
                  <p>
                    {house.is_rented ? (
                      <div className="flex justify-between items-center">
                        <p className=" text-center p-1 bg-red-500 text-white  rounded-lg ">
                          Not Available
                        </p>

                        <button
                          onClick={() => handleFavorite(house.id)}
                          className=""
                        >
                          <Trash2 className="text-red-500 inline-flex my-2" />
                          Delete
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center">
                        <p className=" text-center p-1 bg-green-500 text-white  rounded-lg ">
                          Available
                        </p>
                        <Link
                          to={`/advertise/${house.id}`}
                          className=" text-center p-1 bg-teal-600 text-white font-medium rounded-md hover:bg-indigo-500 transition duration-300 text-sm sm:text-base"
                        >
                          Details
                        </Link>
                        <button
                          onClick={() => handleFavorite(house.id)}
                          className=""
                        >
                          <Trash2 className="text-red-500 inline-flex my-2" />
                          Delete
                        </button>
                      </div>
                    )}
                  </p>
                </div>
                <p className="text-lg font-bold text-black truncate block capitalize">
                  <span className=" font-medium">Title : </span>
                  {house.house.title}
                </p>
                <p className="text-sm text-gray-600 overflow-y-clip">
                  <span className=" font-medium">Description : </span>

                  {house.house.description.split(" ").slice(0, 50).join(" ") +
                    "..."}
                </p>
                <div className="flex items-center">
                  <p className="text-lg font-semibold text-black cursor-auto my-3">
                    <span className=" font-medium">Price : </span>
                    {house.house.price} $
                  </p>
                  <div className="ml-auto flex items-center justify-between">
                    <User className="w-6 h-6 text-blue-500 mx-2" />
                    <p className="my-auto">{house.house.owner.user.username}</p>
                  </div>
                </div>
              </div>
            </a>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Favourite;
