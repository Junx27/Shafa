import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    const response = await axios.get("http://localhost:5000/me");
    setId(response.data.id);
    setNama(response.data.nama);
    setAlamat(response.data.alamat);
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:5000/transaksis");
    setData(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const productQuantityMap = {};

    data.forEach((transaksi) => {
      const { nama_produk } = transaksi;
      if (
        Object.prototype.hasOwnProperty.call(productQuantityMap, nama_produk)
      ) {
        productQuantityMap[nama_produk] += 1;
      } else {
        productQuantityMap[nama_produk] = 1;
      }
    });

    setProductQuantity(productQuantityMap);
  }, [data]);

  const calculateTotalPrice = (nama_produk) => {
    const filteredTransactions = data.filter(
      (transaksi) => transaksi.nama_produk === nama_produk
    );
    const totalPrice = filteredTransactions.reduce((total, transaksi) => {
      return total + transaksi.harga_produk * productQuantity[nama_produk];
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
      [nama_produk]: prevQuantity[nama_produk] + 1,
    }));
  };

  const decrementQuantity = (nama_produk) => {
    if (productQuantity[nama_produk] > 0) {
      setProductQuantity((prevQuantity) => ({
        ...prevQuantity,
        [nama_produk]: prevQuantity[nama_produk] - 1,
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
    navigate("/produkkonsumen");
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
      formData.append("total", totalKeseluruhan);
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
        nama_produk: nama_produk,
        jumlah_produk: productQuantity[nama_produk],
        harga_produk: calculateTotalPrice(nama_produk),
        total_pembelian: parseInt(
          productQuantity[nama_produk] * calculateTotalPrice(nama_produk)
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
  return (
    <div>
      <div className="flex mb-5">
        <span className="material-symbols-outlined">info</span>
        <h1 className="ml-3">Informasi keranjang</h1>
      </div>
      <div className="">
        {data.length !== 0 ? (
          <>
            <div className="transition-all duration-1000 overflow-x-auto mt-5 rounded-lg shadow hover:shadow-lg">
              <table className="table-auto w-full">
                <thead className="bg-lime-300 rounded">
                  <tr>
                    <th className="border border-white px-4 py-2">No</th>
                    <th className="border border-white px-4 py-2">
                      Nama Produk
                    </th>
                    <th className="border border-white px-4 py-2">Jumlah</th>
                    <th className="border border-white px-4 py-2">
                      Total Harga
                    </th>
                    <th className="border border-white px-4 py-2">Aksi</th>{" "}
                  </tr>
                </thead>
                <tbody className="bg-lime-50">
                  {Object.keys(productQuantity).map((nama_produk, index) => (
                    <tr
                      key={index}
                      className="transition-all duration-500 text-center hover:bg-lime-300"
                    >
                      <td className="border border-white px-4 py-2">
                        {index + 1}
                      </td>
                      <td className="border border-white px-4 py-2">
                        {nama_produk}
                      </td>
                      <td className="border border-white px-4 py-2">
                        {productQuantity[nama_produk]} Kg
                        <button
                          onClick={() => decrementQuantity(nama_produk)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2"
                        >
                          -
                        </button>
                        <button
                          onClick={() => incrementQuantity(nama_produk)}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ml-2"
                        >
                          +
                        </button>
                      </td>
                      <td className="border border-white px-4 py-2">
                        {formatRupiah(calculateTotalPrice(nama_produk))}
                      </td>
                      <td className="border border-white px-4 py-2">
                        <button
                          onClick={() => removeProduct(nama_produk)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                {totalKeseluruhan !== 0 && (
                  <tfoot>
                    <tr className="bg-lime-50">
                      <td
                        colSpan="4"
                        className="border border-white px-4 py-2 text-end font-bold"
                      >
                        Total bayar
                      </td>
                      <td className="border border-white px-4 py-2 font-bold text-center">
                        {formatRupiah(totalKeseluruhan)}
                      </td>
                    </tr>
                  </tfoot>
                )}
              </table>
              {!open && (
                <div className="absolute top-32">
                  <form
                    action=""
                    className="w-[1185px] h-[450px] bg-white rounded-lg shadow"
                  >
                    <div className="flex">
                      <div className="flex mb-5 bg-lime-300 p-3 rounded-r-lg shadow">
                        <span className="material-symbols-outlined">info</span>
                        <h1 className="ml-3">Selsaikan pembayaran</h1>
                      </div>
                      <div className="absolute right-0 top-0">
                        <div
                          className="bg-red-400 py-2 px-3 rounded-b-md hover:bg-red-500"
                          onClick={() => setOpen(!open)}
                          type="button"
                        >
                          <span className="material-symbols-outlined">
                            close
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-10">
                      <div>
                        <div className="flex flex-col mx-10 my-5">
                          <h1 className="text-gray-500">Nama penerima:</h1>
                          <hr className="h-px border-0 bg-lime-200 my-2" />
                          <p className="capitalize font-bold">{nama}</p>
                        </div>
                        <div className="flex flex-col mx-10 my-5">
                          <h1 className="text-gray-500">Alamat pengiriman:</h1>
                          <hr className="h-px border-0 bg-lime-200 my-2" />
                          <p className="capitalize font-bold">{alamat}</p>
                        </div>
                        <div className="flex flex-col mx-10 my-5">
                          <h1 className="text-gray-500">Total Belanja:</h1>
                          <hr className="h-px border-0 bg-lime-200 my-2" />
                          <p className="capitalize font-bold">
                            {formatRupiah(totalKeseluruhan)}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-500">
                          Selsaikan pembayaran dengan upload bukti transfer ke
                          No. Rek BRI 09087676564531444 a/n Shafa farm
                          Hidroponik
                        </p>
                        <div className="flex flex-col my-2">
                          <label htmlFor="gambar">
                            <input
                              type="file"
                              id="gambar"
                              onChange={handleImageChange}
                              className="invisible"
                            />
                            <p className="bg-lime-400 p-2 rounded-md w-20 text-center -mt-5 hover:bg-lime-500 hover:text-white">
                              {image ? "Ganti" : "Pilih"}
                            </p>
                          </label>
                          <div className="relative">
                            {image && (
                              <div className="relative">
                                <img
                                  src={image}
                                  alt="Preview"
                                  className={`mt-5 rounded-lg hover:shadow-lg ${
                                    !view ? "w-full -mt-52 -ml-64" : ""
                                  }`}
                                />
                                <span
                                  className={`transition-all duration-1000 material-symbols-outlined absolute top-0 left-[100px] text-white cursor-pointer ${
                                    !view ? "left-[280px] top-3" : "left-0"
                                  }`}
                                  onClick={() => setView(!view)}
                                >
                                  {view ? "open_in_full" : "fullscreen_exit"}
                                </span>
                              </div>
                            )}
                            {image && (
                              <span
                                onClick={removeImage}
                                className={`transition-all duration-1000 text-white material-symbols-outlined absolute bottom-0 left-[100px] cursor-pointer hover:text-red-400 ${
                                  !view ? "left-[280px] bottom-2" : ""
                                }`}
                              >
                                delete
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>
            <div className="flex justify-end pr-10 pb-10 bg-lime-50">
              <button
                className="transition-all duration-1000 bg-lime-400 p-2 rounded mt-10 hover:bg-lime-500"
                onClick={() => setOpen(!open)}
              >
                Pesan sekarang
              </button>
            </div>
            <div className="flex justify-center mt-16">
              <button
                className={`bg-lime-400 p-2 rounded mt-5 hover:bg-lime-500 z-10 ${
                  open ? "invisible" : "visible"
                }`}
                type="submit"
                onClick={() => handlePesanan(id)}
              >
                Selsaikan pembayaran
              </button>
            </div>
          </>
        ) : (
          <h1 className="text-center">Belum ada data</h1>
        )}
      </div>
    </div>
  );
}

export default Keranjang;
