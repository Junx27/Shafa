import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import HalamanProduk from "./pages/landingPage/HalamanProduk";
import BantuanPendaftaran from "./pages/landingPage/Bantuan";
import KeuntunganKonsumen from "./pages/landingPage/Keuntungan";
import LoginAdmin from "./pages/admin/LoginAdmin";
import Dashboard from "./pages/admin/Dashboard";
import Konsumen from "./pages/admin/Konsumen";
import Kritik from "./pages/admin/Kritik";
import Pengaturan from "./pages/admin/Pengaturan";
import Pesanan from "./pages/admin/Pesanan";
import Produk from "./pages/admin/Produk";
import Promo from "./pages/admin/Promo";
import Riwayat from "./pages/admin/Riwayat";
import ScrollToTop from "./components/layout/SrollToTop";

function App() {
  return (
    <div>
      <ScrollToTop />
      <Routes>
        <Route path="/" Component={LandingPage} />
        <Route path="/halamanproduk" Component={HalamanProduk} />
        <Route path="/bantuanpendaftaran" Component={BantuanPendaftaran} />
        <Route path="/keuntungankonsumen" Component={KeuntunganKonsumen} />
        <Route path="/admin" Component={LoginAdmin} />
        <Route path="/dashboard" Component={Dashboard} />
        <Route path="/produk" Component={Produk} />
        <Route path="/konsumen" Component={Konsumen} />
        <Route path="/promo" Component={Promo} />
        <Route path="/pesanan" Component={Pesanan} />
        <Route path="/riwayat" Component={Riwayat} />
        <Route path="/pengaturan" Component={Pengaturan} />
        <Route path="/kritik" Component={Kritik} />
      </Routes>
    </div>
  );
}

export default App;
