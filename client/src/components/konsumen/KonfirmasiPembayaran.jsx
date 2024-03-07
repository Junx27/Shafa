import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Check from "../animate/Check";
import PaymentAnimateHistory from "../animate/PaymentAnimateHistory";

function KonfirmasiPembayaran() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [uuid, setUuid] = useState([]);
  const [pembayaranId, setPembayaranId] = useState([]);
  const [userId, setUserId] = useState([]);

  useEffect(() => {
    const fetchProfil = async () => {
      const response = await axios("http://localhost:5000/me");
      setUserId(response.data.id);
    };
    fetchProfil();
  }, []);

  const fetchData = async () => {
    const response = await axios.get(`http://localhost:5000/pembayaran/${id}`);
    setPembayaranId(response.data.id);
    setUuid(response.data.uuid);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updatePembelian = async () => {
    try {
      const formDataPembelian = new FormData();
      formDataPembelian.append("pembayaran_id", pembayaranId);
      await axios.patch(
        `http://localhost:5000/pembelian/status/${userId}`,
        formDataPembelian,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const status_pembayaran = "sudah";
      const formDataPembayaran = new FormData();
      formDataPembayaran.append("status_pembayaran", status_pembayaran);
      await axios.patch(
        `http://localhost:5000/pembayaran/${uuid}`,
        formDataPembayaran,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      navigate("/riwayatkonsumen");
    } catch (error) {
      console.error("Gagal memperbarui data:", error);
    }
  };

  useEffect(() => {
    const konfirmasi = setTimeout(() => {
      updatePembelian();
    }, 4000);
    return () => clearTimeout(konfirmasi);
  });

  return (
    <div className="text-center">
      <div className="flex justify-center">
        <PaymentAnimateHistory />
      </div>
      <p className="text-gray-400 md:w-96 mx-5 md:mx-auto mt-5 text-[10px] md:text-xs">
        Untuk melakukan pembelian berikutnya mohon untuk mengkonfirmasi
        pembelian sebelumnya terlebih dahulu{" "}
        <span className="text-black">, disini!</span>
      </p>
      <form action="" onSubmit={(e) => e.preventDefault()}>
        <button type="button" onClick={updatePembelian}>
          <Check />
        </button>
      </form>
    </div>
  );
}

export default KonfirmasiPembayaran;
