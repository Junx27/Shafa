/* eslint-disable react/prop-types */
// Table.js
// eslint-disable-next-line no-unused-vars
import { Link } from "react-router-dom";

const Table = ({ data }) => {
  return (
    <div className="transition-all duration-1000 overflow-x-auto mt-5 rounded-lg shadow hover:shadow-lg">
      <table className="table-auto w-full">
        <thead className="bg-lime-300">
          <tr>
            <th className="border border-white px-4 py-2">No</th>
            <th className="border border-white px-4 py-2">Nama</th>
            <th className="border border-white px-4 py-2">Alamat</th>
            <th className="border border-white px-4 py-2">No. Tlp</th>
            <th className="border border-white px-4 py-2">Status</th>
            <th className="border border-white px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody className="bg-lime-50">
          {data.map((row, index) => (
            <tr
              key={index}
              className="transition-all duration-500 text-center hover:bg-lime-300"
            >
              <td className="border border-white px-4 py-2">{index + 1}</td>
              <td className="border border-white px-4 py-2">{row.nama}</td>
              <td className="border border-white px-4 py-2">{row.alamat}</td>
              <td className="border border-white px-4 py-2">
                <p>{row.no_tlp}</p>
              </td>
              <td className="border border-white px-4 py-2">
                <p>{row.status_konsumen}</p>
              </td>
              <td className="border border-white px-4 py-2 w-10">
                <Link
                  to={`/konsumen/${row.uuid}`}
                  className="transition-all duration-1000 bg-lime-300 hover:bg-lime-400 py-2 rounded-md px-4 flex text-sm"
                >
                  <span className="material-symbols-outlined mr-2 text-sm">
                    visibility
                  </span>
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
