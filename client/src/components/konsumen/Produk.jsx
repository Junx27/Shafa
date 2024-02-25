import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Produk() {
  const [produk, setProduk] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const produkList = async () => {
    try {
      const response = await axios.get("http://localhost:5000/produk");
      setProduk(response.data);
    } catch (error) {
      console.error("Gagal mengambil data produk", error);
    }
  };

  useEffect(() => {
    produkList();
  }, []);

  const formatRupiah = (number) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
    return formatter.format(number);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <div className="-mt-5">
        <div className="flex items-center justify-center">
          <input
            type="text"
            placeholder="Cari produk..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-2 border border-lime-300 rounded-lg text-xs w-[300px] outline-none"
          />
          <button onClick={() => window.location.reload()}>
            <span className="material-symbols-outlined -ml-8 bg-lime-400 p-2 rounded-r-lg text-[17px] hover:bg-lime-300">
              autorenew
            </span>
          </button>
        </div>
        <hr className="h-px border-0 bg-lime-200 my-5" />
      </div>
      <div className="grid grid-cols-5 gap-10">
        {produk
          .filter((row) =>
            row.nama_produk.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((row, index) => (
            <div
              className="transition-all duration-1000 shadow-md hover:shadow-lg rounded-b-lg relative"
              key={index}
            >
              <img
                src={
                  row.gambar_produk === "belum"
                    ? "http://localhost:5000/images/defaultProductImage.jpg"
                    : row.gambar_produk
                }
                alt=""
                className="rounded-t-lg brightness-90 transition-all duration-1000 hover:brightness-75 z-0 object-cover h-48 w-96"
              />
              <div className="flex items-center">
                <h1 className="font-bold ml-5 mt-2 capitalize mr-3">
                  {row.nama_produk}
                </h1>
                {row.status_produk === "promo" && (
                  <p className="absolute right-2 top-2 text-xs bg-lime-400 p-1 rounded shadow">
                    {row.status_produk}
                  </p>
                )}
              </div>
              <div className="flex justify-between items-center py-2">
                <p
                  className={`ml-5 my-3 text-xs ${
                    row.status_produk === "promo" ? "text-lime-600" : ""
                  }`}
                >
                  {formatRupiah(row.harga_produk)},00/Kg
                </p>
                <Link
                  to={`/transaksi/${row.uuid}`}
                  className="transition-all duration-1000 bg-lime-400 hover:bg-lime-300 py-2 rounded-md px-5 mx-auto shadow"
                >
                  <div className="flex items-center">
                    <p className="mr-2 text-sm font-bold">+</p>
                    <span className="material-symbols-outlined text-sm">
                      shopping_cart
                    </span>
                  </div>
                </Link>
              </div>
              {row.status_produk === "promo" && (
                <div className="bg-lime-400 w-2 h-2 rounded-full animate-pulse absolute top-52 left-2"></div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default Produk;
