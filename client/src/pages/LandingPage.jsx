import { useEffect, useState } from "react";
import Login from "../components/Login";
import LandingPageAnimate from "../components/animate/LandingPageAnimate";
import Logo from "../components/animate/Logo";
import PopOver from "../components/layout/PopOver";
import LandingPageAnimateMobile from "../components/animate/LandingPageAnimateMobile";
import Register from "../components/Register";
import LoadingSpinner from "../components/animate/Loading";
import { logoutUser } from "../features/AuthSlice";
import { useDispatch } from "react-redux";

function LandingPage() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  useEffect(() => {
    const startLoading = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 800);
    };
    startLoading();
  }, []);
  return (
    <div>
      {loading ? (
        <div className="flex justify-center mt-64">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% pt-20 pb-10 md:py-32">
          <div className="bg-white fixed top-0 w-full z-50">
            <div className="mx-5 p-3 flex justify-between items-center">
              <div className="flex items-center">
                <Logo />
                <h1 className="ml-3 font-bold">Shafa Farm Hidroponik</h1>
              </div>
            </div>
          </div>
          {openLogin && (
            <PopOver>
              <div className="relative">
                <span
                  className="transition-all duration-1000 hover:text-red-400 absolute top-3 right-3 material-symbols-outlined cursor-pointer"
                  onClick={() => setOpenLogin(!openLogin)}
                >
                  cancel
                </span>
                <Login />
              </div>
            </PopOver>
          )}
          {openRegister && (
            <PopOver>
              <div className="relative">
                <span
                  className="transition-all duration-1000 hover:text-red-400 absolute top-3 right-3 material-symbols-outlined cursor-pointer z-50"
                  onClick={() => setOpenRegister(!openRegister)}
                >
                  cancel
                </span>
                <Register />
              </div>
            </PopOver>
          )}

          <div className="mx-5 md:mx-32 flex flex-col md:flex-row items-center pt-20">
            <div className="mr-0 md:mr-20">
              <h1 className="text-2xl text-center md:text-start md:text-5xl font-bold mb-10">
                Selamat Datang <br />
                di Shafa Farm Hidroponik
              </h1>
              <p className="indent-8 text-xs md:text-sm text-justify md:text-start">
                Kami berkomitmen memberikan melon berkualitas terbaik yang
                dihasilkan melalui metode hidroponik yang mengutamakan kualitas,
                kebersihan, dan kesegaran.
              </p>
              <div className="mt-16 md:mt-20 flex justify-center md:justify-start text-xs md:text-sm">
                <button
                  className="transition-all duration-1000 hover:bg-white hover:text-black border text-white rounded p-2 px-8 mr-5 shadow cursor-pointer"
                  onClick={() => setOpenRegister(!openRegister)}
                >
                  Daftar
                </button>
                <button
                  className="transition-all duration-1000 hover:bg-green-400 bg-white rounded p-2 px-8 shadow cursor-pointer"
                  onClick={() => setOpenLogin(!openLogin)}
                >
                  Masuk
                </button>
              </div>
            </div>
            <div className="order-first md:order-last">
              <div className="hidden md:block">
                <LandingPageAnimate />
              </div>
              <div className="block md:hidden -mt-20">
                <LandingPageAnimateMobile />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
