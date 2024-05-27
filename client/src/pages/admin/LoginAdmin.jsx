import { useEffect, useState } from "react";
import Login from "../../components/LoginAdmin.jsx";
import AdminAnimate from "../../components/animate/AdminAnimate.jsx";
import PopOver from "../../components/layout/PopOver.jsx";
import AdminAnimateMobile from "../../components/animate/AdminAnimateMobile.jsx";
import Logo from "../../components/animate/Logo.jsx";
import { useDispatch } from "react-redux";
import { logoutAdmin } from "../../features/AuthSlice.js";

function LoginAdmin() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logoutAdmin());
  }, [dispatch]);
  return (
    <div className="bg-white py-20">
      <div>
        <div className="border border-b-1 fixed top-0 w-full z-50">
          <div className="mx-5 p-3 flex justify-between items-center">
            <div className="flex items-center">
              <Logo />
              <h1 className="ml-3 font-bold">Shafa Farm Hidroponik</h1>
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <AdminAnimate />
        </div>
        <div className="block md:hidden">
          <AdminAnimateMobile />
        </div>
        <div className="flex justify-center">
          <button
            className="bg-green-400 p-2 w-32 rounded shadow-lg"
            onClick={() => setOpen(!open)}
          >
            Login
          </button>
        </div>
      </div>
      {open && (
        <PopOver>
          <div className="relative">
            <Login />
            <span
              className="tranistion-all duration-1000 hover:text-red-400 material-symbols-outlined absolute top-5 right-5 cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              cancel
            </span>
          </div>
        </PopOver>
      )}
    </div>
  );
}

export default LoginAdmin;
