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
      <div className="mt-20 ms-80 pl-6 mr-10">
        <div className="text-xs flex bg-green-400 p-2 rounded w-64 shadow">
          <span className="text-xs material-symbols-outlined">mail</span>
          <h1 className="text ml-2">Kritik dan saran masuk</h1>
        </div>
        <div className="mt-10">
          <ViewKritik />
        </div>
      </div>
    </div>
  );
}

export default Kritik;
