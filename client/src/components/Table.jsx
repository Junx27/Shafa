/* eslint-disable react/prop-types */
// Table.js
// eslint-disable-next-line no-unused-vars
import React from "react";

const Table = ({ data }) => {
  return (
    <div className="overflow-x-auto mt-5 rounded-lg">
      <table className="table-auto w-full">
        <thead className="bg-lime-300">
          <tr>
            <th className="border border-white px-4 py-2">Id</th>
            <th className="border border-white px-4 py-2">Tanggal</th>
            <th className="border border-white px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody className="bg-lime-100">
          {data.map((row, index) => (
            <tr key={index} className="text-center hover:bg-lime-300">
              <td className="border border-white px-4 py-2">{row.id}</td>
              <td className="border border-white px-4 py-2">{row.tanggal}</td>
              <td className="border border-white px-4 py-2">
                <span className="material-symbols-outlined hover:text-white cursor-pointer">
                  {row.aksi}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
