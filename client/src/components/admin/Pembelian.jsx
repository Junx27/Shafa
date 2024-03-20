import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import LoadingSpinner from "../animate/Loading";
import { animated, useSpring } from "react-spring";
import PopOver from "../layout/PopOver";

function Pembelian() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [bukti_pengiriman, setBuktiPengiriman] = useState("");
  const [status_bukti_pengiriman, setStatusBuktiPengiriman] = useState("");
  const { pesananId } = useParams();
  const [pembelianId, setPembelianId] = useState("");
  const [pembelianByPembayaranId, setPembelianByPembayaranId] = useState([]);
  const [uuid, setUuid] = useState([]);
  const [gambar_profil, setGambarProfil] = useState("");
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [bukti_transfer, setBuktiTransfer] = useState("");
  const [total, setTotal] = useState("");
  const [status_pembayaran, setStatusPembayaran] = useState("");
  const [status_pengiriman, setStatusPengiriman] = useState("");
  const [status_penerimaan, setStatusPenerimaan] = useState("");
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
    marginTop: loading ? -50 : 0,
  });
  const getPesananById = async () => {
    const response = await axios.get(
      `http://localhost:5000/pembayaran/${pesananId}`
    );
    setPembelianId(response.data.id);
    setUuid(response.data.uuid);
    setNama(response.data.nama);
    setGambarProfil(response.data.user.gambar_profil);
    setAlamat(response.data.alamat);
    setCreatedAt(formatIndonesianDate(response.data.createdAt));
    setTotal(response.data.total);
    setBuktiTransfer(response.data.bukti_pembayaran);
    setStatusPembayaran(response.data.status_pembayaran);
    setStatusPengiriman(response.data.status_pengiriman);
    setStatusBuktiPengiriman(response.data.bukti_pengiriman);
    setStatusPenerimaan(response.data.status_penerimaan);
  };
  useEffect(() => {
    getPesananById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const formatRupiah = (number) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2,
    });
    return formatter.format(number);
  };
  const formatIndonesianDate = (date) => {
    return format(new Date(date), "dd MMMM yyyy", {
      locale: id,
    });
  };
  useEffect(() => {
    const getPembelianByPembayaranId = async (pembelianId) => {
      try {
        const response = await axios.get(
          `http://localhost:5000/pembelian/pembayaran/${pembelianId}`
        );
        setPembelianByPembayaranId(response.data);
      } catch (error) {
        console.error("Gagal mengambil data pembelian:", error);
      }
    };
    const data = setTimeout(() => {
      getPembelianByPembayaranId(pembelianId);
    }, 500);
    return () => clearTimeout(data);
  }, [pembelianId]);
  const totalKeseluruhan = pembelianByPembayaranId.reduce(
    (total, pembelian) => total + parseInt(pembelian.total_pembelian),
    0
  );
  const updateStatusPengiriman = async (e) => {
    e.preventDefault();
    try {
      const status = "sudah";
      const formData = new FormData();
      formData.append("status_pengiriman", status);
      formData.append("bukti_pengiriman", bukti_pengiriman);
      await axios.patch(`http://localhost:5000/pembayaran/${uuid}`, formData, {
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
  return (
    <div>
      {loading ? (
        <div className="mt-64">
          <LoadingSpinner />
        </div>
      ) : (
        <animated.div className="mt-10" style={animation}>
          <div className="flex justify-between items-center">
            <div className="text-[10px] md:text-xs flex bg-green-400 p-2 rounded w-[220px] md:w-[250px] md:w-64 shadow items-center">
              <span className="text-[15px] md:text-xs material-symbols-outlined">
                description
              </span>
              <h1 className="ml-2">Informasi data pembelian konsumen</h1>
            </div>
            <div>
              <span
                className="transition-all duration-1000 hover:text-red-400 relative right-2 material-symbols-outlined cursor-pointer"
                onClick={() => navigate("/riwayat")}
              >
                cancel
              </span>
            </div>
          </div>
          <div className="mt-5 relative border transition-all duration-1000 flex flex-col md:flex-row md:justify-between md:w-full md:h-[120px] rounded-lg shadow hover:shadow-lg p-5 md:items-center mb-5">
            <img
              src={
                gambar_profil === "belum"
                  ? "http://localhost:5000/images/defaultProfile.png"
                  : gambar_profil
              }
              alt=""
              className="w-16 mx-auto md:mr-5 md:ml-3 rounded-full shadow"
            />
            <div className="flex flex-col mt-10 md:mt-0 h-[100px] my-auto mr-2">
              <p className="text-xs md:text-md font-bold capitalize">{nama}</p>
              <p className="text-[10px] md:text-xs text-gray-400 my-1">
                Detail:
              </p>
              <hr />
              <p className="text-[10px] md:text-xs mt-2">{createdAt}</p>
              <span className="font-bold">{formatRupiah(total)}</span>
            </div>
            <div className="border-l pl-2 text-xs flex flex-col h-[80px] my-auto">
              <p className="font-bold">Alamat pengiriman</p>
              <p className="mt-8 capitalize">{alamat}</p>
            </div>
            <div className="border-l pl-2 text-xs flex flex-col h-[80px] my-auto">
              <p className="font-bold">Status pembayaran</p>
              <p
                className={`mt-8 capitalize ${
                  status_pembayaran === "belum"
                    ? "text-red-400"
                    : "text-green-400"
                }`}
              >
                {status_pembayaran}
              </p>
            </div>
            <div className="border-l pl-2 text-xs flex flex-col h-[80px] my-auto">
              <p className="font-bold">status pengiriman</p>
              <p
                className={`mt-8 capitalize ${
                  status_pengiriman === "belum"
                    ? "text-red-400"
                    : "text-green-400"
                }`}
              >
                {status_pengiriman}
              </p>
            </div>
            <div className="border-l pl-2 text-xs flex flex-col h-[80px] my-auto mr-16">
              <p className="font-bold">status penerimaan</p>
              <p
                className={`mt-8 capitalize ${
                  status_penerimaan === "belum"
                    ? "text-red-400"
                    : "text-green-400"
                }`}
              >
                {status_penerimaan}
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="my-5 text-[10px] md:text-xs flex bg-green-400 p-2 rounded w-[120px] md:w-[170px] md:w-64 shadow items-center">
              <span className="text-[15px] md:text-xs material-symbols-outlined">
                description
              </span>
              <h1 className="ml-2">Detail pembelian</h1>
            </div>
            <div>
              <p className="text-[10px] md:text-xs overflow-auto">
                No. paket:{" "}
                <span className="font-bold hover:underline cursor-pointer">
                  {status_bukti_pengiriman}
                </span>
                <span
                  className={`ml-5 text-[15px] md:text-xs material-symbols-outlined cursor-pointer ${
                    status_bukti_pengiriman === "belum" && "hidden"
                  }`}
                  onClick={() => setOpen(!open)}
                >
                  edit
                </span>
              </p>
            </div>
          </div>
          <div className="border shadow rounded w-full p-5">
            <div className="flex flex-col md:flex-row">
              <div>
                <img
                  src={bukti_transfer}
                  alt=""
                  className="w-[300px] object-cover rounded shadow"
                />
              </div>

              <div className="ml-0 md:ml-5">
                {pembelianByPembayaranId.map((row, index) => (
                  <div
                    key={index}
                    className="md:w-[700px] transition-all duration-1000 flex justify-between items-center shadow mt-5 rounded-lg hover:shadow-lg"
                  >
                    <p className="font-bold text-xs ml-5">{index + 1}</p>
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
                  <p className="text-[10px] md:text-xs text-gray-400 text-end mt-5">
                    Biaya pengiriman = Rp.20.000,00
                  </p>
                  <hr className="h-px border-0 bg-green-400 my-5" />
                  <div className="flex justify-end">
                    <p className="text-xs md_text-md font-bold">
                      Total bayar: {formatRupiah(totalKeseluruhan + 20000)}
                    </p>
                  </div>
                  <div
                    className={`flex justify-end ${
                      status_pengiriman === "belum" ? "block" : "hidden"
                    }`}
                  >
                    <button
                      className="mt-10 transition-all duration-1000 text-xs bg-green-400 p-2 rounded shadow hover:bg-green-300 hover:shadow-lg"
                      onClick={() => setOpen(!open)}
                    >
                      Konfirmasi pengiriman
                    </button>
                  </div>
                  {open && (
                    <PopOver>
                      <form
                        action=""
                        onSubmit={updateStatusPengiriman}
                        className={`relative w-96 md:w-[500px] p-5 rounded shadow bg-white -mt-64`}
                      >
                        <span
                          className="absolute top-3 right-3 material-symbols-outlined cursor-pointer z-50"
                          onClick={() => setOpen(!open)}
                        >
                          cancel
                        </span>
                        <div className="text-xs grid grid-flow-row auto-rows-max mt-2">
                          <label htmlFor="bukti_pengiriman">
                            Masukan bukti pengiriman
                          </label>
                          <input
                            id="bukti_pengiriman"
                            type="text"
                            value={bukti_pengiriman}
                            onChange={(e) => setBuktiPengiriman(e.target.value)}
                            placeholder="Masukan nomor resi pengiriman"
                            className="mt-3 p-2 rounded-lg border border-green-400"
                            required
                          />
                        </div>
                        <div className="flex justify-end">
                          <button
                            className="mt-5 transition-all duration-1000 text-xs bg-green-400 p-2 rounded shadow hover:bg-green-300 hover:shadow-lg"
                            type="submit"
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </PopOver>
                  )}
                </div>
              </div>
            </div>
          </div>
        </animated.div>
      )}
    </div>
  );
}

export default Pembelian;
