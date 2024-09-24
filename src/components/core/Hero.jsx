import React from "react";

const Hero = () => {
  return (
    <div className="relative w-full h-[40vh]" id="home">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-3xl">
        <img
          src="/assets/bg.jpg"
          alt="Beautiful house"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="absolute top-0 left-0 bottom-0 flex flex-col md:flex-row items-center justify-end md:justify-between backdrop-blur-md rounded-3xl p-6">
        <div className="md:w-1/2 mb-4 md:mb-0 text-right md:text-left">
          <h1 className="text-white font-bold text-4xl md:text-5xl leading-tight mb-2">
            Find Your Dream Home
          </h1>
          <p className="text-white font-medium text-xl mb-8 mt-4">
            Discover the perfect rental property for your lifestyle
          </p>
          <a
            href="#listings"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition duration-200"
          >
            View Listings
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
