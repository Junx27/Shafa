import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BelumAdaData from "../BelumAdaData";

function Keranjang() {
  const navigate = useNavigate();
  const [view, setView] = useState(true);
  const [image, setImage] = useState(null);
  const [bukti_pembayaran, setGambarPembayaran] = useState(null);
  const [open, setOpen] = useState(true);
  const [id, setId] = useState([]);
  const [nama, setNama] = useState([]);
  const [alamat, setAlamat] = useState([]);
  const [data, setData] = useState([]);
  const [productQuantity, setProductQuantity] = useState({});
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
    const productQuantityMap = {};

    data.forEach((transaksi) => {
      const { nama_produk, produk_id, harga_produk, gambar_produk } = transaksi;
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
  }, [data]);

  const calculateTotalPrice = (nama_produk) => {
    const filteredTransactions = data.filter(
      (transaksi) => transaksi.nama_produk === nama_produk
    );
    const totalPrice = filteredTransactions.reduce((total, transaksi) => {
      return (
        total +
        transaksi.harga_produk * productQuantity[nama_produk].jumlah_produk
      );
    }, 0);
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

      console.log(formattedData);

      await axios.post("http://localhost:5000/pembelian", formattedData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Data berhasil dimasukkan ke dalam tabel:");

      await axios.delete(`http://localhost:5000/transaksis/user/${userId}`);
      navigate("/riwayatkonsumen");
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
      <div className="">
        {data.length !== 0 ? (
          <div>
            {open && (
              <div className="flex mb-5 bg-lime-400 p-2 rounded w-64 shadow">
                <span className="material-symbols-outlined">info</span>
                <h1 className="ml-3">Informasi keranjang</h1>
              </div>
            )}
            <div className="">
              {open && (
                <div>
                  {Object.keys(productQuantity).map((row, index) => (
                    <div
                      key={index}
                      className="py-5 px-10 transition-all duration-1000 flex justify-between items-center shadow mt-5 rounded-lg hover:shadow-lg"
                    >
                      <p className="font-bold text-xs ml-5">{index + 1}.</p>
                      <img
                        src={productQuantity[row].gambar_produk}
                        alt=""
                        className="w-20 h-20 rounded-l shadow object-cover"
                      />
                      <h1 className="font-bold ml-5 text-xs">{row}</h1>
                      <div className="border border-white px-4 py-2">
                        <button
                          onClick={() => decrementQuantity(row)}
                          className={`text-xs border border-black p-1 px-2 mr-2 hover:bg-black hover:text-white rounded ${
                            productQuantity[row].jumlah_produk === 1
                              ? "invisible"
                              : "visible"
                          }`}
                        >
                          -
                        </button>
                        <span className="text-xs">
                          {productQuantity[row].jumlah_produk} Kg
                        </span>
                        <button
                          onClick={() => incrementQuantity(row)}
                          className="text-xs border border-black p-1 px-2 ml-2 hover:bg-black hover:text-white rounded"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-gray-400 text-xs">
                        {formatRupiah(productQuantity[row].harga_produk)}
                      </p>
                      <p className="mx-3 text-gray-400 text-xs">=</p>
                      <p className="mx-3 text-gray-400 text-xs">
                        {formatRupiah(calculateTotalPrice(row))}
                      </p>
                      <span
                        className="transition-all duration-1000 material-symbols-outlined text-sm cursor-pointer hover:bg-black hover:p-1 hover:text-white rounded"
                        onClick={() => removeProduct(row)}
                      >
                        delete
                      </span>
                    </div>
                  ))}
                  <div className="mt-20">
                    <p className="text-gray-400 text-xs text-end">
                      Biaya pengiriman = Rp. 20.000,00
                    </p>
                    <hr className="h-px border-0 bg-lime-200 mt-3" />
                  </div>
                  {totalKeseluruhan !== 0 && (
                    <div className="flex justify-end">
                      <p className="border border-white mt-5 font-bold text-center">
                        Jumlah total = {formatRupiah(totalKeseluruhan + 20000)}
                      </p>
                    </div>
                  )}
                </div>
              )}
              {!open && (
                <div className="">
                  <form
                    action=""
                    className="w-[1185px] h-[450px] bg-white rounded-lg shadow"
                  >
                    <div className="flex justify-between">
                      <div className="flex mb-5 bg-lime-400 p-3 rounded-r-lg shadow">
                        <span className="material-symbols-outlined">info</span>
                        <h1 className="ml-3">Selsaikan pembayaran</h1>
                      </div>
                      <div className="">
                        <div
                          className="cursor-pointer"
                          onClick={() => setOpen(!open)}
                          type="button"
                        >
                          <span className="transition-all duration-1000 material-symbols-outlined hover:bg-black hover:text-white rounded p-1 ">
                            close
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-10">
                      <div>
                        <div className="flex flex-col mx-10 my-5">
                          <h1 className="text-gray-400 text-xs">
                            Nama penerima:
                          </h1>
                          <hr className="h-px border-0 bg-lime-200 my-2" />
                          <p className="capitalize font-bold">{nama}</p>
                        </div>
                        <div className="flex flex-col mx-10 my-5">
                          <h1 className="text-gray-400 text-xs">
                            Alamat pengiriman:
                          </h1>
                          <hr className="h-px border-0 bg-lime-200 my-2" />
                          <p className="capitalize font-bold">{alamat}</p>
                        </div>
                        <div className="flex flex-col mx-10 my-5">
                          <h1 className="text-gray-400 text-xs">
                            Total Belanja:
                          </h1>
                          <hr className="h-px border-0 bg-lime-200 my-2" />
                          <p className="capitalize font-bold">
                            {formatRupiah(totalKeseluruhan + 20000)}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs mr-10 text-justify">
                          Selsaikan pembayaran dengan upload bukti transfer ke
                          No. Rek BRI 09087676564531444 a/n Shafa farm
                          Hidroponik. Pastikan pembayaran sesuai dengan benar,
                          proses pembayaran akan diproses 1 X 24 jam.{" "}
                          <span
                            className="text-black cursor-pointer underline"
                            onClick={() => navigate("/faq")}
                          >
                            Dapatkan informasi lengkap disini!
                          </span>
                        </p>
                        <div className="flex flex-col">
                          <label htmlFor="gambar">
                            <input
                              type="file"
                              id="gambar"
                              onChange={handleImageChange}
                              className="invisible"
                              required
                            />
                            <p className="text-xs transition-all duration-1000 bg-lime-400 hover:bg-lime-300 w-20 text-center p-2 rounded shadow">
                              {image ? "Ganti" : "Pilih"}
                            </p>
                          </label>
                          <div className="relative">
                            {image && (
                              <div className="relative">
                                <img
                                  src={image}
                                  alt="Preview"
                                  className="mt-5 rounded-lg hover:shadow-lg w-32 h-32 object-cover"
                                />
                                {!view && (
                                  <Popover>
                                    <div className="relative">
                                      <img
                                        src={image}
                                        alt=""
                                        className="w-[600px]"
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
                                <div className="mt-5 flex">
                                  <button
                                    className="bg-black text-white p-2 text-xs rounded mr-5 hover:bg-lime-400"
                                    onClick={removeImage}
                                    type="button"
                                  >
                                    Hapus
                                  </button>
                                  <button
                                    className="bg-lime-400 p-2 px-4 text-xs rounded hover:bg-lime-300"
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
                  className="transition-all duration-1000 bg-lime-400 p-2 rounded mt-10 hover:bg-lime-500"
                  onClick={() => setOpen(!open)}
                >
                  Pesan sekarang
                </button>
              </div>
            )}
            <div className="flex justify-end -mt-20 mr-5">
              <button
                className={`text-xs bg-lime-400 p-2 rounded mt-5 hover:bg-lime-500 z-10 shadow ${
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
          <BelumAdaData />
        )}
      </div>
    </div>
  );
}

export default Keranjang;
