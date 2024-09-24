import React from "react";

const ErrorPage = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center  bg-gray-100 p-6">
      {/* Error Icon */}
      <div className="text-red-500 mb-4">
        <img
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/404/404-computer.svg"
          alt=""
        />
      </div>

      {/* Error Message */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-2">
        Oops! Something went wrong.
      </h1>
      <p className="text-gray-600 text-center mb-4">
        {message ||
          "There was an error fetching the data. Please try again later."}
      </p>

      {/* Refresh Button */}
      <button
        onClick={() => (window.location.href = "/")}
        className="mt-6 p-4 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300"
      >
        Go To Home Page
      </button>
      <button
        onClick={() => window.location.reload()}
        className="mt-6 px-6 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors duration-300"
      >
        Refresh Page
      </button>
    </div>
  );
};

export default ErrorPage;
