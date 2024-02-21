import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ViewPembelian() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pembayaranId, setPembayaranId] = useState();
  const [pembelian, setPembelian] = useState([]);
  const fetchData = async () => {
    const response = await axios.get(`http://localhost:5000/pembayaran/${id}`);
    setPembayaranId(response.data.id);
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(pembayaranId);
  useEffect(() => {
    const fetchPembelian = async () => {
      const response = await axios("http://localhost:5000/pembelian");
      setPembelian(response.data);
    };
    fetchPembelian();
  }, []);
  console.log(pembelian);
  return (
    <div>
      {pembelian.map((row, index) => (
        <div key={index}>
          {row.pembayaran_id === pembayaranId && <div>{row.nama_produk}</div>}
        </div>
      ))}
    </div>
  );
}

export default ViewPembelian;
