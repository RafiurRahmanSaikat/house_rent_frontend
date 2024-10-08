import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-52 w-52 border-t-4 border-blue-500"></div>
    </div>
  );
};

export default Loading;
