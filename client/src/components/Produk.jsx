import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function Produk() {
  const [open, setOpen] = useState(false);
  const [produk, setProduk] = useState([]);
  const [originalProduk, setOriginalProduk] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeskripsi, setShowDeskripsi] = useState(false);
  const popoverRef = useRef(null);

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
      setOriginalProduk(response.data);
    } catch (error) {
      console.error("Gagal mengambil data produk", error);
    }
  };

  useEffect(() => {
    produkList();
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
  const filterResult = (item) => {
    if (item === "Semua") {
      setProduk(originalProduk);
    } else {
      const result = originalProduk.filter(
        (row) => row.status_produk.toLowerCase() === item
      );
      setProduk(result);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // eslint-disable-next-line react/prop-types
  const Popover = ({ children }) => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div>{children}</div>
      </div>
    );
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center">
          <button
            onClick={() => setShowDeskripsi(!showDeskripsi)}
            className="transition-all duration-1000 hover:text-green-400"
          >
            <div className="flex items-center">
              <span className="material-symbols-outlined mr-2">
                {showDeskripsi ? "move_group" : "pip"}
              </span>
              <p className="text-xs hover:underline">
                {showDeskripsi ? "Tutup deskripsi" : "Lihat deskripsi"}
              </p>
            </div>
          </button>
          <button
            className="flex items-center transition-all duration-1000 hover:text-green-400"
            onClick={() => setOpen(!open)}
          >
            <span className="material-symbols-outlined cursor-pointer ml-3 mr-2">
              filter_list
            </span>
            <p className="text-xs hover:underline">Filter</p>
          </button>
          <button
            className="flex items-center transition-all duration-1000 hover:text-green-400"
            onClick={() => window.location.reload()}
          >
            <span className="material-symbols-outlined cursor-pointer ml-3 mr-2">
              cached
            </span>
            <p className="text-xs hover:underline">Refresh all</p>
          </button>
        </div>
        {open && (
          <div
            className="absolute bg-white z-20 text-xs flex flex-col items-start py-2 px-6 rounded border shadow"
            ref={popoverRef}
          >
            <button
              onClick={() => filterResult("promo")}
              className="my-1 hover:text-green-400 cursor-pointer"
            >
              Promo
            </button>
            <button
              onClick={() => filterResult("tidak promo")}
              className="my-1 hover:text-green-400 cursor-pointer"
            >
              Tidak promo
            </button>
            <button
              onClick={() => filterResult("Semua")}
              className="my-1 hover:text-green-400 cursor-pointer"
            >
              Semua
            </button>{" "}
          </div>
        )}
        <div className="text-xs">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Cari produk..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="border border-green-400 w-64 p-2 rounded outline-none text-xs"
            />
          </div>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-4 gap-10">
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
              <p className="bg-green-400 rounded text-center p-1 w-16 absolute top-2 right-2 shadow text-xs">
                {row.status_produk}
              </p>
            )}

            <h1 className="font-bold ml-5 mt-2 capitalize">
              {row.nama_produk}
            </h1>
            <p className="ml-5 mt-2 text-xs">
              {formatRupiah(row.harga_produk)}/Kg
            </p>

            {showDeskripsi && (
              <div>
                <p className="text-xs mx-5 text-gray-400 mt-3 text-justify">
                  {row.deskripsi_produk}
                </p>
              </div>
            )}
            <div className="flex justify-between items-center mx-5 pt-3 pb-5">
              <Link
                to={`/produk/edit/${row.uuid}`}
                className="transition-all duration-1000 bg-green-400 hover:bg-green-300 py-2 rounded-md px-5 flex text-xs"
              >
                <span className="material-symbols-outlined mr-2 text-xs">
                  edit
                </span>
                Edit
              </Link>
              <button
                className="transition-all duration-1000 bg-black hover:bg-green-400 text-white py-2 rounded-md px-3 flex text-xs"
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
          <Popover>
            <div className="text-xs bg-white shadow-lg w-[400px] h-[130px] rounded-lg absolute right-96 top-32">
              <p className="p-5">Apakah anda ingin menghapus produk ini?</p>
              <div className="mt-5 flex justify-end mr-10">
                <button
                  className="w-12 transition-all duration-1000 bg-black hover:bg-green-400 text-white py-2 rounded-md flex justify-center text-xs mr-5"
                  onClick={() => {
                    closePopHapus();
                  }}
                >
                  Tidak
                </button>
                <button
                  className="w-12 transition-all duration-1000 bg-green-400 hover:bg-green-300 py-2 rounded-md flex justify-center text-xs"
                  onClick={() => {
                    hapus(deleteId);
                    closePopHapus();
                  }}
                >
                  Ya
                </button>
              </div>
            </div>
          </Popover>
        )}
      </div>
    </div>
  );
}

export default Produk;
