import React from "react";

const EmptyState = ({ text }) => {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="flex  items-center justify-center  p-10">
        <div className="w-max">
          <h1 className="animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-5 text-5xl text-red-500 font-bold">
            No {text || "Data"} Found 🥱 !!!
          </h1>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
