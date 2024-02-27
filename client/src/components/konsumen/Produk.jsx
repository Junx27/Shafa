import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Produk() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [produk, setProduk] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const jumlah = 1;
  const [kontak, setKontak] = useState();
  const [nama_produk, setNamaProduk] = useState("");
  const [status_produk, setStatusProduk] = useState("");
  const [harga_produk, setHargaProduk] = useState("");
  const [admin, setAdmin] = useState("");
  const [gambar_produk, setGambarProduk] = useState(null);
  const [deskripsi_produk, setDeskripsi] = useState();
  const [idProduk, setIdProduk] = useState();
  const [getPembelian, setGetPembelian] = useState([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQueryProduk = searchParams.get("search");

  useEffect(() => {
    console.log("Hasil pencarian:", searchQueryProduk);
  }, [searchQueryProduk]);

  const popProduk = () => {
    setOpen(!open);
  };
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
      } catch (error) {
        console.error("Gagal mengambil data produk", error);
      }
    }
    fetchData();
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

  const getProdukById = async (uuid) => {
    try {
      const response = await axios.get(`http://localhost:5000/produk/${uuid}`);
      setNamaProduk(response.data.nama_produk);
      setStatusProduk(response.data.status_produk);
      setHargaProduk(response.data.harga_produk);
      setAdmin(response.data.admin.nama);
      setKontak(response.data.admin.email);
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
        <div className="flex items-center justify-center">
          <input
            type="text"
            placeholder="Cari produk..."
            value={searchQueryProduk === null ? searchQuery : searchQueryProduk}
            onChange={handleSearchChange}
            className="p-2 border border-lime-300 rounded-lg text-xs w-[300px] outline-none"
          />
          <button
            onClick={() => {
              setSearchQuery("");
              navigate("/produkkonsumen");
            }}
          >
            <span className="material-symbols-outlined -ml-8 bg-lime-400 p-2 rounded-r-lg text-[17px] hover:bg-lime-300">
              autorenew
            </span>
          </button>
        </div>
        {searchQueryProduk ? (
          <p className="mt-3 text-xs text-gray-400 text-center">
            Pastikan produk yang anda cari benar
          </p>
        ) : (
          ""
        )}
        <hr className="h-px border-0 bg-lime-200 my-5" />
      </div>
      <div className="grid grid-cols-5 gap-10">
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
                <button
                  onClick={() => getProdukById(row.uuid, popProduk())}
                  className="transition-all duration-1000 bg-lime-400 hover:bg-lime-300 py-2 rounded-md px-5 mx-auto shadow"
                >
                  <div className="flex items-center">
                    <p className="mr-2 text-sm font-bold">+</p>
                    <span className="material-symbols-outlined text-sm">
                      shopping_cart
                    </span>
                  </div>
                </button>
              </div>
              {row.status_produk === "promo" && (
                <div className="bg-lime-400 w-2 h-2 rounded-full animate-pulse absolute top-52 left-2"></div>
              )}
            </div>
          ))}
      </div>
      {open && (
        <Popover>
          {getPembelian.length === 0 ? (
            <div className="-mt-20">
              <form
                onSubmit={pembelian}
                className="bg-white mb-10 transition-all duration-1000 pb-10 shadow-md rounded-lg hover:shadow-lg"
              >
                <div className="relative mt-20 w-[600px]">
                  <span
                    className="absolute z-10 right-0 top-3 material-symbols-outlined mr-2 cursor-pointer hover:text-white hover:bg-black rounded"
                    onClick={() => setOpen(!open)}
                  >
                    close
                  </span>
                  <img
                    src={gambar_produk}
                    alt=""
                    className="w-[600px] h-[400px] transition-all duration-1000 rounded-t-lg object-cover hover:brightness-75"
                  />
                  <div className="mt-2 mx-10 relative">
                    <div className="flex items-center">
                      <h1 className="text-3xl font-bold">{nama_produk}</h1>
                      {status_produk === "promo" && (
                        <p className="w-20 ml-5 text-center text-xs bg-lime-400 p-1 rounded shadow">
                          {status_produk}
                        </p>
                      )}
                    </div>
                    <div className="flex justify-between items-center my-3 text-xs text-gray-400">
                      <div className="flex items-center">
                        <span className="material-symbols-outlined mr-2">
                          person
                        </span>
                        <p>Diterbitkan oleh {admin}</p>
                      </div>
                      <div className="flex items-center">
                        <span className="material-symbols-outlined mr-2">
                          email
                        </span>
                        <p>{kontak}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400">Deskripsi:</p>
                    <p className="pt-1 pb-5 text-justify indent-8 text-xs">
                      {deskripsi_produk}
                    </p>
                    <p className="text-end pb-10 font-bold text-3xl">
                      {formatRupiah(harga_produk)},00/Kg
                    </p>
                  </div>
                </div>
                <div className="text-end mr-10 text-xs">
                  <button
                    className="shadow transition-all duration-1000 border bg-black text-white p-2 px-4 rounded mr-5 hover:bg-lime-400 hover:text-black"
                    type="button"
                    onClick={() => setOpen(!open)}
                  >
                    Batal
                  </button>
                  <button
                    className="shadow transition-all duration-1000 bg-lime-300 p-2 px-4 rounded hover:bg-lime-400"
                    type="submit"
                  >
                    Pesan
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="w-[600px] text-center mb-32 bg-white p-10 rounded-lg">
              <hr className="h-px border-0 bg-lime-200" />
              <div className="flex justify-center">
                <h1 className="font-bold mb-20 text-xl bg-lime-400 w-32 p-2 rounded-b-lg shadow text-center">
                  <span className="z-10">Perhatian!</span>
                </h1>
              </div>
              <span className="material-symbols-outlined text-6xl p-2 rounded-full bg-lime-400 animate-bounce shadow">
                credit_card_gear
              </span>

              <h1 className="mt-5 text-gray-400 text-xs">
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
