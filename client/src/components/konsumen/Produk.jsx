import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Produk() {
  const [produk, setProduk] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeskripsi, setShowDeskripsi] = useState(false);

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
  const hapus = async (produkId) => {
    try {
      await axios.delete(`http://localhost:5000/produk/${produkId}`);
      produkList();
    } catch (error) {
      console.error("Gagal menghapus data produk", error);
    }
  };
  const formatRupiah = (number) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
    return formatter.format(number);
  };

  const closePopHapus = () => {
    setDeleteId(null);
  };

  const filteredProduk = produk.filter((row) =>
    row.nama_produk.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  return (
    <div>
      <button
        onClick={() => setShowDeskripsi(!showDeskripsi)}
        className="text-lime-600 absolute top-24 left-32 hover:text-lime-700"
      >
        <div className="flex items-center">
          <span className="material-symbols-outlined mr-2">
            {showDeskripsi ? "move_group" : "pip"}
          </span>
          <p className="text-xs">
            {showDeskripsi ? "Tutup deskripsi" : "Lihat deskripsi"}
          </p>
        </div>
      </button>
      <div className="absolute top-24 right-10">
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
        {filteredProduk.map((row, index) => (
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
              <p className="bg-lime-400 rounded-b-lg p-2 w-16 absolute top-0 shadow">
                {row.status_produk}
              </p>
            )}

            <h1 className="font-bold ml-5 mt-2 capitalize">
              {row.nama_produk}
            </h1>
            <p
              className={`ml-5 underline text-sm my-3 font-light ${
                row.status_produk === "promo" ? "text-red-500" : ""
              }`}
            >
              {formatRupiah(row.harga_produk)},00/Kg
            </p>
            {row.status_produk === "promo" && (
              <div className="bg-red-600 w-2 h-2 rounded-full animate-pulse absolute top-52 left-2"></div>
            )}

            {showDeskripsi && (
              <div>
                <p className="text-xs mx-5 text-lime-600 mt-3 text-justify">
                  {row.deskripsi_produk}
                </p>
              </div>
            )}
            <div className="flex justify-between items-center mx-5 pt-3 pb-5">
              <Link
                to={`/transaksi/${row.uuid}`}
                className="bg-lime-400 hover:bg-lime-500 py-2 rounded-md px-5 text-xs mx-auto"
              >
                <span className="material-symbols-outlined mr-2 text-xs">
                  edit
                </span>
                Beli Sekarang
              </Link>
            </div>
          </div>
        ))}
        {deleteId && (
          <div className="bg-lime-100 w-[400px] h-[130px] rounded-lg absolute right-96 top-32">
            <p className="p-5">Apakah anda ingin menghapus produk ini?</p>
            <div className="flex justify-end mr-10">
              <button
                className="bg-red-400 hover:bg-red-500 text-white py-2 px-5 rounded-lg mr-8"
                onClick={() => {
                  closePopHapus();
                }}
              >
                Tidak
              </button>
              <button
                className="bg-lime-400 hover:bg-lime-500 py-2 px-5 rounded-lg"
                onClick={() => {
                  hapus(deleteId);
                  closePopHapus();
                }}
              >
                Ya
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Produk;
