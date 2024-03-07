import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { meUser } from "../../features/AuthSlice";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../components/animate/Loading";
import KonfirmasiPembelian from "../../components/konsumen/KonfirmasiPembelian";

function CheckOut() {
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
        <div className="flex justify-center mt-64">
          <LoadingSpinner />
        </div>
      ) : (
        <div>
          <div className="mx-5 mt-32 md:m-32 mb-10">
            <KonfirmasiPembelian />
          </div>
        </div>
      )}
    </div>
  );
}

export default CheckOut;
