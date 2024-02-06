import Admin from "../../components/Admin";
import SideNavbar from "../../components/SideNavbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { meAdmin } from "../../features/AuthSlice";
import { useEffect } from "react";
import Profile from "../../components/admin/Profile";

function Pengaturan() {
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
      <div className="mt-5 ms-80 pl-6 mr-10">
        <hr className="h-px border-0 bg-lime-200 mb-5" />
        <div>
          <Profile />
        </div>
      </div>
    </div>
  );
}

export default Pengaturan;
