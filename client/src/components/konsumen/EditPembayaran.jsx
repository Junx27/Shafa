import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditPembayaran() {
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
      const formData = new FormData();
      formData.append("pembayaran_id", pembayaranId);
      await axios.patch(
        `http://localhost:5000/pembelian/status/${status}`,
        formData,
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
    <div>
      {uuid}
      {nama}
      {alamat}
      {total}
      <form action="" onSubmit={updatePembelian}>
        <button className="bg-lime-400 p-2 rounded" type="submit">
          Pesan sekarang
        </button>
      </form>
    </div>
  );
}

export default EditPembayaran;
