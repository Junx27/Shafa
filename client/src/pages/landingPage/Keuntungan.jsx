import { useNavigate } from "react-router-dom";
import Login from "../../components/Login";
import { useEffect, useState } from "react";

function Keuntungan() {
  const navigate = useNavigate();
  const [changeColor, setChangeColor] = useState(false);
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
  return (
    <div className="mt-32 mx-32">
      <button
        className={
          changeColor
            ? "sticky top-5 left-5 z-20 bg-lime-200 p-2 rounded-md transition duration-1000"
            : "sticky top-5 left-5 z-20 bg-white p-2 rounded-md"
        }
        onClick={() => navigate("/bantuanpendaftaran")}
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
        onClick={() => navigate("/keuntungankonsumen")}
      >
        <div className="flex intems-center">
          <p className="text-sm">Selanjutnya</p>
          <span className="material-symbols-outlined text-sm">
            arrow_forward
          </span>
        </div>
      </button>
      <div>
        <h1 className="text-3xl font-bold text-green-600">
          Keuntungan Konsumen <br />
          di Shafa Farm Hidroponik
        </h1>
      </div>
      <div className="fixed top-10 right-20">
        <Login />
      </div>
    </div>
  );
}

export default Keuntungan;
