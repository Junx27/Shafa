import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { meUser } from "../../features/AuthSlice";
import { Suspense, lazy, useEffect, useState } from "react";
import HeroAnimate from "../../components/animate/HeroAnimate";
import HeroAnimate1 from "../../components/animate/HeroAnimate1";
import HeroAnimateMobile from "../../components/animate/HeroAnimateMobile";
import HeroAnimate1Mobile from "../../components/animate/HeroAnimate1Mobile";
import axios from "axios";

const HomeView = lazy(() => import("../../components/konsumen/Home"));
const Promo = lazy(() => import("../../components/layout/HeroPromo"));
const Navbar = lazy(() => import("../../components/Navbar"));
const Footer = lazy(() => import("../../components/Footer"));

function Home() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    navigate(`/produkkonsumen?search=${searchTerm}`);
  };
  const produkList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/produk/status/promo"
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    produkList();
  }, []);

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
      <Suspense fallback={<div></div>}>
        <div className="">
          <Navbar />
        </div>
        <div className="bg-gradient-to-r from-emerald-500 from-10% via-sky-500 via-30% to-indigo-500 to-90% w-[100%] h-[300px] md:h-[500px] z-0 bg-fixed top-0 z-0 relative rounded-b-[20px]">
          <div className="hidden md:block absolute top-24">
            <HeroAnimate />
          </div>
          <div className="hidden md:block absolute top-24 right-0">
            <HeroAnimate1 />
          </div>
          <div className="block md:hidden absolute top-[130px] -left-10">
            <HeroAnimateMobile />
          </div>
          <div className="block md:hidden absolute top-[140px] -right-10">
            <HeroAnimate1Mobile />
          </div>

          <div className="absolute top-[50%] left-5 md:left-[35%] z-20 shadow-lg">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                className="w-[300px] md:w-96 p-3 rounded-l-lg outline-none text-xs"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Cari produk disini"
                required="masukan teks"
              />
              <button
                className="bg-green-400 p-3 rounded-r-lg text-xs"
                type="submit"
              >
                Cari
              </button>
            </form>
          </div>
        </div>
        {data.length >= 5 ? (
          <div className="relative -mt-16">
            <Promo />
          </div>
        ) : (
          <div className=" mt-20">
            <h1 className="text-center text-xl md:text-4xl font-bold">
              Selamat Datang di Shafa Farm Hidroponik
            </h1>
            <div className="flex justify-center mt-5">
              <p className="w-[330px] md:w-[700px] text-xs md:text-sm text-center">
                Kami berkomitmen memberikan melon berkualitas terbaik yang
                dihasilkan melalui metode hidroponik yang mengutamakan kualitas,
                kebersihan, dan kesegaran.
              </p>
            </div>
            <div className="flex justify-center mt-10">
              <button
                className="transition-all duration-1000 text-xs bg-green-400 p-2 rounded shadow hover:shadow-lg"
                onClick={() => navigate("/produkkonsumen")}
              >
                Belanja sekarang
              </button>
            </div>
          </div>
        )}
        <div>
          <HomeView />
        </div>
        <div>
          <Footer />
        </div>
      </Suspense>
    </div>
  );
}

export default Home;
