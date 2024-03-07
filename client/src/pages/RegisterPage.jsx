import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/animate/Loading";
import PopOver from "../components/layout/PopOver";
import LandingPageAnimate from "../components/animate/LandingPageAnimate";
import LandingPageAnimateMobile from "../components/animate/LandingPageAnimateMobile";
import Logo from "../components/animate/Logo";

function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const startLoading = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 800);
    };
    startLoading();
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);
    return () => clearTimeout(timer);
  });
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
                <button className="transition-all duration-1000 hover:bg-white hover:text-black border text-white rounded p-2 px-8 mr-5 shadow cursor-pointer">
                  Daftar
                </button>
                <button className="transition-all duration-1000 hover:bg-green-400 bg-white rounded p-2 px-8 shadow cursor-pointer">
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
          <PopOver>
            <div className="text-[8px] md:text-xs md:-mt-64 bg-white w-64 md:w-96 h-[150px] rounded-lg shadow-lg p-10">
              <p className="font-bold text-center">Pendaftaran berhasil</p>
              <p className="text-center mt-5">
                Mohon tunggu untuk memverifikasi data anda 1 x 24 jam dan akun
                siap digunakan
              </p>
            </div>
          </PopOver>
        </div>
      )}
    </div>
  );
}

export default RegisterPage;
