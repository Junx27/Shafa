import Admin from "../../components/Admin";
import SideNavbar from "../../components/SideNavbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { meAdmin } from "../../features/AuthSlice";
import { useEffect, useState } from "react";

function Riwayat() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(meAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/admin");
    }
  }, [isError, navigate]);
  const [loading, setLoading] = useState(false);

  // Fungsi untuk mengatur status loading menjadi true selama 3 detik

  useEffect(() => {
    const startLoading = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };
    startLoading();
  }, []);
  return (
    <div className="">
      <SideNavbar />
      <Admin />
      <div className="mt-20 ms-80 pl-6 mr-10">
        <hr className="h-px border-0 bg-lime-200 mb-5" />
        <h1 className="text-xl">Ini halaman riwayat</h1>
        <div>
          {loading ? (
            <p className="w-96 bg-gray-400 animate-pulse p-3 rounded"></p>
          ) : (
            <p>Klik tombol untuk memulai loading</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Riwayat;
