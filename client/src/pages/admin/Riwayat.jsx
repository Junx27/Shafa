import SideNavbar from "../../components/SideNavbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { meAdmin } from "../../features/AuthSlice";
import { useEffect, useState } from "react";
import ViewRiwayat from "../../components/admin/Riwayat";

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
      <div className="mt-20 md:mt-16 md:ms-80 md:pl-6 mx-5 md:mx-0 md:mr-10">
        <div>
          <ViewRiwayat />
        </div>
      </div>
    </div>
  );
}

export default Riwayat;
