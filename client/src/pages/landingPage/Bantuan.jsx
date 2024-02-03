import { useNavigate } from "react-router-dom";
import Login from "../../components/Login";
import { useEffect, useState } from "react";
import { bantuan } from "../../data/Bantuan";

function Bantuan() {
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
    <div className="mt-10">
      <button
        className={
          changeColor
            ? "sticky top-5 left-5 z-20 bg-lime-300 hover:bg-lime-400 p-2 rounded-md transition duration-1000"
            : "sticky top-5 left-5 z-20 bg-white p-2 rounded-md hover:bg-lime-200 hover:p-2 hover:rounded-md"
        }
        onClick={() => navigate("/halamanproduk")}
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
        <h1
          className={`mx-32 text-3xl font-bold text-green-600 pl-10 pr-20 -mt-10 pb-5 pt-10 w-[650px] fixed z-30 transition-all duration-1000 ${
            changeColor
              ? "bg-white rounded-b-lg -mt-[100px] transition-all duration-1000"
              : ""
          }`}
        >
          Bagaimana Cara <br />
          Mendaftar Sebagai Konsumen ?
        </h1>
      </div>
      <div className="flex flex-col mt-32 mx-16">
        {bantuan.map((row, index) => (
          <div
            key={index}
            className="bg-lime-50 my-5 mx-64 w-[450px] p-5 rounded-lg shadow"
          >
            <div className="flex flex-row">
              <div>
                <h1 className="text-center bg-lime-400 w-32 py-2 rounded-l-md font-bold absolute left-[150px] shadow-md z-0">
                  {row.step}
                </h1>
              </div>
              <div>
                <h1 className="mb-3">{row.nama}</h1>
                <div className="flex flex-col border border-2 border-dotted border-lime-400 p-2 pb-5 bg-lime-100">
                  <label className="text-xl mb-3">{row.label}</label>
                  <div className="bg-lime-400 rounded-md py-6 px-10 w-96 ml-3 text-center">
                    {row.btn}
                  </div>
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

export default Bantuan;
