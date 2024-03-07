import SideNavbar from "../../components/SideNavbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { meAdmin } from "../../features/AuthSlice";
import { useEffect } from "react";
import ViewKritik from "../../components/admin/Kritik";

function Kritik() {
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
      <div className="mt-5 ms-80 pl-6 mr-10">
        <hr className="h-px border-0 bg-lime-200 mb-5" />
        <div className="flex bg-lime-400 p-2 rounded w-64 shadow">
          <span className="material-symbols-outlined">mail</span>
          <h1 className="text ml-2">Kritik dan Saran</h1>
        </div>
        <div className="mt-10">
          <ViewKritik />
        </div>
      </div>
    </div>
  );
}

export default Kritik;
