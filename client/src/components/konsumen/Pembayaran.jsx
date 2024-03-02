import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BelumAdaData from "../BelumAdaData";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { animated, useSpring } from "react-spring";
import LoadingSpinner from "../animate/Loading";
import PaymentAnimateHistory from "../animate/PaymentAnimateHistory";
import SuccesAnimate from "../animate/SuccesAnimate";
import HistoryAnimate from "../animate/HistoryAnimate";

function Pembayaran() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [pembayaran, setPembayaran] = useState([]);
  const [pembayaranBelum, setPembayaranBelum] = useState([]);
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
  const scrollToBottom = () => {
    const scrollTop = document.body.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: scrollTop - 100,
      behavior: "smooth",
    });
  };

  const formatIndonesianDate = (date) => {
    return format(new Date(date), "dd MMMM yyyy", {
      locale: id,
    });
  };
  useEffect(() => {
    const fetchPembayaranBelum = async () => {
      const response = await axios("http://localhost:5000/pembayaran/belum");
      setPembayaranBelum(response.data);
    };
    fetchPembayaranBelum();
  }, []);
  useEffect(() => {
    const fetchPembayaran = async () => {
      const response = await axios("http://localhost:5000/pembayaran/sudah");
      setPembayaran(response.data);
    };
    fetchPembayaran();
  }, []);
  useEffect(() => {
    const fetchPenerimaan = async () => {
      const response = await axios(
        "http://localhost:5000/pembayaran/penerimaan/selesai"
      );
      setPenerimaan(response.data);
    };
    fetchPenerimaan();
  }, []);
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
    scrollToBottom();
  };
  const formatRupiah = (number) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2,
    });
    return formatter.format(number);
  };
  const deletePenerimaanSelesai = async (id) => {
    await axios.delete(`http://localhost:5000/pembayaran/${id}`);
    window.location.reload();
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
            {pembayaranBelum.length !== 0 && (
              <div className="border p-5 md:p-10 rounded-lg shadow mb-10 md:mb-0 md:mr-10">
                <div className="text-[10px] md:text-xs flex bg-yellow-400 p-2 rounded  w-[170px] md:w-64 shadow items-center">
                  <span className="text-[15px] md:text-xs material-symbols-outlined">
                    shopping_cart_checkout
                  </span>
                  <h1 className="ml-2 md:ml-5">Konfirmasi pembayaran</h1>
                </div>
                <div className="mt-5">
                  <h1 className="mb-5 text-[10px] md:text-xs text-gray-400">
                    Selsaikan pembayaran{" "}
                    <span className="text-black underline">disini!</span>
                  </h1>
                  {pembayaranBelum.map((row, index) => (
                    <div
                      key={index}
                      className="border transition-all duration-1000 flex flex-col md:flex-row md:justify-between md:w-[500px] md:h-[120px] rounded-lg shadow hover:shadow-lg p-5 md:items-center"
                    >
                      <div className="md:mx-0 mx-auto">
                        <PaymentAnimateHistory />
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
                        className="mt-10 md:mt-0 text-[10px] md:text-xs transition-all duration-1000 bg-yellow-400 hover:bg-yellow-300 p-2 rounded shadow text-sm"
                        onClick={() => navigate(`/pembayaran/${row.uuid}`)}
                      >
                        Konfirmasi
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {pembayaran.length !== 0 && (
              <div className="border p-5 md:p-10 rounded-lg shadow">
                <div className="text-[10px] md:text-xs flex bg-teal-400 p-2 rounded  w-[170px] md:w-64 shadow items-center">
                  <span className="text-[15px] md:text-xs material-symbols-outlined">
                    receipt_long
                  </span>
                  <h1 className="ml-2 md:ml-5">Konfirmasi Penerimaan</h1>
                </div>
                <div className="mt-5">
                  <h1 className="mb-5 text-[10px] md:text-xs text-gray-400">
                    Konfirmasi pesanan diterima{" "}
                    <span className="text-black underline">disini!</span>
                  </h1>
                  {pembayaran.map((row, index) => (
                    <div
                      key={index}
                      className="border transition-all duration-1000 flex flex-col md:flex-row md:justify-between md:w-[500px] md:h-[120px] rounded-lg shadow hover:shadow-lg p-5 md:items-center mb-5"
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
                        className="mt-10 md:mt-0 text-[10px] md:text-xs transition-all duration-1000 bg-teal-400 hover:bg-sky-300 p-2 rounded shadow text-sm"
                        onClick={(e) => updatePenerimaan(e, row.uuid)}
                      >
                        Diterima
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="w-full md:w-[1208px] flex flex-col mt-10">
            {penerimaan.length !== 0 && (
              <div className="border p-5 md:p-10 rounded-lg shadow">
                <div className="text-[10px] md:text-xs flex bg-green-400 p-2 rounded  w-[170px] md:w-64 shadow items-center">
                  <span className="text-[15px] md:text-xs material-symbols-outlined">
                    description
                  </span>
                  <h1 className="ml-2 md:ml-5">Pembelian selesai</h1>
                </div>
                <div className="mt-5 grid grid-cols-1 md:grid-cols-2 md:gap-20">
                  {penerimaan.map((row, index) => (
                    <div
                      key={index}
                      className="border transition-all duration-1000 flex flex-col md:flex-row justify-between w-[308px] h-[300px] md:w-[500px] md:h-[120px] rounded-lg shadow hover:shadow-lg p-5 items-center mt-5"
                    >
                      <div className="md:mx-0 mx-auto">
                        <HistoryAnimate />
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
                      <div className="flex items-center">
                        {isOpen && (
                          <Popover>
                            <div className="-mt-56 w-[400px] h-[150px] bg-white rounded p-5">
                              <p className="text-xs mb-10">
                                Apakah anda ingin menghapus data pembelian ini?
                                <br />
                                Seluruh data transaksi akan dihapus!
                              </p>
                              <div className="flex justify-end">
                                <button
                                  className="mr-3 transition-all duration-1000 bg-black text-white hover:bg-lime-400 hover:text-black p-2 rounded shadow text-xs"
                                  onClick={() => setIsOpen(!isOpen)}
                                >
                                  Tidak
                                </button>
                                <button
                                  className="mr-3 transition-all duration-1000 bg-green-400 hover:bg-green-300 hover:text-black p-2 px-4 rounded shadow text-xs"
                                  onClick={() =>
                                    deletePenerimaanSelesai(row.uuid)
                                  }
                                >
                                  Ya
                                </button>
                              </div>
                            </div>
                          </Popover>
                        )}
                        <div className="mt-5 md:mt-0">
                          <button
                            className=" mr-3 transition-all duration-1000 bg-black text-white hover:bg-green-400 hover:text-black p-2 rounded shadow text-xs"
                            onClick={() => setIsOpen(!isOpen)}
                          >
                            hapus
                          </button>
                          <button
                            className="transition-all duration-1000 bg-green-400 hover:bg-green-300 p-2 rounded shadow text-xs"
                            onClick={() => handlePembayaranItemClick(row.id)}
                          >
                            Lihat
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div
              className={`${
                pembelianByPembayaranId.length !== 0
                  ? "border p-5 md:p-10 shadow rounded-lg w-full my-10"
                  : "invisible"
              }`}
            >
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
          </div>
          {pembayaranBelum.length === 0 &&
            pembayaran.length === 0 &&
            penerimaan.length === 0 && (
              <div className="-mt-56 mb-32">
                <BelumAdaData />
              </div>
            )}
        </animated.div>
      )}
    </div>
  );
}

export default Pembayaran;
