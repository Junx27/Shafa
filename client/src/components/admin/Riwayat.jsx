import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import menu from "../../assets/images/menu.png";
import { useNavigate } from "react-router-dom";

function Riwayat() {
  const navigate = useNavigate();
  const [riwayat, setRiwayat] = useState([]);
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPengirimanBelum, setIsOpenPenirimanBelum] = useState(false);
  const [isOpenPengirimanSudah, setIsOpenPengirimanSudah] = useState(false);
  const [openItem, setOpenItem] = useState(null);
  const [pembelianByPembayaranId, setPembelianByPembayaranId] = useState([]);
  const popoverRef = useRef(null);

  useEffect(() => {
    const fetchPembayaran = async () => {
      try {
        const response = await axios.get("http://localhost:5000/pembayaran");
        setRiwayat(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPembayaran();
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setOpenItem(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
    setOpenItem(null);
    setOpen(!open);
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
      {riwayat.filter((row) => row.status_pengiriman === "belum").length !==
      0 ? (
        <div className="mt-20 border p-5 rounded shadow">
          <div className="text-[10px] md:text-xs flex bg-red-400 p-2 rounded  w-[170px] md:w-64 shadow items-center">
            <span className="text-[15px] md:text-xs material-symbols-outlined">
              description
            </span>
            <h1 className="ml-2">Konfirmasi pengiriman konsumen</h1>
          </div>
          <div className="mt-5">
            {riwayat
              .filter((row) => row.status_pengiriman === "belum")
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((row, index) => (
                <div
                  key={index}
                  className="bg-white relative border transition-all duration-1000 flex flex-col md:flex-row md:justify-between md:w-full md:h-[120px] rounded-lg shadow hover:shadow-lg p-5 md:items-center mb-5"
                >
                  <img
                    src={
                      row.user.gambar_profil === "belum"
                        ? "http://localhost:5000/images/defaultProfile.png"
                        : row.user.gambar_profil
                    }
                    alt=""
                    className="w-16 mx-auto md:mr-5 md:ml-3 rounded-full shadow"
                  />
                  <div className="flex flex-col mt-10 md:mt-0 h-[100px] my-auto mr-2">
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
                  <div className="border-l pl-2 text-xs flex flex-col h-[80px] my-auto">
                    <p className="font-bold">Status pembayaran</p>
                    <p
                      className={`mt-8 capitalize ${
                        row.status_pembayaran === "belum"
                          ? "text-red-400"
                          : "text-green-400"
                      }`}
                    >
                      {row.status_pembayaran}
                    </p>
                  </div>
                  <div className="border-l pl-2 text-xs flex flex-col h-[80px] my-auto">
                    <p className="font-bold">status pengiriman</p>
                    <p
                      className={`mt-8 capitalize ${
                        row.status_pengiriman === "belum"
                          ? "text-red-400"
                          : "text-green-400"
                      }`}
                    >
                      {row.status_pengiriman}
                    </p>
                  </div>
                  <div className="border-l pl-2 text-xs flex flex-col h-[80px] my-auto mr-16">
                    <p className="font-bold">status penerimaan</p>
                    <p
                      className={`mt-8 capitalize ${
                        row.status_penerimaan === "belum"
                          ? "text-red-400"
                          : "text-green-400"
                      }`}
                    >
                      {row.status_penerimaan}
                    </p>
                  </div>
                  <span
                    className="text-sm hover:text-red-400 cursor-pointer material-symbols-outlined"
                    onClick={() =>
                      setIsOpenPenirimanBelum(!isOpenPengirimanBelum)
                    }
                  >
                    delete
                  </span>
                  <span
                    className="text-sm hover:text-green-400 cursor-pointer material-symbols-outlined"
                    onClick={() => navigate(`/pesanan/${row.uuid}`)}
                  >
                    open_in_new
                  </span>

                  {isOpenPengirimanBelum && (
                    <Popover>
                      <div className="-mt-56 w-[400px] h-[150px] bg-white rounded p-5">
                        <p className="text-xs mb-10">
                          Apakah anda ingin menghapus data pembelian ini?
                          <br />
                          Seluruh data transaksi akan dihapus!
                        </p>
                        <div className="flex justify-end">
                          <button
                            className="mr-3 transition-all duration-1000 bg-black text-white hover:bg-green-400 hover:text-black p-2 rounded shadow text-xs"
                            onClick={() =>
                              setIsOpenPenirimanBelum(!isOpenPengirimanBelum)
                            }
                          >
                            Tidak
                          </button>
                          <button
                            className="mr-3 transition-all duration-1000 bg-green-400 hover:bg-green-300 hover:text-black p-2 px-4 rounded shadow text-xs"
                            onClick={() => deletePenerimaanSelesai(row.uuid)}
                          >
                            Ya
                          </button>
                        </div>
                      </div>
                    </Popover>
                  )}
                </div>
              ))}
          </div>
        </div>
      ) : (
        <h1 className="mt-10 text-center text-xs text-gray-400">
          Belum ada pesanan masuk
        </h1>
      )}
      {riwayat.filter(
        (row) =>
          row.status_pengiriman === "sudah" && row.status_penerimaan === "belum"
      ).length !== 0 ? (
        <div className="mt-20 border p-5 rounded shadow">
          <div className="text-[10px] md:text-xs flex bg-sky-400 p-2 rounded  w-[170px] md:w-64 shadow items-center">
            <span className="text-[15px] md:text-xs material-symbols-outlined">
              description
            </span>
            <h1 className="ml-2">Menunggu konfirmasi konsumen</h1>
          </div>
          <div className="mt-5">
            {riwayat
              .filter(
                (row) =>
                  row.status_pengiriman === "sudah" &&
                  row.status_penerimaan === "belum"
              )
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((row, index) => (
                <div
                  key={index}
                  className="bg-white relative border transition-all duration-1000 flex flex-col md:flex-row md:justify-between md:w-full md:h-[120px] rounded-lg shadow hover:shadow-lg p-5 md:items-center mb-5"
                >
                  <img
                    src={
                      row.user.gambar_profil === "belum"
                        ? "http://localhost:5000/images/defaultProfile.png"
                        : row.user.gambar_profil
                    }
                    alt=""
                    className="w-16 mx-auto md:mr-5 md:ml-3 rounded-full shadow"
                  />
                  <div className="flex flex-col mt-10 md:mt-0 h-[100px] my-auto mr-2">
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
                  <div className="border-l pl-2 text-xs flex flex-col h-[80px] my-auto">
                    <p className="font-bold">Status pembayaran</p>
                    <p
                      className={`mt-8 capitalize ${
                        row.status_pembayaran === "belum"
                          ? "text-red-400"
                          : "text-green-400"
                      }`}
                    >
                      {row.status_pembayaran}
                    </p>
                  </div>
                  <div className="border-l pl-2 text-xs flex flex-col h-[80px] my-auto">
                    <p className="font-bold">status pengiriman</p>
                    <p
                      className={`mt-8 capitalize ${
                        row.status_pengiriman === "belum"
                          ? "text-red-400"
                          : "text-green-400"
                      }`}
                    >
                      {row.status_pengiriman}
                    </p>
                  </div>
                  <div className="border-l pl-2 text-xs flex flex-col h-[80px] my-auto mr-16">
                    <p className="font-bold">status penerimaan</p>
                    <p
                      className={`mt-8 capitalize ${
                        row.status_penerimaan === "belum"
                          ? "text-red-400"
                          : "text-green-400"
                      }`}
                    >
                      {row.status_penerimaan}
                    </p>
                  </div>
                  <span
                    className="text-sm hover:text-red-400 cursor-pointer material-symbols-outlined"
                    onClick={() =>
                      setIsOpenPengirimanSudah(!isOpenPengirimanSudah)
                    }
                  >
                    delete
                  </span>
                  <span
                    className="text-sm hover:text-green-400 cursor-pointer material-symbols-outlined"
                    onClick={() => navigate(`/pesanan/${row.uuid}`)}
                  >
                    open_in_new
                  </span>

                  {isOpenPengirimanSudah && (
                    <Popover>
                      <div className="-mt-56 w-[400px] h-[150px] bg-white rounded p-5">
                        <p className="text-xs mb-10">
                          Apakah anda ingin menghapus data pembelian ini?
                          <br />
                          Seluruh data transaksi akan dihapus!
                        </p>
                        <div className="flex justify-end">
                          <button
                            className="mr-3 transition-all duration-1000 bg-black text-white hover:bg-green-400 hover:text-black p-2 rounded shadow text-xs"
                            onClick={() =>
                              setIsOpenPengirimanSudah(!isOpenPengirimanSudah)
                            }
                          >
                            Tidak
                          </button>
                          <button
                            className="mr-3 transition-all duration-1000 bg-green-400 hover:bg-green-300 hover:text-black p-2 px-4 rounded shadow text-xs"
                            onClick={() => deletePenerimaanSelesai(row.uuid)}
                          >
                            Ya
                          </button>
                        </div>
                      </div>
                    </Popover>
                  )}
                </div>
              ))}
          </div>
        </div>
      ) : (
        <h1 className="mt-10 text-center text-xs text-gray-400">
          Belum ada pesanan masuk
        </h1>
      )}
      {riwayat.filter(
        (row) =>
          row.status_pengiriman === "sudah" && row.status_penerimaan === "sudah"
      ).length !== 0 ? (
        <div className="mt-20 p-5 rounded shadow">
          <div className="text-[10px] md:text-xs flex bg-green-400 p-2 rounded  w-[170px] md:w-64 shadow items-center">
            <span className="text-[15px] md:text-xs material-symbols-outlined">
              description
            </span>
            <h1 className="ml-2">Pembelian selesai</h1>
          </div>
          <div className="mt-5">
            {riwayat
              .filter(
                (row) =>
                  row.status_pengiriman === "sudah" &&
                  row.status_penerimaan === "sudah"
              )
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((row, index) => (
                <div
                  key={index}
                  className="bg-white relative border transition-all duration-1000 flex flex-col md:flex-row md:justify-between md:w-full md:h-[120px] rounded-lg shadow hover:shadow-lg p-5 md:items-center mb-5"
                >
                  <img
                    src={
                      row.user.gambar_profil === "belum"
                        ? "http://localhost:5000/images/defaultProfile.png"
                        : row.user.gambar_profil
                    }
                    alt=""
                    className="w-16 mx-auto md:mr-5 md:ml-3 rounded-full shadow"
                  />
                  <div className="flex flex-col mt-10 md:mt-0 h-[100px] my-auto mr-2">
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
                  <div className="border-l pl-2 text-xs flex flex-col h-[80px] my-auto">
                    <p className="font-bold">Status pembayaran</p>
                    <p
                      className={`mt-8 capitalize ${
                        row.status_pembayaran === "belum"
                          ? "text-red-400"
                          : "text-green-400"
                      }`}
                    >
                      {row.status_pembayaran}
                    </p>
                  </div>
                  <div className="border-l pl-2 text-xs flex flex-col h-[80px] my-auto">
                    <p className="font-bold">status pengiriman</p>
                    <p
                      className={`mt-8 capitalize ${
                        row.status_pengiriman === "belum"
                          ? "text-red-400"
                          : "text-green-400"
                      }`}
                    >
                      {row.status_pengiriman}
                    </p>
                  </div>
                  <div className="border-l pl-2 text-xs flex flex-col h-[80px] my-auto mr-16">
                    <p className="font-bold">status penerimaan</p>
                    <p
                      className={`mt-8 capitalize ${
                        row.status_penerimaan === "belum"
                          ? "text-red-400"
                          : "text-green-400"
                      }`}
                    >
                      {row.status_penerimaan}
                    </p>
                  </div>
                  <div onClick={() => setOpenItem(index)}>
                    <img src={menu} alt="" className="w-5" />
                  </div>
                  {openItem === index && (
                    <div
                      ref={popoverRef}
                      className="absolute -bottom-5 right-10 text-xs bg-white shadow rounded"
                    >
                      <div className="flex flex-col items-start p-5">
                        <button
                          className="hover:text-green-400"
                          onClick={() => navigate(`/pesanan/${row.uuid}`)}
                        >
                          Lihat detail
                        </button>
                        <button
                          className="hover:text-green-400 mt-2"
                          onClick={() => handlePembayaranItemClick(row.id)}
                        >
                          Lihat transaksi
                        </button>
                        <button
                          className="hover:text-green-400 mt-2"
                          onClick={() => {
                            setOpenItem(null), setIsOpen(!isOpen);
                          }}
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  )}
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
                            className="mr-3 transition-all duration-1000 bg-black text-white hover:bg-green-400 hover:text-black p-2 rounded shadow text-xs"
                            onClick={() => setIsOpen(!isOpen)}
                          >
                            Tidak
                          </button>
                          <button
                            className="mr-3 transition-all duration-1000 bg-green-400 hover:bg-green-300 hover:text-black p-2 px-4 rounded shadow text-xs"
                            onClick={() => deletePenerimaanSelesai(row.uuid)}
                          >
                            Ya
                          </button>
                        </div>
                      </div>
                    </Popover>
                  )}
                </div>
              ))}
          </div>
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
      ) : (
        <h1 className="mt-10 text-center text-xs text-gray-400">
          Belum ada pesanan masuk
        </h1>
      )}
    </div>
  );
}

export default Riwayat;
