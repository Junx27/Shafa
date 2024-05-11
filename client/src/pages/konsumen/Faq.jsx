import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { meUser } from "../../features/AuthSlice";
import { Suspense, lazy, useEffect } from "react";
const Navbar = lazy(() => import("../../components/Navbar"));
const Footer = lazy(() => import("../../components/Footer"));

function Faq() {
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
        <div className="h-[800px]">
          <h1 className="mt-20">ini adalah halaman bantuan</h1>
        </div>
        <div>
          <Footer />
        </div>
      </Suspense>
    </div>
  );
}

export default Faq;
