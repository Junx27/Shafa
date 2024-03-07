import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../animate/Loading";

function KonfirmasiPembelian() {
  const navigate = useNavigate();
  const [pembayaranBelum, setPembayaranBelum] = useState([]);
  const [userId, setUserId] = useState([]);

  useEffect(() => {
    const fetchProfil = async () => {
      const response = await axios("http://localhost:5000/me");
      setUserId(response.data.id);
    };
    fetchProfil();
  }, []);
  useEffect(() => {
    const fetchPembayaranBelum = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/pembayaran/belum"
        );
        setPembayaranBelum(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPembayaranBelum();
  }, []);
  const uuid = pembayaranBelum
    .filter((row) => row.user_id === userId)
    .map((row) => row.uuid);
  useEffect(() => {
    const konfirmasi = setTimeout(() => {
      navigate(`/pembayaran/${uuid}`);
    }, 1000);
    return () => clearTimeout(konfirmasi);
  });
  return (
    <div className="flex justify-center mt-64">
      <LoadingSpinner />
    </div>
  );
}

export default KonfirmasiPembelian;
