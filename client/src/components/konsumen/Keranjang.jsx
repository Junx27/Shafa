import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Keranjang() {
  const navigate = useNavigate();
  const [id, setId] = useState([]);
  const [nama, setNama] = useState([]);
  const [alamat, setAlamat] = useState([]);
  const [data, setData] = useState([]);
  const [productQuantity, setProductQuantity] = useState({});

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

  const handlePesanan = async (userId) => {
    try {
      const pembayaran = {
        nama: nama,
        total: totalKeseluruhan,
        bukti_pembayaran: "belum",
        alamat: alamat,
        status_pengiriman: "belum",
        status_penerimaan: "belum",
      };
      await axios.post("http://localhost:5000/pembayaran", pembayaran, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const formattedData = Object.keys(productQuantity).map((nama_produk) => ({
        nama_produk: nama_produk,
        jumlah_produk: productQuantity[nama_produk],
        harga_produk: calculateTotalPrice(nama_produk),
        total_pembelian: parseInt(
          productQuantity[nama_produk] * calculateTotalPrice(nama_produk)
        ),
        pembayaran_id: 8,
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
      {data.length !== 0 ? (
        <div className="transition-all duration-1000 overflow-x-auto mt-5 rounded-lg shadow hover:shadow-lg">
          <table className="table-auto w-full">
            <thead className="bg-lime-300 rounded">
              <tr>
                <th className="border border-white px-4 py-2">No</th>
                <th className="border border-white px-4 py-2">Nama Produk</th>
                <th className="border border-white px-4 py-2">Jumlah</th>
                <th className="border border-white px-4 py-2">Total Harga</th>
                <th className="border border-white px-4 py-2">Aksi</th>{" "}
              </tr>
            </thead>
            <tbody className="bg-lime-50">
              {Object.keys(productQuantity).map((nama_produk, index) => (
                <tr
                  key={index}
                  className="transition-all duration-500 text-center hover:bg-lime-300"
                >
                  <td className="border border-white px-4 py-2">{index + 1}</td>
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
          <div className="flex justify-end pr-10 pb-10 bg-lime-50">
            <button
              className="transition-all duration-1000 bg-lime-400 p-2 rounded mt-10 hover:bg-lime-500"
              onClick={() => handlePesanan(id)}
            >
              Pesan sekarang
            </button>
          </div>
        </div>
      ) : (
        <h1 className="text-center">Belum ada data</h1>
      )}
    </div>
  );
}

export default Keranjang;
