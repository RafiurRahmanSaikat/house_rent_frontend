import React from "react";
import backEndApi from "../../utils/constant";
import useFetch from "../../utils/useFetch";
import ErrorPage from "../core/ErrorPage";
import Hero from "../core/Hero";
import Loading from "../core/Loading";
import About from "./components/About";
import Advertisement from "./components/Advertisement";
import ContactUs from "./components/ContactUs";
import Services from "./components/Services";

const Home = () => {
  const houseUrl = `${backEndApi}/house/list/`;
  const advertisementUrl = `${backEndApi}/house/advertisements/list/`;
  const { data: houses, loading, error } = useFetch(houseUrl);
  const { data: advertise } = useFetch(advertisementUrl);
  let advertisements = advertise?.results;

  if (loading) return <Loading />;
  if (error) return <ErrorPage message={error.message} />;

  return (
    <>
      <Hero></Hero>
      <Advertisement></Advertisement>

      <Services></Services>
      <About></About>
      <ContactUs></ContactUs>

      <div className="grid mx-auto grid-cols-1 px-4 py-8 gap-4 lg:grid-cols-3 lg:gap-8">
        {advertisements?.map((house) => (
          <div
            key={house.id}
            className="overflow-hidden rounded-lg shadow transition hover:shadow-lg dark:shadow-gray-700/25"
          >
            <img
              alt={house.house.image.url}
              src={house.house.image}
              className="h-56 w-full object-cover"
            />

            <div className="bg-white p-4 sm:p-6 dark:bg-gray-900">
              <time className="block text-xs text-gray-500 dark:text-gray-400">
                {house.house.title}
              </time>

              <a href="#">
                <h3 className="mt-0.5 text-lg text-gray-900 dark:text-white">
                  {house.house.description}
                </h3>
              </a>

              <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500 dark:text-gray-400">
                {house.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
