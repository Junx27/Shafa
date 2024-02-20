import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function EditPembayaran() {
  const { id } = useParams();
  const [nama, setNama] = useState([]);
  const [alamat, setAlamat] = useState([]);
  const [total, setTotal] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(`http://localhost:5000/pembayaran/${id}`);
    setNama(response.data.nama);
    setAlamat(response.data.alamat);
    setAlamat(response.data.alamat);
    setTotal(response.data.total);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      {nama}
      {alamat}
      {total}
    </div>
  );
}

export default EditPembayaran;
