import SideNavbar from "../../components/SideNavbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { meAdmin } from "../../features/AuthSlice";
import { useEffect } from "react";
import Pembelian from "../../components/admin/Pembelian";

function Pesanan() {
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

  return (
    <div className="">
      <SideNavbar />
      <div className="mt-20 md:mt-16 md:ms-80 md:pl-6 mx-5 md:mx-0 md:mr-10">
        <div>
          <Pembelian />
        </div>
      </div>
    </div>
  );
}

export default Pesanan;
