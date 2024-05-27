import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BelumAdaData from "../BelumAdaData";
import { animated, useSpring } from "react-spring";
import LoadingSpinner from "../animate/Loading";
import { admin } from "../../data/data.js";

function Keranjang() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState([]);
  const [view, setView] = useState(true);
  const [image, setImage] = useState(null);
  const [bukti_pembayaran, setGambarPembayaran] = useState(null);
  const [open, setOpen] = useState(true);
  const [id, setId] = useState([]);
  const [nama, setNama] = useState([]);
  const [alamat, setAlamat] = useState([]);
  const [data, setData] = useState([]);
  const [productQuantity, setProductQuantity] = useState({});
  const [loading, setLoading] = useState(false);
  const [openQris, setOpenQris] = useState(false);
  const [rek, setRek] = useState();

  const fetchRek = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/admin/${admin[0].uuid}`
      );
      setRek(response.data.no_rek);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    fetchRek();
  }, []);

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
      setGambarPembayaran(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setGambarPembayaran(null);
  };

  const fetchProfile = async () => {
    try {
      const response = await axios.get("http://localhost:5000/me");
      setId(response.data.id);
      setNama(response.data.nama);
      setAlamat(response.data.alamat);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/transaksis");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    const fetchProfil = async () => {
      const response = await axios("http://localhost:5000/me");
      setUserId(response.data.id);
    };
    fetchProfil();
  }, []);

  useEffect(() => {
    const productQuantityMap = {};

    data
      .filter((row) => row.user_id === userId)
      .forEach((transaksi) => {
        const { nama_produk, produk_id, harga_produk, gambar_produk } =
          transaksi;
        if (
          Object.prototype.hasOwnProperty.call(productQuantityMap, nama_produk)
        ) {
          productQuantityMap[nama_produk] = {
            jumlah_produk: productQuantityMap[nama_produk].jumlah_produk + 1,
            produk_id: produk_id,
            harga_produk: harga_produk,
            gambar_produk: gambar_produk,
          };
        } else {
          productQuantityMap[nama_produk] = {
            jumlah_produk: 1,
            produk_id: produk_id,
            harga_produk: harga_produk,
            gambar_produk: gambar_produk,
          };
        }
      });

    setProductQuantity(productQuantityMap);
  }, [data, userId]);

  const calculateTotalPrice = (nama_produk) => {
    const totalPrice =
      productQuantity[nama_produk].jumlah_produk *
      productQuantity[nama_produk].harga_produk;
    return totalPrice;
  };

  const totalKeseluruhan = Object.keys(productQuantity).reduce(
    (total, nama_produk) => {
      return total + calculateTotalPrice(nama_produk);
    },
    0
  );

  const incrementQuantity = (nama_produk) => {
    setProductQuantity((prevQuantity) => ({
      ...prevQuantity,
      [nama_produk]: {
        ...prevQuantity[nama_produk],
        jumlah_produk: prevQuantity[nama_produk].jumlah_produk + 1,
      },
    }));
  };

  const decrementQuantity = (nama_produk) => {
    if (productQuantity[nama_produk].jumlah_produk > 0) {
      setProductQuantity((prevQuantity) => ({
        ...prevQuantity,
        [nama_produk]: {
          ...prevQuantity[nama_produk],
          jumlah_produk: prevQuantity[nama_produk].jumlah_produk - 1,
        },
      }));
    }
  };

  const removeProduct = (nama_produk) => {
    const updatedProductQuantity = { ...productQuantity };
    delete updatedProductQuantity[nama_produk];
    setProductQuantity(updatedProductQuantity);

    axios
      .delete(`http://localhost:5000/transaksis/nama/${nama_produk}`)
      .then(() => {
        console.log(`Produk ${nama_produk} berhasil dihapus`);
      })
      .catch((error) => {
        console.error(`Gagal menghapus produk ${nama_produk}:`, error);
      });
  };

  const formatRupiah = (number) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2,
    });
    return formatter.format(number);
  };

  const savePembayaran = async () => {
    try {
      const formData = new FormData();
      formData.append("nama", nama);
      formData.append("alamat", alamat);
      formData.append("total", totalKeseluruhan + 20000);
      formData.append("bukti_pembayaran", bukti_pembayaran);
      formData.append("status_pembayaran", "belum");
      formData.append("status_pengiriman", "belum");
      formData.append("bukti_pengiriman", "belum");
      formData.append("status_penerimaan", "belum");

      await axios.post("http://localhost:5000/pembayaran", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handlePesanan = async (userId) => {
    try {
      await savePembayaran();

      const formattedData = Object.keys(productQuantity).map((nama_produk) => ({
        produk_id: productQuantity[nama_produk].produk_id,
        nama_produk: nama_produk,
        jumlah_produk: productQuantity[nama_produk].jumlah_produk,
        harga_produk: productQuantity[nama_produk].harga_produk,
        total_pembelian: parseInt(
          productQuantity[nama_produk].jumlah_produk *
            productQuantity[nama_produk].harga_produk
        ),
      }));
      await axios.post("http://localhost:5000/pembelian", formattedData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      await axios.delete(`http://localhost:5000/transaksis/user/${userId}`);
      navigate("/konfirmasipembelian");
    } catch (error) {
      console.error("Gagal memasukkan data ke dalam tabel:", error);
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
        <animated.div style={animation} className="-mt-8 md:mt-0">
          {data.filter((row) => row.user_id === userId).length !== 0 ? (
            <div>
              {open && (
                <div className="text-[10px] md:text-xs flex mb-5 bg-green-400 p-2 rounded w-[150px] md:w-64 shadow items-center">
                  <span className="text-[10px] md:text-xs material-symbols-outlined">
                    info
                  </span>
                  <h1 className=" ml-1 md:ml-3">Informasi keranjang</h1>
                </div>
              )}
              <div className="">
                {open && (
                  <div>
                    {Object.keys(productQuantity).map((row, index) => (
                      <div
                        key={index}
                        className="py-5 px-2 md:px-10 transition-all duration-1000 flex justify-between items-center shadow mt-5 rounded-lg hover:shadow-lg"
                      >
                        <p className="font-bold text-[10px] md:text-xs ml-1 md:ml-5">
                          {index + 1}.
                        </p>
                        <img
                          src={productQuantity[row].gambar_produk}
                          alt=""
                          className="w-10 h-10 md:w-20 md:h-20 rounded-l shadow object-cover"
                        />
                        <h1 className="font-bold ml-1 md:ml-5 text-[10px] md:text-xs">
                          {row}
                        </h1>
                        <div className="border border-white px-1 md:px-4 py-2">
                          <button
                            onClick={() => decrementQuantity(row)}
                            className={`text-[10px] md:text-xs border border-black p-1 md:px-2 mr-1 md:m5-2 hover:bg-black hover:text-white rounded ${
                              productQuantity[row].jumlah_produk === 1
                                ? "invisible"
                                : "visible"
                            }`}
                          >
                            -
                          </button>
                          <span className="text-[10px] md:text-xs">
                            {productQuantity[row].jumlah_produk} Kg
                          </span>
                          <button
                            onClick={() => incrementQuantity(row)}
                            className="text-[10px] md:text-xs border border-black p-1 md:px-2 ml-1 md:ml-2 hover:bg-black hover:text-white rounded"
                          >
                            +
                          </button>
                        </div>
                        <p className="hidden md:block text-gray-400 text-xs">
                          {formatRupiah(productQuantity[row].harga_produk)}
                        </p>
                        <p className="hidden md:block mx-3 text-gray-400 text-xs">
                          =
                        </p>
                        <p className="mx-1 md:mx-3 text-gray-400 text-[10px] md:text-xs">
                          {formatRupiah(calculateTotalPrice(row))}
                        </p>
                        <span
                          className="mr-1 md:ml-0 transition-all duration-1000 material-symbols-outlined text-sm cursor-pointer hover:bg-black hover:p-1 hover:text-white rounded"
                          onClick={() => removeProduct(row)}
                        >
                          delete
                        </span>
                      </div>
                    ))}
                    <div className="mt-10 md:mt-20">
                      <p
                        className={`text-gray-400 text-[10px] md:text-xs text-end ${
                          totalKeseluruhan >= 20000 ? "block" : "hidden"
                        }`}
                      >
                        Biaya pengiriman = Rp. 20.000,00
                      </p>
                      <hr
                        className={`h-px border-0 bg-green-400 mt-3 ${
                          totalKeseluruhan >= 20000 ? "block" : "hidden"
                        }`}
                      />
                    </div>
                    {totalKeseluruhan !== 0 && (
                      <div className="flex justify-end">
                        <p className="text-xs md:text-md border border-white mt-3 md:mt-5 font-bold text-center">
                          Jumlah total ={" "}
                          {formatRupiah(totalKeseluruhan + 20000)}
                        </p>
                      </div>
                    )}
                  </div>
                )}
                {!open && (
                  <div className="-mt-8 md:mt-0 mb-10 md:mb-0">
                    <form
                      action=""
                      className="md:w-[1185px] md:h-[450px] bg-white rounded-lg shadow"
                    >
                      <div className="flex justify-between">
                        <div className="text-[10px] md:text-md flex mb-5 bg-green-400 p-2 rounded w-[150px] md:w-64 shadow items-center">
                          <span className="text-[10px] md:text-md material-symbols-outlined">
                            info
                          </span>
                          <h1 className=" ml-1 md:ml-3">
                            Selsaikan pembayaran
                          </h1>
                        </div>
                        <div className="">
                          <div
                            className="cursor-pointer"
                            onClick={() => setOpen(!open)}
                            type="button"
                          >
                            <span className="transition-all duration-1000 material-symbols-outlined hover:text-red-400 rounded p-1 ">
                              cancel
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div>
                          <div className="flex flex-col mx-5 md:mx-10 my-5">
                            <h1 className="text-gray-400 text-[10px] md:text-xs">
                              Nama penerima:
                            </h1>
                            <hr className="h-px border-0 bg-green-400 my-2" />
                            <div className="relative">
                              <input
                                type="text"
                                value={nama}
                                className="w-full text-xs md:text-md capitalize font-bold p-2 outline-green-400"
                                onChange={(e) => setNama(e.target.value)}
                              />
                              <span
                                className={`text-gray-400 absolute right-2 top-2 ml-5 text-[15px] md:text-xs material-symbols-outlined`}
                              >
                                edit
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col mx-5 md:mx-10 my-5">
                            <h1 className="text-gray-400 text-[10px] md:text-xs">
                              Alamat pengiriman:
                            </h1>
                            <hr className="h-px border-0 bg-green-400 my-2" />
                            <div className="relative">
                              <textarea
                                type="text"
                                value={alamat}
                                className="w-full text-xs md:text-md capitalize font-bold p-2 outline-green-400"
                                onChange={(e) => setAlamat(e.target.value)}
                              />
                              <span
                                className={`text-gray-400 absolute right-2 top-2 ml-5 text-[15px] md:text-xs material-symbols-outlined`}
                              >
                                edit
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col mx-5 md:mx-10 my-5">
                            <h1 className="text-gray-400 text-[10px] md:text-xs">
                              Total belanja:
                            </h1>
                            <hr className="h-px border-0 bg-green-400 my-2" />
                            <p className="text-xs md:text-md capitalize font-bold">
                              {formatRupiah(totalKeseluruhan + 20000)}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className="text-gray-400 text-[10px] md:text-xs mx-5 md:mx-0 md:mr-10 text-justify">
                            Selsaikan pembayaran dengan upload bukti transfer ke
                            No. Rek:{" "}
                            <span className="font-bold underline text-black">
                              {rek}
                            </span>{" "}
                            atau{" "}
                            <span
                              className="font-bold text-black cursor-pointer hover:underline me-1"
                              onClick={() => setOpenQris(!openQris)}
                            >
                              Scan QRIS disini
                            </span>
                            a/n Shafa farm Hidroponik. Pastikan pembayaran
                            sesuai dengan benar, proses pembayaran akan diproses
                            1 X 24 jam.{" "}
                            <span
                              className="text-black cursor-pointer hover:underline"
                              onClick={() => navigate("/faq")}
                            >
                              Dapatkan informasi lengkap disini!
                            </span>
                          </p>
                          {openQris && (
                            <img
                              src="/images/qris.jpg"
                              alt=""
                              className="w-[200px] h-[200px] absolute mt-5"
                            />
                          )}
                          <div className="flex flex-col mb-10 md:mb-0">
                            <label htmlFor="gambar">
                              <input
                                type="file"
                                id="gambar"
                                onChange={handleImageChange}
                                className="invisible"
                                required
                              />
                              <p className="text-[10px] md:text-xs mx-5 md:mx-0 transition-all duration-1000 bg-green-400 hover:bg-green-300 w-20 text-center p-2 rounded shadow">
                                {image ? "Ganti" : "Pilih"}
                              </p>
                            </label>
                            <div className="relative">
                              {image && (
                                <div className="relative">
                                  <img
                                    src={image}
                                    alt="Preview"
                                    className="mx-5 md:mx-0 mt-5 rounded-lg hover:shadow-lg w-32 h-32 object-cover"
                                  />
                                  {!view && (
                                    <Popover>
                                      <div className="relative">
                                        <img
                                          src={image}
                                          alt=""
                                          className="w-[400px] h-[700px]"
                                        />
                                        <button
                                          onClick={() => setView(!view)}
                                          className="absolute top-2 right-3 text-xl text-white"
                                        >
                                          X
                                        </button>
                                      </div>
                                    </Popover>
                                  )}
                                  <div className="mx-5 pb-10 md:pb-0 md:mx-0 mt-5 flex">
                                    <button
                                      className="transition-all duration-1000 bg-black text-white p-2 text-[10px] md:text-xs rounded mr-5 hover:bg-red-400"
                                      onClick={removeImage}
                                      type="button"
                                    >
                                      Hapus
                                    </button>
                                    <button
                                      className="transition-all duration-1000 bg-green-400 p-2 px-4 text-[10px] md:text-xs rounded hover:bg-green-300"
                                      onClick={() => setView(!view)}
                                      type="button"
                                    >
                                      Lihat
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                )}
              </div>
              {open && (
                <div className="flex justify-end pb-10">
                  <button
                    className={`text-[10px] md:text-xs transition-all duration-1000 bg-green-400 p-2 rounded mt-10 hover:bg-green-300 ${
                      totalKeseluruhan >= 20000 ? "block" : "hidden"
                    }`}
                    onClick={() => setOpen(!open)}
                  >
                    Pesan sekarang
                  </button>
                </div>
              )}
              <div className="flex justify-end -mt-32 md:mb-0 mb-20 md:-mt-20 mr-5">
                <button
                  className={`text-xs bg-green-400 p-2 rounded mt-5 hover:bg-green-300 z-10 shadow ${
                    image === null ? "invisible" : "visible"
                  } ${open ? "invisible" : "visible"}`}
                  type="submit"
                  onClick={() => handlePesanan(id)}
                >
                  Selsaikan pembayaran
                </button>
              </div>
            </div>
          ) : (
            <div className="mb-20">
              <BelumAdaData />
            </div>
          )}
        </animated.div>
      )}
    </div>
  );
}

export default Keranjang;
