import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Pembayaran() {
  const navigate = useNavigate();
  const [pembayaran, setPembayaran] = useState([]);
  const [pembayaranBelum, setPembayaranBelum] = useState([]);
  const [penerimaan, setPenerimaan] = useState([]);

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
  return (
    <div>
      {pembayaranBelum.length !== 0 && (
        <div>
          <div className="flex">
            <span className="material-symbols-outlined text-lime-500">
              shopping_cart_checkout
            </span>
            <h1 className="ml-5">Konfirmasi pembayaran</h1>
          </div>
          <div className="mt-5">
            {pembayaranBelum.map((row, index) => (
              <div key={index}>
                <button
                  className="bg-lime-400 p-2 rounded"
                  onClick={() => navigate(`/pembayaran/${row.uuid}`)}
                >
                  Konfirmasi pembayaran
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      {pembayaran.length !== 0 && (
        <div>
          <div className="flex mt-5">
            <span className="material-symbols-outlined text-lime-500">
              receipt_long
            </span>
            <h1 className="ml-5">Konfirmasi Penerimaan</h1>
          </div>
          <div className="mt-10">
            {pembayaran.map((row, index) => (
              <div key={index}>
                {row.nama}
                <img src={row.bukti_pembayaran} alt="" />
                <button
                  className="bg-lime-400 p-2 rounded"
                  onClick={(e) => updatePenerimaan(e, row.uuid)}
                >
                  Pesanan diterima
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      {penerimaan.length !== 0 && (
        <div>
          <div className="flex mt-5">
            <span className="material-symbols-outlined text-lime-500">
              description
            </span>
            <h1 className="ml-5">Pembelian selesai</h1>
          </div>
          <div className="mt-5">
            {penerimaan.map((row, index) => (
              <div key={index}>
                {row.nama}
                <img src={row.bukti_pembayaran} alt="" />
                <button
                  className="bg-lime-400 p-2 rounded"
                  onClick={() => navigate(`/pembelian/${row.uuid}`)}
                >
                  Selsaikan Pembayaran
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Pembayaran;
