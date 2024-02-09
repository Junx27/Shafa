import Admin from "../../components/Admin";
import SideNavbar from "../../components/SideNavbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { meAdmin } from "../../features/AuthSlice.js";
import { useEffect } from "react";
import produkIcon from "../../assets/navbar/shop.svg";
import konsumenIcon from "../../assets/navbar/user.svg";
import promoIcon from "../../assets/navbar/tag.svg";
import pesananIcon from "../../assets/navbar/produk.svg";
import JumlahProduk from "../../components/JumlahProduk";
import JumlahKonsumen from "../../components/JumlahKonsumen";
import JumlahPromo from "../../components/JumlahPromo";
import JUmlahPesanan from "../../components/JumlahPesanan";
import Table from "../../components/Table";
import { data, konsumen } from "../../data/data.js";
import PendaftaranKonsumen from "../../components/PendaftaranKonsumen.jsx";

function Dashboard() {
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
        <div className="flex">
          <span className="material-symbols-outlined">grid_view</span>
          <h1 className="ml-2">Dashboard Admin</h1>
        </div>
        <div className="grid grid-cols-4 gap-16 mt-5">
          <div
            className="transition-all duration-1000 box-models shadow-md cursor-pointer hover:shadow-lime-200 hover:shadow-lg"
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
          <div className="transition-all duration-1000 box-models shadow-md cursor-pointer hover:shadow-lime-200 hover:shadow-lg">
            <div className="flex flex-row items-center">
              <img src={konsumenIcon} alt="" className="w-10 mr-5" />
              <h2>Konsumen</h2>
            </div>
            <div className="mt-5 text-center font-bold text-xl">
              <JumlahKonsumen />
            </div>
          </div>
          <div className="transition-all duration-1000 box-models shadow-md cursor-pointer hover:shadow-lime-200 hover:shadow-lg">
            <div className="flex flex-row items-center">
              <img src={promoIcon} alt="" className="w-10 mr-5" />
              <h2>Promo</h2>
            </div>
            <div className="mt-5 text-center font-bold text-xl">
              <JumlahPromo />
            </div>
          </div>
          <div className="transition-all duration-1000 box-models shadow-md cursor-pointer hover:shadow-lime-200 hover:shadow-lg">
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
      <div className="grid grid-cols-2 gap-20 mt-16 ms-80 pl-6 mr-10">
        <div>
          <div className="flex">
            <span className="material-symbols-outlined">mail</span>
            <h1 className="text ml-2">Pesanan Masuk</h1>
          </div>
          <Table data={data} />
        </div>
        <div>
          <div className="flex">
            <span className="material-symbols-outlined">verified_user</span>
            <h1 className="text ml-2">Konfirmasi Pengguna Baru</h1>
          </div>
          <PendaftaranKonsumen />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
