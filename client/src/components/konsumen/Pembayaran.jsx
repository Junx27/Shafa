import axios from "axios";
import { useEffect, useState } from "react";
import BelumAdaData from "../BelumAdaData";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { animated, useSpring } from "react-spring";
import LoadingSpinner from "../animate/Loading";
import SuccesAnimate from "../animate/SuccesAnimate";
import HistoryAnimate from "../animate/HistoryAnimate";
import Shipping from "../animate/Shipping";

function Pembayaran() {
  const [userId, setUserId] = useState([]);
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [pembayaran, setPembayaran] = useState([]);
  const [penerimaan, setPenerimaan] = useState([]);
  const [pembelianByPembayaranId, setPembelianByPembayaranId] = useState([]);
  const [loading, setLoading] = useState(false);

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
  useEffect(() => {
    const fetchProfil = async () => {
      const response = await axios("http://localhost:5000/me");
      setUserId(response.data.id);
    };
    fetchProfil();
  }, []);

  const formatIndonesianDate = (date) => {
    return format(new Date(date), "dd MMMM yyyy", {
      locale: id,
    });
  };
  useEffect(() => {
    const fetchPembayaran = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/pembayaran/sudah"
        );
        setPembayaran(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPembayaran();
  }, [userId]);
  useEffect(() => {
    const fetchPenerimaan = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/pembayaran/penerimaan/selesai"
        );
        setPenerimaan(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPenerimaan();
  }, [userId]);
  const updatePenerimaan = async (e, id) => {
    e.preventDefault();
    try {
      const status = "sudah";
      const formData = new FormData();
      formData.append("status_penerimaan", status);
      await axios.patch(`http://localhost:5000/pembayaran/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      window.location.reload();
    } catch (error) {
      if (error.response) {
        console.error("Gagal memperbarui data:", error);
      }
    }
  };
  const getPembelianByPembayaranId = async (pembayaranId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/pembelian/pembayaran/${pembayaranId}`
      );
      setPembelianByPembayaranId(response.data);
    } catch (error) {
      console.error("Gagal mengambil data pembelian:", error);
    }
  };
  const totalKeseluruhan = pembelianByPembayaranId.reduce(
    (total, pembelian) => total + parseInt(pembelian.total_pembelian),
    0
  );
  const handlePembayaranItemClick = (pembayaranId) => {
    getPembelianByPembayaranId(pembayaranId);
    setOpen(!open);
  };
  const formatRupiah = (number) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2,
    });
    return formatter.format(number);
  };
  const deletePenerimaanSelesai = async (e, id) => {
    e.preventDefault();
    try {
      const status = "dihapus";
      const formData = new FormData();
      formData.append("status_penerimaan", status);
      await axios.patch(`http://localhost:5000/pembayaran/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      window.location.reload();
    } catch (error) {
      if (error.response) {
        console.error("Gagal memperbarui data:", error);
      }
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
      {loading ? (
        <div className="w-[100%] h-[800px]">
          <div className="flex justify-center mt-64">
            <LoadingSpinner />
          </div>
        </div>
      ) : (
        <animated.div style={animation}>
          <div className="flex flex-col md:flex-row">
            {pembayaran.filter(
              (row) =>
                row.user_id === userId && row.status_pengiriman === "belum"
            ).length !== 0 && (
              <div className="border p-5 md:p-10 rounded-lg shadow mb-10 md:mb-0 md:mr-10">
                <div className="text-[10px] md:text-xs flex bg-orange-400 p-2 rounded  w-[170px] md:w-64 shadow items-center">
                  <span className="text-[15px] md:text-xs material-symbols-outlined">
                    box_add
                  </span>
                  <h1 className="ml-2">Pesanan Dikemas</h1>
                </div>
                <div className="mt-5">
                  <h1 className="mb-5 text-[10px] md:text-xs text-gray-400">
                    Selsaikan pembayaran{" "}
                    <span className="text-black underline">disini!</span>
                  </h1>
                  {pembayaran
                    .filter(
                      (row) =>
                        row.user_id === userId &&
                        row.status_pengiriman === "belum"
                    )
                    .map((row, index) => (
                      <div
                        key={index}
                        className="border transition-all duration-1000 flex flex-col md:flex-row md:justify-between md:w-[500px] md:h-[120px] rounded-lg shadow hover:shadow-lg p-5 md:items-center mb-8"
                      >
                        <div className="md:mx-0 mx-auto">
                          <Shipping />
                        </div>
                        <div className="flex flex-col mt-10 md:mt-0">
                          <p className="text-xs md:text-md font-bold capitalize">
                            {row.nama}
                          </p>
                          <p className="text-[10px] md:text-xs text-gray-400 my-1">
                            Detail:
                          </p>
                          <hr />
                          <p className="text-[10px] md:text-xs mt-2">
                            {formatIndonesianDate(row.createdAt)}/
                            <span className="font-bold">
                              {formatRupiah(row.total)}
                            </span>
                          </p>
                        </div>
                        <button
                          className="w-full md:w-20 mt-10 md:mt-0 text-[10px] md:text-xs transition-all duration-1000 bg-black text-white hover:bg-orange-400 hover:text-black p-2 rounded shadow text-sm"
                          onClick={() => handlePembayaranItemClick(row.id)}
                        >
                          Lihat
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            )}
            {pembayaran.filter(
              (row) =>
                row.user_id === userId && row.status_pengiriman === "sudah"
            ).length !== 0 && (
              <div className="border p-5 md:p-10 rounded-lg shadow">
                <div className="text-[10px] md:text-xs flex bg-teal-400 p-2 rounded  w-[170px] md:w-64 shadow items-center">
                  <span className="text-[15px] md:text-xs material-symbols-outlined">
                    local_shipping
                  </span>
                  <h1 className="ml-2">Konfirmasi Penerimaan</h1>
                </div>
                <div className="mt-5">
                  <h1 className="mb-5 text-[10px] md:text-xs text-gray-400">
                    Konfirmasi pesanan diterima{" "}
                    <span className="text-black underline">disini!</span>
                  </h1>
                  {pembayaran
                    .filter(
                      (row) =>
                        row.user_id === userId &&
                        row.status_pengiriman === "sudah"
                    )
                    .map((row, index) => (
                      <div
                        key={index}
                        className="relative border transition-all duration-1000 flex flex-col md:flex-row md:justify-between md:w-[500px] md:h-[120px] rounded-lg shadow hover:shadow-lg p-5 md:items-center mb-8"
                      >
                        <div className="md:mx-0 mx-auto">
                          <SuccesAnimate />
                        </div>
                        <div className="flex flex-col mt-10 md:mt-0">
                          <p className="text-xs md:text-md font-bold capitalize">
                            {row.nama}
                          </p>
                          <p className="text-[10px] md:text-xs text-gray-400 my-1">
                            Detail:
                          </p>
                          <hr />
                          <p className="text-[10px] md:text-xs mt-2">
                            {formatIndonesianDate(row.createdAt)}/
                            <span className="font-bold">
                              {formatRupiah(row.total)}
                            </span>
                          </p>
                        </div>
                        <button
                          className="w-full ml-0 md:ml-3 md:w-20 mt-10 md:mt-0 text-[10px] md:text-xs transition-all duration-1000 bg-black text-white hover:bg-teal-300 p-2 rounded shadow text-sm"
                          onClick={() => handlePembayaranItemClick(row.id)}
                        >
                          Lihat
                        </button>
                        <button
                          className="w-full ml-0 md:ml-3 md:w-20 mt-3 md:mt-0 text-[10px] md:text-xs transition-all duration-1000 bg-teal-400 hover:bg-sky-300 p-2 rounded shadow text-sm"
                          onClick={(e) => updatePenerimaan(e, row.uuid)}
                        >
                          Diterima
                        </button>
                        <p className="absolute -top-6 right-0 text-gray-400 text-xs">
                          No. paket:
                          <span className="font-bold text-black hover:underline cursor-pointer">
                            {row.bukti_pengiriman}
                          </span>
                          <span
                            className="ml-3 text-xs material-symbols-outlined cursor-pointer"
                            onClick={() => {
                              navigator.clipboard.writeText(
                                row.bukti_pengiriman
                              );
                              alert("No. paket berhasil disalin!");
                            }}
                          >
                            content_copy
                          </span>
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
          <div className="w-full md:w-[1208px] mt-10">
            {penerimaan.filter((row) => row.user_id === userId).length !==
              0 && (
              <div className="border p-5 md:p-10 rounded-lg shadow">
                <div className="text-[10px] md:text-xs flex bg-green-400 p-2 rounded  w-[170px] md:w-64 shadow items-center">
                  <span className="text-[15px] md:text-xs material-symbols-outlined">
                    description
                  </span>
                  <h1 className="ml-2">Pembelian selesai</h1>
                </div>
                <div className="mt-5 flex flex-col md:flex-row overflow-x-auto -ml-5">
                  {penerimaan
                    .filter((row) => row.user_id === userId)
                    .sort(
                      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    )
                    .map((row, index) => (
                      <div
                        key={index}
                        className="border transition-all duration-1000 flex flex-col md:flex-row justify-between w-[308px] h-[370px] md:w-[500px] md:h-[120px] rounded-lg shadow hover:shadow-lg p-5 items-center mx-5"
                      >
                        <div className="md:mx-0 mx-auto">
                          <HistoryAnimate />
                        </div>
                        <div className="w-full flex flex-col mt-10 md:mt-0">
                          <p className="text-xs md:text-md font-bold capitalize">
                            {row.nama}
                          </p>
                          <p className="text-[10px] md:text-xs text-gray-400 my-1">
                            Detail:
                          </p>
                          <hr />
                          <p className="text-[10px] md:text-xs mt-2">
                            {formatIndonesianDate(row.createdAt)}/
                            <span className="font-bold">
                              {formatRupiah(row.total)}
                            </span>
                          </p>
                        </div>
                        <button
                          className="w-full ml-0 md:ml-3 md:w-20 mt-10 md:mt-0 text-[10px] md:text-xs transition-all duration-1000 bg-black text-white hover:bg-teal-300 p-2 rounded shadow text-sm"
                          onClick={() => setIsOpen(!isOpen)}
                        >
                          hapus
                        </button>
                        <button
                          className="w-full ml-0 md:ml-3 md:w-20 mt-3 md:mt-0 text-[10px] md:text-xs transition-all duration-1000 bg-green-400 hover:bg-green-300 p-2 rounded shadow text-sm"
                          onClick={() => handlePembayaranItemClick(row.id)}
                        >
                          Lihat
                        </button>
                        <div className="flex items-center">
                          {isOpen && (
                            <Popover>
                              <div className="-mt-56 w-[400px] h-[150px] bg-white rounded p-5">
                                <p className="text-xs mb-10">
                                  Apakah anda ingin menghapus data pembelian
                                  ini?
                                  <br />
                                  Seluruh data transaksi akan dihapus!
                                </p>
                                <div className="flex justify-end">
                                  <button
                                    className="mr-3 transition-all duration-1000 bg-black text-white hover:bg-green-400 hover:text-black p-2 rounded shadow text-xs"
                                    onClick={() => setIsOpen(!isOpen)}
                                  >
                                    Tidak
                                  </button>
                                  <button
                                    className="mr-3 transition-all duration-1000 bg-green-400 hover:bg-green-300 hover:text-black p-2 px-4 rounded shadow text-xs"
                                    onClick={(e) =>
                                      deletePenerimaanSelesai(e, row.uuid)
                                    }
                                  >
                                    Ya
                                  </button>
                                </div>
                              </div>
                            </Popover>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
            {open && (
              <Popover>
                <div
                  className={`${
                    pembelianByPembayaranId.length !== 0
                      ? "relative bg-white border p-5 md:p-10 shadow rounded-lg  w-[350px] md:w-full h-[700px] md:h-[750px] my-10 overflow-auto"
                      : "invisible"
                  }`}
                >
                  <span
                    className="absolute top-3 right-3 material-symbols-outlined cursor-pointer z-50"
                    onClick={() => setOpen(!open)}
                  >
                    cancel
                  </span>
                  <div className="text-[10px] md:text-xs flex bg-green-400 p-2 rounded  w-[170px] md:w-64 shadow items-center">
                    <span className="text-[15px] md:text-xs material-symbols-outlined">
                      page_info
                    </span>
                    <h1 className="ml-2 md:ml-5">Detail pembelian</h1>
                  </div>
                  {pembelianByPembayaranId.map((row, index) => (
                    <div
                      key={index}
                      className="transition-all duration-1000 flex justify-between items-center shadow mt-5 rounded-lg hover:shadow-lg"
                    >
                      <img
                        src={row.produk.gambar_produk}
                        alt=""
                        className="w-20 h-20 rounded-l shadow object-cover"
                      />
                      <h1 className="font-bold md:ml-5 text-[10px] md:text-xs">
                        {row.nama_produk}
                      </h1>
                      <p className="mx-1 md:mx-3 text-gray-400 text-xs">
                        X {row.jumlah_produk}
                      </p>
                      <p className="hidden md:block text-gray-400 text-xs">
                        {formatRupiah(row.harga_produk)}
                      </p>
                      <p className="hidden md:block mx-3 text-gray-400 text-xs">
                        total
                      </p>
                      <p className="mx-3 text-gray-400 text-xs">
                        {formatRupiah(row.total_pembelian)}
                      </p>
                    </div>
                  ))}
                  <div>
                    <div>
                      <p className="text-[10px] md:text-xs text-gray-400 text-end mt-5">
                        Biaya pengiriman = Rp.20.000,00
                      </p>
                      <hr className="h-px border-0 bg-green-400 my-5" />
                      <div className="flex justify-end">
                        <p className="text-xs md_text-md font-bold">
                          {formatRupiah(totalKeseluruhan + 20000)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Popover>
            )}
          </div>
          {pembayaran.filter((row) => row.user_id === userId).length === 0 &&
            penerimaan.filter((row) => row.user_id === userId).length === 0 && (
              <div className="mb-32">
                <BelumAdaData />
              </div>
            )}
        </animated.div>
      )}
    </div>
  );
}

export default Pembayaran;
