import Navbar from "../../components/Navbar";
import ProdukList from "../../components/konsumen/Produk";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { meUser } from "../../features/AuthSlice";
import { useEffect } from "react";
import Footer from "../../components/Footer";

function Produk() {
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
      <div className="mt-32 mx-32 pb-20">
        <ProdukList />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Produk;
