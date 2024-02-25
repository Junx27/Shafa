import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function KonfirmasiPembayaran() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nama, setNama] = useState([]);
  const [uuid, setUuid] = useState([]);
  const [pembayaranId, setPembayaranId] = useState([]);
  const [alamat, setAlamat] = useState([]);
  const [total, setTotal] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(`http://localhost:5000/pembayaran/${id}`);
    setPembayaranId(response.data.id);
    setUuid(response.data.uuid);
    setNama(response.data.nama);
    setAlamat(response.data.alamat);
    setAlamat(response.data.alamat);
    setTotal(response.data.total);
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
      <hr className="h-px border-0 bg-lime-200" />
      <div className="flex justify-center">
        <h1 className="font-bold mb-20 text-xl bg-lime-400 w-32 p-2 rounded-b-lg shadow text-center">
          Konfirmasi
        </h1>
      </div>
      <span className="material-symbols-outlined text-6xl bg-lime-400 p-2 shadow rounded-full animate-bounce">
        check
      </span>
      <p className="text-red-400 w-96 mx-auto mt-5">
        Untuk melakukan pembelian berikutnya mohon untuk mengkonfimasi pembelian
        sebelumnya terlebih dahulu
      </p>
      <form action="" onSubmit={updatePembelian}>
        <button
          className="transition-all duration-1000 bg-lime-400 p-2 rounded mt-10 shadow hover:bg-lime-300"
          type="submit"
        >
          Konfirmasi pembayaran
        </button>
      </form>
    </div>
  );
}

export default KonfirmasiPembayaran;
