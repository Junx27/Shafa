import Navbar from "../../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { meUser } from "../../features/AuthSlice";
import { useEffect } from "react";
import Footer from "../../components/Footer";
import InfromasiKeranjang from "../../components/konsumen/Keranjang";

function Keranjang() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

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
      <div className="m-32 mb-64">
        <InfromasiKeranjang />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Keranjang;
