import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { meUser } from "../../features/AuthSlice";
import { Suspense, useEffect } from "react";
import { lazy } from "react";
const Navbar = lazy(() => import("../../components/Navbar"));
const Footer = lazy(() => import("../../components/Footer"));
const Pembayaran = lazy(() => import("../../components/konsumen/Pembayaran"));

function History() {
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
        <div className="mx-5 mt-32 md:m-32">
          <Pembayaran />
        </div>
        <div>
          <Footer />
        </div>
      </Suspense>
    </div>
  );
}

export default History;
