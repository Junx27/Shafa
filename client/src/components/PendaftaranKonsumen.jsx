/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

function PendaftaranKonsumen({ data }) {
  return (
    <div className="mt-5">
      {data.map((row, index) => (
        <div
          className="flex flex-row items-center bg-lime-100 p-2 rounded-lg my-3"
          key={index}
        >
          <img src={row.image} alt="" className="w-16 mr-5 ml-3 rounded-full" />
          <h1 className="basis-1/2">{row.nama}</h1>
          <button className="basis-1/4 bg-lime-300 p-3 rounded-lg ml-5 hover:bg-lime-400 hover:text-white">
            Submit
          </button>
        </div>
      ))}
    </div>
  );
}

export default PendaftaranKonsumen;
