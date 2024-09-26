import axios from "axios";
import { ChevronDown, Clock, Home, MapPin } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import backEndApi from "../../../utils/constant";
import useFetch from "../../../utils/useFetch";
import ErrorPage from "../../core/ErrorPage";
import Loading from "../../core/Loading";

const Advertisement = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categoriesUrl = `${backEndApi}/house/category/`;
  const advertisementUrl = `${backEndApi}/house/advertisements/list/${
    selectedCategory ? `?category=${selectedCategory}` : ""
  }`;

  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useFetch(categoriesUrl);

  const {
    data: advertisements,
    loading: advertisementsLoading,
    error: advertisementsError,
  } = useFetch(advertisementUrl, {}, [selectedCategory]);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setIsDropdownOpen(false);
  };

  const handleleFavorite = async (adId) => {
    try {
      const response = await axios.post(
        `${backEndApi}/account/profile/favorites/add/${adId}/`,
        {},
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.status);
      response.status == 200
        ? toast.success(response.data.message)
        : toast.warn(response.data.message);
      // response.data.message=="Advertisement added to favorites.'
    } catch (error) {
      error.status == 401
        ? toast.error("You have to login !!")
        : toast.error(error.message);
    }
  };

  if (categoriesLoading || advertisementsLoading) return <Loading />;
  if (categoriesError) return <ErrorPage message={categoriesError.message} />;
  if (advertisementsError)
    return <ErrorPage message={advertisementsError.message} />;

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-center gap-8 items-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Featured Listings
          </h2>
          <div className="mb-6 relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between  px-4 py-2 text-xl font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="flex items-center">
                <Home className="mr-2 h-5 w-5 text-gray-400" />
                {selectedCategory
                  ? categories.find((cat) => cat.id === selectedCategory)?.name
                  : "All Categories"}
              </span>
              <ChevronDown className="ml-2 h-5 w-5 text-gray-400" />
            </button>
            {isDropdownOpen && (
              <div className="absolute z-10  mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                <div
                  className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white"
                  onClick={() => handleCategorySelect("")}
                >
                  All Categories
                </div>
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white"
                    onClick={() => handleCategorySelect(category.id)}
                  >
                    {category.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {advertisements.length === 0 ? (
          <div className="flex items-center justify-center p-10">
            <div className="w-max">
              <h1 className="animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-5 text-2xl sm:text-5xl text-red-500 font-bold">
                No Advertisement Found !!!
              </h1>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {advertisements.map((house) => (
              <div
                key={house.id}
                className="bg-white rounded-lg shadow-md overflow-hidden w-full sm:w-96"
              >
                <img
                  src={house.house?.image}
                  alt={house.house?.title}
                  className="w-full h-48 sm:h-80 object-cover"
                />
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-medium text-gray-800 mb-2">
                    {house.house?.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base mb-4">
                    ${house.house?.price}/month
                  </p>
                  <ul className="text-gray-600 text-sm sm:text-base mb-4">
                    <li className="flex items-center mb-2">
                      <Home className="w-4 sm:w-5 h-4 sm:h-5 mr-2 text-indigo-600" />
                      {house.house?.category.map((cat, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-indigo-100 text-indigo-800 px-2 sm:px-3 py-1 text-xs mr-2"
                        >
                          {cat.name}
                        </span>
                      ))}
                    </li>
                    <li className="flex items-center mb-2">
                      <MapPin className="w-4 sm:w-5 h-4 sm:h-5 mr-2 text-indigo-600" />
                      {house.house?.location}
                    </li>
                    <li className="flex items-center">
                      <Clock className="w-4 sm:w-5 h-4 sm:h-5 mr-2 text-indigo-600" />
                      {house.is_rented ? "Rented" : "Available"}
                    </li>
                  </ul>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleleFavorite(house.id)}
                      className="mt-4 mr-2 block w-full text-center px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition duration-200 text-sm sm:text-base"
                    >
                      Add to favorite
                    </button>

                    <Link
                      to={`/advertise/${house.id}`}
                      className="mt-4 block w-full text-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition duration-200 text-sm sm:text-base"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Advertisement;
