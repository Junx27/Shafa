import Admin from "../../components/Admin";
import SideNavbar from "../../components/SideNavbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { meAdmin } from "../../features/AuthSlice";
import { useEffect } from "react";

function Konsumen() {
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
      <Admin />
      <div className="mt-20 ms-80 pl-6 mr-10">
        <hr className="h-px border-0 bg-lime-200 mb-5" />
        <h1 className="text-xl">Ini halaman konsumen</h1>
      </div>
    </div>
  );
}

export default Konsumen;
