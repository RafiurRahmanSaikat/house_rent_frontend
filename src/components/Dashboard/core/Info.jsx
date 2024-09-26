import React from "react";

const Info = ({ data, logout }) => {
  return (
    <div className="rounded-xl flex flex-col items-center border border-gray-700 bg-gray-800 mb-2 p-2">
      <div className=" flex flex-col items-center  ">
        <img
          alt={data?.image}
          src={data?.image}
          className="size-16 rounded-full object-cover"
        />

        <div>
          <h3 className="text-lg font-medium text-white text-wrap">
            {data?.user?.first_name} {data?.user?.last_name}
          </h3>
          <p className="text-sm font-thin text-white">{data?.user?.email}</p>
        </div>
      </div>

      <button
        onClick={logout}
        className="w-full m-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
      >
        Logout
      </button>
    </div>
  );
};

export default Info;
