import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { animated, useSpring } from "react-spring";
import LoadingSpinner from "../animate/Loading";
import PaymentAnimate from "../animate/PaymentAnimate";
import PromoAnimate from "../animate/PromoAnimate";

function Produk() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [produk, setProduk] = useState([]);
  const [originalProduk, setOriginalProduk] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const jumlah = 1;
  const [nama_produk, setNamaProduk] = useState("");
  const [status_produk, setStatusProduk] = useState("");
  const [harga_produk, setHargaProduk] = useState("");
  const [userId, setUserId] = useState([]);
  const [gambar_produk, setGambarProduk] = useState(null);
  const [deskripsi_produk, setDeskripsi] = useState();
  const [idProduk, setIdProduk] = useState();
  const [getPembelian, setGetPembelian] = useState([]);
  const [loading, setLoading] = useState(false);
  const popoverRef = useRef(null);

  useEffect(() => {
    const startLoading = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 800);
    };
    startLoading();
  }, []);
  const animation = useSpring({
    opacity: loading ? 0 : 1,
    marginTop: loading ? -10 : 0,
  });

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQueryProduk = searchParams.get("search");

  useEffect(() => {
    const fetchProfil = async () => {
      const response = await axios("http://localhost:5000/me");
      setUserId(response.data.id);
    };
    fetchProfil();
  }, []);
  useEffect(() => {
    const fetchPembelian = async () => {
      const response = await axios.get(
        "http://localhost:5000/pembelian/status"
      );
      setGetPembelian(response.data);
    };
    fetchPembelian();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:5000/produk");
        setProduk(response.data);
        setOriginalProduk(response.data);
      } catch (error) {
        console.error("Gagal mengambil data produk", error);
      }
    }
    fetchData();
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setOpenFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
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

  const getProdukById = async (uuid) => {
    try {
      const response = await axios.get(`http://localhost:5000/produk/${uuid}`);
      setNamaProduk(response.data.nama_produk);
      setStatusProduk(response.data.status_produk);
      setHargaProduk(response.data.harga_produk);
      setGambarProduk(response.data.gambar_produk);
      setDeskripsi(response.data.deskripsi_produk);
      setIdProduk(response.data.id);
    } catch (error) {
      console.error("Gagal mendapatkan data produk by ID", error);
    }
  };
  const pembelian = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("nama_produk", nama_produk);
      formData.append("harga_produk", harga_produk);
      formData.append("jumlah_produk", jumlah);
      formData.append("total_transaksi", parseInt(harga_produk * jumlah));
      formData.append("gambar_produk", gambar_produk);
      formData.append("produk_id", idProduk);

      await axios.post("http://localhost:5000/transaksis", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/keranjang");
    } catch (error) {
      console.log(error);
    }
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
      <div className="-mt-5">
        <div className="relative flex items-center justify-center">
          <input
            type="text"
            placeholder="Cari produk..."
            value={searchQueryProduk === null ? searchQuery : searchQueryProduk}
            onChange={handleSearchChange}
            className="p-2 border border-green-400 rounded-lg text-xs w-64 md:w-[300px] outline-none"
          />
          <button
            onClick={() => {
              setSearchQuery("");
              navigate("/produkkonsumen");
            }}
          >
            <span className="material-symbols-outlined -ml-8 bg-green-400 p-2 rounded-r-lg text-[17px] hover:bg-green-300">
              autorenew
            </span>
          </button>
          <button
            className="flex items-center transition-all duration-1000 hover:text-green-400"
            onClick={() => setOpenFilter(!openFilter)}
          >
            <span className="material-symbols-outlined cursor-pointer ml-3 mr-2">
              filter_list
            </span>
            <p className="text-xs hover:underline">Filter</p>
          </button>
          {openFilter && (
            <div
              className="absolute top-0 right-64 bg-white z-20 text-xs flex flex-col items-start py-2 px-6 rounded border shadow"
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
        </div>
        {searchQueryProduk ? (
          <p className="mt-3 text-xs text-gray-400 text-center">
            Pastikan produk yang anda cari benar
          </p>
        ) : (
          ""
        )}
        <hr className="h-px border-0 bg-green-400 my-5" />
      </div>
      {loading ? (
        <div className="w-[100%] h-[800px]">
          <div className="flex justify-center mt-32">
            <LoadingSpinner />
          </div>
        </div>
      ) : (
        <animated.div
          style={animation}
          className="grid grid-cols-2 gap-5 md:grid-cols-5 md:gap-10"
        >
          {produk
            .filter((row) =>
              row.nama_produk
                .toLowerCase()
                .includes(
                  searchQueryProduk === null
                    ? searchQuery
                    : searchQueryProduk.toLowerCase()
                )
            )
            .map((row, index) => (
              <div
                className="transition-all duration-1000 shadow-md hover:shadow-lg rounded-b-lg relative"
                key={index}
              >
                <img
                  src={
                    row.gambar_produk === "belum"
                      ? "defaultProductImage.jpg"
                      : row.gambar_produk
                  }
                  alt=""
                  className="rounded-t-lg brightness-90 transition-all duration-1000 hover:brightness-75 z-0 object-cover w-64 h-32 md:h-48 md:w-96"
                />
                <div className="flex items-center">
                  <h1 className="font-bold ml-5 text-[10px] md:text-sm md:ml-5 mt-2 capitalize mr-3">
                    {row.nama_produk}
                  </h1>
                  {row.status_produk === "promo" && (
                    <div className="absolute -left-5  top-[120px] md:top-[180px]">
                      <PromoAnimate />
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-center py-2">
                  <p
                    className={`ml-5 md:ml-5 my-2 md:my-3 text-[8px] md:text-xs ${
                      row.status_produk === "promo" ? "text-red-400" : ""
                    }`}
                  >
                    {formatRupiah(row.harga_produk)},00/Kg
                  </p>
                  <button
                    onClick={() => {
                      getProdukById(row.uuid), setOpen(!open);
                    }}
                    className="transition-all duration-1000 bg-green-400 hover:bg-green-300 py-1 md:py-2 rounded-md px-2 md:px-5 mx-auto shadow"
                  >
                    <div className="flex items-center">
                      <p className="mr-2 text-sm font-bold">+</p>
                      <span className="material-symbols-outlined text-sm">
                        shopping_cart
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            ))}
        </animated.div>
      )}

      {open && (
        <Popover>
          {getPembelian.filter((row) => row.user_id === userId).length === 0 ? (
            <div className="-mt-20">
              <form
                onSubmit={pembelian}
                className="bg-white mb-10 transition-all duration-1000 pb-10 shadow-md rounded-lg hover:shadow-lg"
              >
                <div className="relative w-[350px] mt-32 md:mt-20 md:w-[400px] h-[450px] md:h-[480px]">
                  <span
                    className="absolute z-10 right-0 top-3 material-symbols-outlined mr-2 cursor-pointer text-white hover:bg-black rounded"
                    onClick={() => setOpen(!open)}
                  >
                    close
                  </span>
                  <img
                    src={gambar_produk}
                    alt=""
                    className="w-full h-[200px] md:w-[400px] md:h-[200px] transition-all duration-1000 rounded-t-lg object-cover hover:brightness-75"
                  />
                  <div className="mx-5 md:mx-10 relative">
                    <div className="flex items-center">
                      {status_produk === "promo" && (
                        <div className="-ml-8 md:-ml-14">
                          <PromoAnimate />
                        </div>
                      )}
                      <h1 className="text-xl md:text-3xl font-bold capitalize mt-2">
                        {nama_produk}
                      </h1>
                    </div>
                    <div className="grid grid-cols-1 gap-5 content-between mt-3">
                      <div className="h-24">
                        <p className="text-[10px] md:text-xs text-gray-400">
                          Deskripsi:
                        </p>
                        <p className="pt-1 pb-5 text-justify indent-8 text-[10px] md:text-xs">
                          {deskripsi_produk}
                        </p>
                      </div>
                      <p className="text-end pb-10 font-bold text-sm md:text-xl hover:underline cursor-pointer">
                        {formatRupiah(harga_produk)},00/Kg
                      </p>
                    </div>
                  </div>
                  <div className="text-end mr-5 md:mr-10 text-[10px] md:text-xs">
                    <button
                      className="shadow transition-all duration-1000 border bg-black text-white p-2 px-4 rounded mr-5 hover:bg-green-400 hover:text-black"
                      type="button"
                      onClick={() => setOpen(!open)}
                    >
                      Batal
                    </button>
                    <button
                      className="shadow transition-all duration-1000 bg-green-400 p-2 px-4 rounded hover:bg-green-300"
                      type="submit"
                    >
                      Pesan
                    </button>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            <div className="relative w-[600px] text-center mb-32 bg-white p-10 rounded-lg">
              <button
                onClick={() => window.location.reload()}
                className="absolute top-3 right-4 hover:bg-black hover:text-white px-1 rounded"
              >
                X
              </button>
              <div className="flex justify-center">
                <h1 className="font-bold mb-10 text-md md:text-xl bg-yellow-400 w-32 p-2 rounded-b-lg shadow text-center">
                  <span className="z-10">Perhatian!</span>
                </h1>
              </div>
              <PaymentAnimate />
              <h1 className="mt-5 text-gray-400 text-[10px] md:text-xs">
                Selsaikan pembayaran sebelumnya <br /> terlebih dahulu,
                <button
                  className="text-black hover:underline ml-2 cursor-pointer"
                  onClick={() => navigate("/riwayatkonsumen")}
                >
                  Selsaikan pembayaran disini!
                </button>
              </h1>
            </div>
          )}
        </Popover>
      )}
    </div>
  );
}

export default Produk;
