import axios from "axios";
import { useEffect, useState } from "react";

function Pembelian() {
  const [data, setData] = useState([]);
  const [totalPembelian, setTotalPembelian] = useState(0);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:5000/pembelian");
    setData(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const total = data.reduce((accumulator, currentValue) => {
      return accumulator + parseInt(currentValue.harga_produk);
    }, 0);
    setTotalPembelian(total);
  }, [data]);

  const formatRupiah = (number) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2,
    });
    return formatter.format(number);
  };

  return (
    <div>
      <div className="flex mb-5">
        <span className="material-symbols-outlined">info</span>
        <h1 className="ml-3">Informasi pembelian</h1>
      </div>
      {data.length !== 0 ? (
        <div className="transition-all duration-1000 overflow-x-auto mt-5 rounded-lg shadow hover:shadow-lg">
          <table className="table-auto w-full">
            <thead className="bg-lime-300 rounded">
              <tr>
                <th className="border border-white px-4 py-2">No</th>
                <th className="border border-white px-4 py-2">Nama Produk</th>
                <th className="border border-white px-4 py-2">Jumlah</th>
                <th className="border border-white px-4 py-2">Total Harga</th>
              </tr>
            </thead>
            <tbody className="bg-lime-50">
              {data.map((row, index) => (
                <tr
                  key={index}
                  className="transition-all duration-500 text-center hover:bg-lime-300"
                >
                  <td className="border border-white px-4 py-2">{index + 1}</td>
                  <td className="border border-white px-4 py-2">
                    {row.nama_produk}
                  </td>
                  <td className="border border-white px-4 py-2">
                    {row.jumlah_produk} Kg
                  </td>
                  <td className="border border-white px-4 py-2">
                    {formatRupiah(row.harga_produk)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end pr-3 pb-10 bg-lime-50">
            <h3 className="mr-32 mt-2 font-bold">
              {formatRupiah(totalPembelian)}
            </h3>
          </div>
          <div className="flex justify-end pr-10 pb-10 bg-lime-50">
            <button className="transition-all duration-1000 bg-lime-400 p-2 rounded mt-10 hover:bg-lime-500">
              Pesan sekarang
            </button>
          </div>
        </div>
      ) : (
        <h1 className="text-center">Belum ada data</h1>
      )}
    </div>
  );
}

export default Pembelian;
