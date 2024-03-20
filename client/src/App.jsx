import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
const LandingPage = lazy(() => import("./pages/LandingPage"));
const HalamanProduk = lazy(() => import("./pages/RegisterPage.jsx"));
const BantuanPendaftaran = lazy(() => import("./pages/landingPage/Bantuan"));
const KeuntunganKonsumen = lazy(() => import("./pages/landingPage/Keuntungan"));
const LoginAdmin = lazy(() => import("./pages/admin/LoginAdmin"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const Konsumen = lazy(() => import("./pages/admin/Konsumen"));
const Kritik = lazy(() => import("./pages/admin/Kritik"));
const Pengaturan = lazy(() => import("./pages/admin/Pengaturan"));
const Pesanan = lazy(() => import("./pages/admin/Pesanan"));
const Produk = lazy(() => import("./pages/admin/Produk"));
const Riwayat = lazy(() => import("./pages/admin/Riwayat"));
const ScrollToTop = lazy(() => import("./components/layout/SrollToTop"));
const Home = lazy(() => import("./pages/konsumen/Home"));
const RiwayatKonsumen = lazy(() => import("./pages/konsumen/History"));
const Keranjang = lazy(() => import("./pages/konsumen/Keranjang"));
const Faq = lazy(() => import("./pages/konsumen/Faq"));
const Profile = lazy(() => import("./pages/konsumen/Profile"));
const ProdukKonsumen = lazy(() => import("./pages/konsumen/Produk"));
const EditProduk = lazy(() => import("./pages/admin/EditProduk.jsx"));
const Page404 = lazy(() => import("./pages/Page404.jsx"));
const EditPembayaran = lazy(() =>
  import("./pages/konsumen/EditPembayaran.jsx")
);
const KonfirmasiPembelian = lazy(() =>
  import("./pages/konsumen/KonfirmasiPembelian.jsx")
);

function App() {
  return (
    <div>
      <ScrollToTop />
      <Suspense fallback={<div></div>}>
        <Routes>
          <Route path="/" Component={LandingPage} />
          <Route path="/registerberhasil" Component={HalamanProduk} />
          <Route path="/bantuanpendaftaran" Component={BantuanPendaftaran} />
          <Route path="/keuntungankonsumen" Component={KeuntunganKonsumen} />
          <Route path="/admin" Component={LoginAdmin} />
          <Route path="/dashboard" Component={Dashboard} />
          <Route path="/produk" Component={Produk} />
          <Route path="/produk/edit/:id" Component={EditProduk} />
          <Route path="/konsumen" Component={Konsumen} />
          <Route path="/pesanan/:pesananId" Component={Pesanan} />
          <Route path="/riwayat" Component={Riwayat} />
          <Route path="/pengaturan" Component={Pengaturan} />
          <Route path="/kritik" Component={Kritik} />
          <Route path="/home" Component={Home} />
          <Route path="/riwayatkonsumen" Component={RiwayatKonsumen} />
          <Route path="/keranjang" Component={Keranjang} />
          <Route path="/pembayaran/:id" Component={EditPembayaran} />
          <Route path="/konfirmasipembelian" Component={KonfirmasiPembelian} />
          <Route path="/faq" Component={Faq} />
          <Route path="/profile" Component={Profile} />
          <Route path="/produkkonsumen" Component={ProdukKonsumen} />
          <Route path="/*" Component={Page404} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
