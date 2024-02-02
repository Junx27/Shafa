import Admin from "../../components/Admin";
import SideNavbar from "../../components/SideNavbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AdminMe } from "../../features/authSliceAdmin";
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
  const { isError } = useSelector((state) => state.authAdmin);

  useEffect(() => {
    dispatch(AdminMe());
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
        <h1 className="text-3xl font-light">Selamat Datang</h1>
        <div className="grid grid-cols-4 gap-16 mt-10">
          <div
            className="box-models shadow-md shadow-lime-400 cursor-pointer hover:bg-lime-200"
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
          <div className="box-models shadow-md shadow-lime-400">
            <div className="flex flex-row items-center">
              <img src={konsumenIcon} alt="" className="w-10 mr-5" />
              <h2>Konsumen</h2>
            </div>
            <div className="mt-5 text-center font-bold text-xl">
              <JumlahKonsumen />
            </div>
          </div>
          <div className="box-models shadow-md shadow-lime-400">
            <div className="flex flex-row items-center">
              <img src={promoIcon} alt="" className="w-10 mr-5" />
              <h2>Promo</h2>
            </div>
            <div className="mt-5 text-center font-bold text-xl">
              <JumlahPromo />
            </div>
          </div>
          <div className="box-models shadow-md shadow-lime-400">
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
          <h1 className="text-xl">Pesanan Masuk</h1>
          <Table data={data} />
        </div>
        <div>
          <h1 className="text-xl">Konsumen Baru</h1>
          <PendaftaranKonsumen data={konsumen} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
