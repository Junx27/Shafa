import Navbar from "../../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { meUser } from "../../features/AuthSlice";
import { useEffect, useState } from "react";
import axios from "axios";

function Transaksi() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [jumlah, setJumlah] = useState(1);
  const [image, setImage] = useState(null);
  const [nama_produk, setNamaProduk] = useState("");
  const [harga_produk, setHargaProduk] = useState("");
  const [adminId, setAdminId] = useState("");
  const [gambar_produk, setGambarProduk] = useState(null);
  const [promo, setPromo] = useState("tidak promo");
  const [idProduk, setIdProduk] = useState();
  const status = "belum";
  const { isError } = useSelector((state) => state.auth);

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
        setPromo(response.data.status_produk);
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
      window.location.reload();
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
        <form
          onSubmit={pembelian}
          className="mx-auto p-10 box-login border border-lime-400 shadow-lg shadow-lime-600"
        >
          <div className="grid grid-flow-row auto-rows-max mt-16">
            <label htmlFor="nama">nama Produk</label>
            <input
              id="nama"
              type="text"
              value={nama_produk}
              onChange={(e) => setNamaProduk(e.target.value)}
              className="mt-3 p-4 rounded-lg border border-lime-500"
              required
            />
          </div>
          <div className="grid grid-flow-row auto-rows-max mt-16">
            <label htmlFor="harga">Harga</label>
            <input
              id="harga"
              type="text"
              value={harga_produk}
              onChange={(e) => setHargaProduk(e.target.value)}
              className="mt-3 p-4 rounded-lg border border-lime-500"
              required
            />
          </div>
          <div className="grid grid-flow-row auto-rows-max mt-16">
            <label htmlFor="jumlah">Jumlah</label>
            <select
              name="jumlah"
              id="jumlah"
              value={jumlah}
              onChange={(e) => setJumlah(e.target.value)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div className="grid grid-flow-row auto-rows-max mt-16">
            <label htmlFor="total">Total</label>
            <input
              id="total"
              type="text"
              value={parseInt(harga_produk * jumlah)}
              className="mt-3 p-4 rounded-lg border border-lime-500"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              className="bg-lime-300 py-3 px-8 rounded-md mt-10 mx-auto hover:bg-lime-400"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
        <div className="mt-32 mx-32">
          <h1 className="font-bold text-center mb-10">Transaksi pembelian</h1>
          <hr className="h-px border-0 bg-lime-200 mb-2" />
          <div className="flex felx-row">
            <img src={gambar_produk} alt="" />
            <div className="ml-32">
              <h1>{nama_produk}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transaksi;
