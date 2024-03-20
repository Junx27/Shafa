import SideNavbar from "../../components/SideNavbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { meAdmin } from "../../features/AuthSlice.js";
import { useEffect, useState } from "react";
import produkIcon from "../../assets/navbar/shop.svg";
import konsumenIcon from "../../assets/navbar/user.svg";
import Pesan from "../../assets/navbar/letter.svg";
import pesananIcon from "../../assets/navbar/produk.svg";
import JumlahProduk from "../../components/JumlahProduk";
import JumlahKonsumen from "../../components/JumlahKonsumen";
import JUmlahPesanan from "../../components/JumlahPesanan";
import PendaftaranKonsumen from "../../components/PendaftaranKonsumen.jsx";
import PesananMasuk from "../../components/admin/PesananMasuk.jsx";
import JumlahKritik from "../../components/JumlahKritik.jsx";
import LoadingSpinner from "../../components/animate/Loading.jsx";
import { animated, useSpring } from "react-spring";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const startLoading = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 800);
    };
    startLoading();
  }, []);
  const animation = useSpring({
    opacity: loading ? 0 : 1,
    marginTop: loading ? -10 : 0,
  });

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
      {loading ? (
        <div className="w-[100%] h-[800px]">
          <div className="flex ml-24 md:ml-64 md:justify-center mt-64">
            <LoadingSpinner />
          </div>
        </div>
      ) : (
        <animated.div style={animation}>
          <div className="mt-20 md:mt-16 md:ms-80 md:pl-6 mx-5 md:mx-0 md:mr-10">
            <div className="">
              <div className="text-xs flex bg-green-400 p-2 rounded w-64 shadow">
                <span className="material-symbols-outlined text-xs">
                  grid_view
                </span>
                <h1 className="ml-2">Dashboard Admin</h1>
              </div>
              <div className="grid md:grid-cols-4 gap-16 mt-5 mb-10">
                <div
                  className="bg-orange-200 border border-orange-200 transition-all duration-1000 p-5 rounded-lg shadow-md cursor-pointer hover:shadow-lg"
                  onClick={() => navigate("/produk")}
                >
                  <div className="flex flex-row items-center">
                    <img src={produkIcon} alt="" className="w-10 mr-5" />
                    <h2>Produk</h2>
                  </div>
                  <div className="mt-5 text-center font-bold text-xl">
                    <JumlahProduk />
                  </div>
                </div>
                <div
                  className="bg-green-200 border border-green-200 transition-all duration-1000 p-5 rounded-lg shadow-md cursor-pointer hover:shadow-lg -mt-10 md:mt-0"
                  onClick={() => navigate("/konsumen")}
                >
                  <div className="flex flex-row items-center">
                    <img src={konsumenIcon} alt="" className="w-10 mr-5" />
                    <h2>Konsumen</h2>
                  </div>
                  <div className="mt-5 text-center font-bold text-xl">
                    <JumlahKonsumen />
                  </div>
                </div>
                <div
                  className="bg-purple-200 border border-purple-200 transition-all duration-1000 p-5 rounded-lg shadow-md cursor-pointer hover:shadow-lg -mt-10 md:mt-0"
                  onClick={() => navigate("/kritik")}
                >
                  <div className="flex flex-row items-center">
                    <img src={Pesan} alt="" className="w-10 mr-5" />
                    <h2>Kritik</h2>
                  </div>
                  <div className="mt-5 text-center font-bold text-xl">
                    <JumlahKritik />
                  </div>
                </div>
                <div
                  className="bg-red-200 border border-red-200 transition-all duration-1000 p-5 rounded-lg shadow-md cursor-pointer hover:shadow-lg -mt-10 md:mt-0"
                  onClick={() => navigate("/pesanan")}
                >
                  <div className="flex flex-row items-center">
                    <img src={pesananIcon} alt="" className="w-10 mr-5" />
                    <h2>Pesanan</h2>
                  </div>
                  <div className="mt-5 text-center font-bold text-xl">
                    <JUmlahPesanan />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-20 mt-5 md:ms-80 md:pl-6 md:mr-10 mx-5 md:mx-0 mb-10">
            <div className="mb-5 md:mb-0">
              <div className="text-xs flex bg-green-400 p-2 rounded w-64 shadow">
                <span className="text-xs material-symbols-outlined">mail</span>
                <h1 className="text ml-2">Pesanan Masuk</h1>
              </div>
              <div>
                <PesananMasuk />
              </div>
            </div>
            <div>
              <div className="">
                <div className="text-xs flex bg-green-400 p-2 rounded w-64 shadow">
                  <span className="text-xs material-symbols-outlined">
                    verified_user
                  </span>
                  <h1 className="text ml-2">Konfirmasi Pengguna Baru</h1>
                </div>
                <PendaftaranKonsumen />
              </div>
            </div>
          </div>
        </animated.div>
      )}
    </div>
  );
}

export default Dashboard;
