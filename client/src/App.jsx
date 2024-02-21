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
import Home from "./pages/konsumen/Home";
import RiwayatKonsumen from "./pages/konsumen/History";
import Keranjang from "./pages/konsumen/Keranjang";
import Faq from "./pages/konsumen/Faq";
import Profile from "./pages/konsumen/Profile";
import ProdukKonsumen from "./pages/konsumen/Produk";
import EditProduk from "./pages/admin/EditProduk.jsx";
import Register from "./pages/konsumen/Register.jsx";
import Page404 from "./pages/Page404.jsx";
import ViewKonsumen from "../src/pages/admin/EditKonsumen.jsx";
import Transaksi from "./pages/konsumen/Transaksi.jsx";
import Pembayaran from "./pages/konsumen/EditPembayaran.jsx";
import EditPembayaran from "./components/konsumen/EditPembayaran.jsx";
import ViewPembelian from "./pages/konsumen/ViewPembelian.jsx";

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
        <Route path="/produk/edit/:id" Component={EditProduk} />
        <Route path="/konsumen" Component={Konsumen} />
        <Route path="/konsumen/:id" Component={ViewKonsumen} />
        <Route path="/promo" Component={Promo} />
        <Route path="/pesanan" Component={Pesanan} />
        <Route path="/riwayat" Component={Riwayat} />
        <Route path="/pengaturan" Component={Pengaturan} />
        <Route path="/kritik" Component={Kritik} />
        <Route path="/home" Component={Home} />
        <Route path="/riwayatkonsumen" Component={RiwayatKonsumen} />
        <Route path="/keranjang" Component={Keranjang} />
        <Route path="/transaksi/:id" Component={Transaksi} />
        <Route path="/pembayaran/:id" Component={EditPembayaran} />
        <Route path="/pembelian/:id" Component={ViewPembelian} />
        <Route path="/faq" Component={Faq} />
        <Route path="/profile" Component={Profile} />
        <Route path="/produkkonsumen" Component={ProdukKonsumen} />
        <Route path="/register" Component={Register} />
        <Route path="/*" Component={Page404} />
      </Routes>
    </div>
  );
}

export default App;
