import Navbar from "../../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { meUser } from "../../features/AuthSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../components/Footer";

function Transaksi() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jumlah = 1;
  const [kontak, setKontak] = useState();
  const [nama_produk, setNamaProduk] = useState("");
  const [harga_produk, setHargaProduk] = useState("");
  const [admin, setAdmin] = useState("");
  const [gambar_produk, setGambarProduk] = useState(null);
  const [deskripsi_produk, setDeskripsi] = useState();
  const [idProduk, setIdProduk] = useState();
  const { isError } = useSelector((state) => state.auth);
  const [getPembelian, setGetPembelian] = useState([]);

  useEffect(() => {
    const fetchPembelian = async () => {
      const response = await axios.get(
        "http://localhost:5000/pembelian/status"
      );
      setGetPembelian(response.data);
    };
    fetchPembelian();
  }, []);
  const formatRupiah = (number) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2,
    });
    return formatter.format(number);
  };
  useEffect(() => {
    dispatch(meUser());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);
  useEffect(() => {
    const getProdukByTd = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/produk/${id}`);
        setNamaProduk(response.data.nama_produk);
        setHargaProduk(response.data.harga_produk);
        setAdmin(response.data.admin.nama);
        setKontak(response.data.admin.email);
        setGambarProduk(response.data.gambar_produk);
        setDeskripsi(response.data.deskripsi_produk);
        setIdProduk(response.data.id);
      } catch (error) {
        console.log(error);
      }
    };
    getProdukByTd();
  }, [id]);
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
  return (
    <div>
      <div>
        <Navbar />
      </div>
      {getPembelian.length === 0 ? (
        <div className="mt-32">
          <div className="mx-32">
            <div className="flex mb-5 bg-lime-400 p-2 rounded w-64 shadow">
              <span className="material-symbols-outlined">info</span>
              <h1 className="ml-3">Informasi produk</h1>
            </div>
            <form
              onSubmit={pembelian}
              className="mb-10 transition-all duration-1000 py-10 shadow-md rounded-lg hover:shadow-lg"
            >
              <div className="grid grid-cols-2 mx-20">
                <img
                  src={gambar_produk}
                  alt=""
                  className="w-[400px] mt-5 rounded"
                />
                <div className="-ml-10">
                  <h1 className="my-2 text-3xl font-bold">{nama_produk}</h1>
                  <div className="flex justify-between mt-5 items-center">
                    <p className="text-xs text-gray-400 capitalize">
                      Produk by {admin}
                    </p>
                    <p className="text-xs bg-lime-300 p-1 px-2 rounded mt-1">
                      Email : {kontak}
                    </p>
                  </div>
                  <hr className="h-px border-0 bg-lime-200 my-3" />
                  <p className="my-2 font-bold text-xl mb-3">
                    {formatRupiah(harga_produk)}
                  </p>
                  <p className="pb-10 text-justify indent-8">
                    {deskripsi_produk}
                  </p>
                </div>
              </div>
              <div className="text-end mr-20 text-xs">
                <button
                  className="shadow transition-all duration-1000 border bg-black text-white p-2 px-4 rounded mr-5 hover:bg-lime-400 hover:text-black"
                  type="button"
                  onClick={() => navigate("/produkkonsumen")}
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
        </div>
      ) : (
        <div className="m-32 text-center mb-32">
          <hr className="h-px border-0 bg-lime-200" />
          <div className="flex justify-center">
            <h1 className="font-bold mb-20 text-xl bg-lime-400 w-32 p-2 rounded-b-lg shadow text-center">
              <span className="z-10">Perhatian!</span>
            </h1>
          </div>
          <span className="material-symbols-outlined text-6xl p-2 rounded-full bg-lime-400 animate-bounce shadow">
            credit_card_gear
          </span>

          <h1 className="mt-5 text-red-400">
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
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Transaksi;
