import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Check from "../animate/Check";

function KonfirmasiPembayaran() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [uuid, setUuid] = useState([]);
  const [pembayaranId, setPembayaranId] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(`http://localhost:5000/pembayaran/${id}`);
    setPembayaranId(response.data.id);
    setUuid(response.data.uuid);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const updatePembelian = async (e) => {
    e.preventDefault();
    try {
      const status = "belum";
      const formDataPembelian = new FormData();
      formDataPembelian.append("pembayaran_id", pembayaranId);
      await axios.patch(
        `http://localhost:5000/pembelian/status/${status}`,
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
      console.log("berhasil mengupdate pembelian");
    } catch (error) {
      if (error.response) {
        console.error("Gagal memperbarui data:", error);
      }
    }
  };
  return (
    <div className="text-center">
      <div className="flex justify-center">
        <h1 className="font-bold mb-10 text-md md:text-xl bg-yellow-400 w-32 p-2 rounded-b-lg shadow-lg text-center">
          Konfirmasi
        </h1>
      </div>
      <p className="text-gray-400 md:w-96 mx-5 md:mx-auto mt-5 text-[10px] md:text-xs">
        Untuk melakukan pembelian berikutnya mohon untuk mengkonfimasi pembelian
        sebelumnya terlebih dahulu <span className="text-black">,disini!</span>
      </p>
      <form action="" onSubmit={updatePembelian}>
        <button className="" type="submit">
          <Check />
        </button>
      </form>
    </div>
  );
}

export default KonfirmasiPembayaran;
