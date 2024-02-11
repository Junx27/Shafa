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
      <div className="absolute top-24 left-32">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Cari produk..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-2 border border-lime-300 rounded-lg outline-lime-400 text-xs"
          />
          <button onClick={() => window.location.reload()}>
            <span className="material-symbols-outlined ml-2 bg-lime-300 p-2 rounded-full text-[17px]">
              autorenew
            </span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-10">
        {produk
          .filter((row) =>
            row.nama_produk.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((row, index) => (
            <div
              className="transition-all duration-1000 bg-lime-100 shadow-md hover:shadow-lg hover:shadow-lime-300 rounded-b-lg relative mt-10"
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
              {row.status_produk === "promo" && (
                <p className="bg-lime-300 rounded-b-lg p-2 w-16 absolute top-0 shadow-lg">
                  {row.status_produk}
                </p>
              )}

              <h1 className="font-bold ml-5 mt-2 capitalize">
                {row.nama_produk}
              </h1>
              <div className="flex justify-between items-center py-2">
                <p
                  className={`ml-5 underline text-sm my-3 font-light ${
                    row.status_produk === "promo" ? "text-red-500" : ""
                  }`}
                >
                  {formatRupiah(row.harga_produk)},00/Kg
                </p>
                <Link
                  to={`/transaksi/${row.uuid}`}
                  className="bg-lime-300 hover:bg-lime-400 py-2 rounded-md px-5 mx-auto text-xs"
                >
                  <div className="flex items-center">
                    <span className="material-symbols-outlined mr-2 text-xs">
                      shopping_cart
                    </span>
                    <p>Pesan</p>
                  </div>
                </Link>
              </div>
              {row.status_produk === "promo" && (
                <div className="bg-red-600 w-2 h-2 rounded-full animate-pulse absolute top-52 left-2"></div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default Produk;
