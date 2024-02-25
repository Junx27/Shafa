import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Produk() {
  const [produk, setProduk] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeskripsi, setShowDeskripsi] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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
      minimumFractionDigits: 2,
    });
    return formatter.format(number);
  };

  const openPopHapus = (produkId) => {
    setDeleteId(produkId);
    scrollToTop();
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
        className="absolute top-40 right-10 hover:text-lime-400"
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
      <div className="absolute top-[100px] right-10">
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
            className="transition-all duration-1000 shadow-md rounded-b-lg relative hover:shadow-lg"
            key={index}
          >
            <img
              src={
                row.gambar_produk === "belum"
                  ? "http://localhost:5000/images/defaultProductImage.jpg"
                  : row.gambar_produk
              }
              alt=""
              className="transition-all duration-1000 rounded-t-lg brightness-90 hover:brightness-75 z-0 object-cover h-48 w-96"
            />
            {row.status_produk === "promo" && (
              <p className="bg-lime-400 rounded-b-lg p-2 w-16 absolute top-0 shadow">
                {row.status_produk}
              </p>
            )}

            <h1 className="font-bold ml-5 mt-2 capitalize">
              {row.nama_produk}
            </h1>
            <p className="ml-5 underline text-sm">
              {formatRupiah(row.harga_produk)}/Kg
            </p>

            {showDeskripsi && (
              <div>
                <p className="text-xs mx-5 text-lime-400 mt-3 text-justify">
                  {row.deskripsi_produk}
                </p>
              </div>
            )}
            <div className="flex justify-between items-center mx-5 pt-3 pb-5">
              <Link
                to={`/produk/edit/${row.uuid}`}
                className="transition-all duration-1000 bg-lime-400 hover:bg-lime-300 py-2 rounded-md px-5 flex text-xs"
              >
                <span className="material-symbols-outlined mr-2 text-xs">
                  edit
                </span>
                Edit
              </Link>
              <button
                className="transition-all duration-1000 border border-red-400 hover:bg-red-500 hover:text-white text-red-400 py-2 rounded-md px-3 flex text-xs"
                onClick={() => openPopHapus(row.uuid)}
              >
                <span className="material-symbols-outlined mr-2 text-xs">
                  delete
                </span>
                Hapus
              </button>
            </div>
          </div>
        ))}
        {deleteId && (
          <div className="bg-white shadow-lg w-[400px] h-[130px] rounded-lg absolute right-96 top-32">
            <p className="p-5">Apakah anda ingin menghapus produk ini?</p>
            <div className="flex justify-end mr-10">
              <button
                className="transition-all duration-1000 bg-lime-400 hover:bg-lime-300 py-2 rounded-md px-5 flex text-xs mr-5"
                onClick={() => {
                  closePopHapus();
                }}
              >
                Tidak
              </button>
              <button
                className="transition-all duration-1000 border border-red-400 hover:bg-red-500 hover:text-white text-red-400 py-2 rounded-md px-3 flex text-xs"
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
