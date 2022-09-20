import React from "react";
import { Triangle } from "react-loader-spinner";

const Loader = () => {
  return (
    <div>
        <div className="flex justify-center items-center min-h-screen bg-white">

      <Triangle
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
        </div>
    </div>
  );
};

export default Loader;