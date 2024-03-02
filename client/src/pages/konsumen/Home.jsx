import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { meUser } from "../../features/AuthSlice";
import { Suspense, lazy, useEffect, useState } from "react";
import HeroAnimate from "../../components/animate/HeroAnimate";
import HeroAnimate1 from "../../components/animate/HeroAnimate1";
import HeroAnimateMobile from "../../components/animate/HeroAnimateMobile";
import HeroAnimate1Mobile from "../../components/animate/HeroAnimate1Mobile";

const HomeView = lazy(() => import("../../components/konsumen/Home"));
const Promo = lazy(() => import("../../components/layout/Promo"));
const Navbar = lazy(() => import("../../components/Navbar"));
const Footer = lazy(() => import("../../components/Footer"));

function Home() {
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
        <div className="bg-gradient-to-r from-emerald-500 from-10% via-sky-500 via-30% to-indigo-500 to-90% w-[100%] h-[350px] md:h-[450px] z-0 bg-fixed top-0 z-0 relative rounded-b-[20px]">
          <div className="hidden md:block absolute top-24">
            <HeroAnimate />
          </div>
          <div className="hidden md:block absolute top-24 right-0">
            <HeroAnimate1 />
          </div>
          <div className="block md:hidden absolute top-[170px] -left-10">
            <HeroAnimateMobile />
          </div>
          <div className="block md:hidden absolute top-[180px] -right-10">
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
        <div className="relative -mt-16">
          <Promo />
        </div>
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
