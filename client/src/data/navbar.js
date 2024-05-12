import chart from "../assets/navbar/chart.svg";
import produk from "../assets/navbar/shop.svg";
import user from "../assets/navbar/user.svg";
import history from "../assets/navbar/dialog.svg";
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
    image: history,
    nama: "Riwayat",
    link: "/riwayat",
  },
  {
    id: 5,
    image: kritik,
    nama: "Kritik & Saran",
    link: "/kritik",
  },
];
