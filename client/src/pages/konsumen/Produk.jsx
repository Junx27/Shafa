import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { meUser } from "../../features/AuthSlice";
import { Suspense, lazy, useEffect } from "react";
import Whatsapp from "../../components/features/Whatsapp";
const ProdukList = lazy(() => import("../../components/konsumen/Produk"));
const Navbar = lazy(() => import("../../components/Navbar"));
const Footer = lazy(() => import("../../components/Footer"));

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
      <Suspense fallback={<div></div>}>
        <div>
          <Navbar />
        </div>
        <div className="mt-32 mx-5 md:mx-32 pb-32">
          <ProdukList />
        </div>
        <div className="mt-32">
          <Whatsapp />
          <Footer />
        </div>
      </Suspense>
    </div>
  );
}

export default Produk;
