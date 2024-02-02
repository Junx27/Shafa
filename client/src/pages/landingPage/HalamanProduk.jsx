import axios from "axios";
import { useEffect, useState } from "react";
import Login from "../../components/Login";
import { useNavigate } from "react-router-dom";

function HalamanProduk() {
  const navigate = useNavigate();
  const [produk, setProduk] = useState([]);
  const [changeColor, setChangeColor] = useState(false);
  const produkList = async () => {
    try {
      const response = await axios.get("http://localhost:5000/produk");
      setProduk(response.data);
    } catch (error) {
      console.error("Gagal mengambil data produk", error);
    }
  };

  useEffect(() => {
    produkList();
  }, []);
  const changeBackgroundColor = () => {
    let scroll = window.scrollY;
    if (scroll > 10) {
      setChangeColor(true);
    } else {
      setChangeColor(false);
    }
  };
  useEffect(() => {
    changeBackgroundColor();
    window.addEventListener("scroll", changeBackgroundColor);
  });
  const formatRupiah = (number) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
    return formatter.format(number);
  };
  return (
    <div className="mt-10">
      <button
        className={
          changeColor
            ? "sticky top-5 left-5 z-20 bg-lime-200 p-2 rounded-md transition duration-1000"
            : "sticky top-5 left-5 z-20 bg-white p-2 rounded-md"
        }
        onClick={() => navigate("/")}
      >
        <div className="flex intems-center">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          <p className="text-sm">Kembali</p>
        </div>
      </button>
      <button
        className={
          changeColor
            ? "visible fixed bottom-16 left-[750px] z-20 bg-lime-200 p-2 rounded-md transition duration-1000"
            : "invisible fixed bottom-16 left-[750px] z-20 bg-white p-2 rounded-md"
        }
        onClick={() => navigate("/bantuanpendaftaran")}
      >
        <div className="flex intems-center">
          <p className="text-sm">Selanjutnya</p>
          <span className="material-symbols-outlined text-sm">
            arrow_forward
          </span>
        </div>
      </button>
      <div className="mt-0 mx-32">
        <h1 className="text-3xl font-bold text-green-600">Produk Kami</h1>
        <p className="mt-8 w-[700px]">
          Kami berkomitmen memberikan melon berkualitas terbaik yang dihasilkan
          melalui metode hidroponik yang mengutamakan kualitas, kebersihan, dan
          kesegaran.
        </p>
      </div>
      <div className="flex flex-col mx-32">
        {produk.map((row, index) => (
          <div key={index} className="w-[700px] h-[400px] mt-10 relative">
            <div className="bg-lime-50 rounded-lg">
              <div className="flex flex-row shadow rounded-r-lg">
                <img
                  src={row.gambar_produk}
                  alt=""
                  className="object-cover h-96 w-96 rounded-l-lg mr-10"
                />
                <div>
                  <p className="font-bold mt-5 text-xl">{row.nama_produk}</p>
                  <p className="mt-5 mr-10 text-justify text-green-600">
                    {row.deskripsi_produk}
                  </p>
                  <p className="absolute bottom-10 font-bold">
                    {formatRupiah(row.harga_produk)},00/Kg
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="fixed top-10 right-20">
        <Login />
      </div>
    </div>
  );
}

export default HalamanProduk;
