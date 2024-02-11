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
  const [image, setImage] = useState(null);
  const [nama_produk, setNamaProduk] = useState("");
  const [harga_produk, setHargaProduk] = useState("");
  const [adminId, setAdminId] = useState("");
  const [gambar_produk, setGambarProduk] = useState(null);
  const [deskripsi_produk, setDeskripsi] = useState();
  const [idProduk, setIdProduk] = useState();
  const status = "belum";
  const { isError } = useSelector((state) => state.auth);

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
        setAdminId(response.data.admin_id);
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
      formData.append("bukti_transfer", status);
      formData.append("status_pengiriman", status);
      formData.append("status_penerimaan", status);

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
      <div className="mt-32">
        <div className="mt-32 mx-32">
          <div className="flex mb-5">
            <span className="material-symbols-outlined">info</span>
            <h1 className="ml-3">Informasi produk</h1>
          </div>
          <form onSubmit={pembelian} className="pb-16 pt-5 shadow rounded-lg">
            <div className="grid grid-cols-2 mx-20">
              <img
                src={gambar_produk}
                alt=""
                className="w-[300px] mt-5 rounded"
              />
              <div className="-ml-10">
                <h1 className="my-2">
                  Nama : <spanc className="font-bold">{nama_produk}</spanc>
                </h1>
                <p className="my-2">Harga : {formatRupiah(harga_produk)}</p>
                <p className="pb-10 text-justify">
                  Deskripsi : {deskripsi_produk}
                </p>
              </div>
            </div>
            <div className="text-end mr-20">
              <button
                className="bg-red-400 p-2 rounded mr-10"
                type="button"
                onClick={() => navigate("/produkkonsumen")}
              >
                batal
              </button>
              <button className="bg-lime-300 p-2 rounded" type="submit">
                Pesan
              </button>
            </div>
          </form>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Transaksi;
