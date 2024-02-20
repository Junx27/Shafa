import Navbar from "../../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { meUser } from "../../features/AuthSlice";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import InfromasiKeranjang from "../../components/konsumen/Keranjang";
import axios from "axios";

function Keranjang() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);
  const [getPembayaran, setGetPembayaran] = useState([]);

  useEffect(() => {
    const fetchPembayaran = async () => {
      const response = await axios.get("http://localhost:5000/pembayaran");
      setGetPembayaran(response.data);
    };
    fetchPembayaran();
  }, []);

  useEffect(() => {
    dispatch(meUser());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      {getPembayaran.length === 0 ? (
        <div className="m-32 mb-64">
          <InfromasiKeranjang />
        </div>
      ) : (
        <div className="m-32">
          {getPembayaran.map((row, index) => (
            <div key={index}>
              {row.bukti_pembayaran === "belum" && <div>{row.nama}</div>}
              <button
                className="bg-lime-400 p-2 rounded"
                onClick={() => navigate(`/pembayaran/${row.uuid}`)}
              >
                Selsaikan Pembayaran
              </button>
            </div>
          ))}
        </div>
      )}

      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Keranjang;
