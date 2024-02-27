import Navbar from "../../components/Navbar";
import ProdukList from "../../components/konsumen/Produk";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { meUser } from "../../features/AuthSlice";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import LoadingSpinner from "../../components/layout/Loading";

function Produk() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const startLoading = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };
    startLoading();
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
      {loading ? (
        <div className="mx-[45%] md:mx-[50%] my-[80%] md:my-[20%]">
          <LoadingSpinner />
          <p className="text-lime-400 text-xs mt-5">Loading...</p>
        </div>
      ) : (
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
      )}
    </div>
  );
}

export default Produk;
