import Navbar from "../../components/Navbar";
import Promo from "../../components/layout/Promo";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { meUser } from "../../features/AuthSlice";
import { useEffect } from "react";
import Footer from "../../components/Footer";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(meUser());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  return (
    <div>
      <div className="">
        <Navbar />
      </div>
      <div className="absolute z-20 mt-20 mx-32">
        <div>
          <h1 className="text-4xl font-bold mt-20 bg-lime-400 rounded-t-lg p-5 px-10">
            Selamat Datang <br />
            di Shafa Farm Hidroponik
          </h1>
          <p className="w-[600px] indent-7 text-justify bg-lime-50 rounded-b-lg border border-lime-300 p-10 shadow-lg">
            Kami berkomitmen memberikan melon berkualitas terbaik yang
            dihasilkan melalui metode hidroponik yang mengutamakan kualitas,
            kebersihan, dan kesegaran. Shafa Farm Hidroponik adalah sebuah usaha
            pertanian yang mengkhususkan diri dalam budidaya buah melon
            menggunakan sistem hidroponik.
            <p className="text-xl text-end mt-5">...............</p>
            <p className="text-xs text-end">Shafa Farm Hidrponik</p>
          </p>
        </div>
      </div>
      <div className=" bg-[url('http://localhost:5000/images/bghero.jpg')] bg-no-repeat bg-cover bg-center w-[100%] h-[1000px] z-0 bg-fixed top-0 z-0"></div>
      <div className="w-[100%] h-[1000px] bg-lime-50 absolute top-[650px] z-20">
        <Promo />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
