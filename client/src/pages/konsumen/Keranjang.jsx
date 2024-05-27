import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { meUser } from "../../features/AuthSlice";
import { Suspense, lazy, useEffect } from "react";
import Whatsapp from "../../components/features/Whatsapp";
const Navbar = lazy(() => import("../../components/Navbar"));
const Footer = lazy(() => import("../../components/Footer"));
const InfromasiKeranjang = lazy(() =>
  import("../../components/konsumen/Keranjang")
);

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
      <Suspense fallback={<div></div>}>
        <div>
          <Navbar />
        </div>
        <div className="m-5 mt-32 md:m-32">
          <InfromasiKeranjang />
        </div>
        <div>
          <Whatsapp />
          <Footer />
        </div>
      </Suspense>
    </div>
  );
}

export default Keranjang;
