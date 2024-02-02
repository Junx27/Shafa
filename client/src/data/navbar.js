import chart from "../assets/navbar/chart.svg";
import produk from "../assets/navbar/shop.svg";
import user from "../assets/navbar/user.svg";
import promo from "../assets/navbar/tag.svg";
import pesanan from "../assets/navbar/produk.svg";
import history from "../assets/navbar/dialog.svg";
import pengaturan from "../assets/navbar/settings.svg";
import kritik from "../assets/navbar/letter.svg";

export const navbar = [
  {
    id: 1,
    image: chart,
    nama: "Dashboard",
    link: "/dashboard",
  },
  {
    id: 2,
    image: produk,
    nama: "Produk",
    link: "/produk",
  },
  {
    id: 3,
    image: user,
    nama: "Konsumen",
    link: "/konsumen",
  },
  {
    id: 4,
    image: promo,
    nama: "Promo",
    link: "/promo",
  },
  {
    id: 5,
    image: pesanan,
    nama: "Pesanan",
    link: "/pesanan",
  },
  {
    id: 6,
    image: history,
    nama: "History",
    link: "/riwayat",
  },
  {
    id: 7,
    image: pengaturan,
    nama: "Pengaturan",
    link: "/pengaturan",
  },
  {
    id: 8,
    image: kritik,
    nama: "Kritik & Saran",
    link: "/kritik",
  },
];
