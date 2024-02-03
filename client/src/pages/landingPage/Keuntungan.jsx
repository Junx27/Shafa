import { useNavigate } from "react-router-dom";
import Login from "../../components/Login";
import { useEffect, useState } from "react";
import { keuntungan } from "../../data/Keuntungan";

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

  const [selectedDescription, setSelectedDescription] = useState(null);

  const handleDescriptionChange = (index) => {
    setSelectedDescription(selectedDescription === index ? null : index);
  };
  return (
    <div className="mt-10">
      <button
        className={
          changeColor
            ? "sticky top-5 left-5 z-20 bg-lime-200 p-2 rounded-md transition duration-1000"
            : "sticky top-5 left-5 z-20 bg-white p-2 rounded-md hover:bg-lime-200 hover:p-2 hover:rounded-md"
        }
        onClick={() => navigate("/bantuanpendaftaran")}
      >
        <div className="flex intems-center">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          <p className="text-sm">Kembali</p>
        </div>
      </button>
      <div className="mx-32">
        <h1 className="text-3xl font-bold text-green-600">
          Keuntungan Konsumen <br />
          di Shafa Farm Hidroponik
        </h1>
      </div>
      <div className="mx-32">
        {keuntungan.map((row, index) => (
          <div
            key={index}
            className="bg-lime-50 mt-10 w-[700px] rounded-lg p-5 shadow"
          >
            <div className="flex justify-between">
              <h1
                className={
                  selectedDescription === index
                    ? "mb-5 transition-all duration-1000"
                    : ""
                }
              >
                {row.nama}
              </h1>
              <div>
                <button onClick={() => handleDescriptionChange(index)}>
                  <span
                    className={`material-symbols-outlined cursor-pointer ${
                      selectedDescription === index
                        ? "text-red-400 transition-all duration-1000"
                        : "text-lime-600"
                    }`}
                  >
                    {selectedDescription === index
                      ? "expand_less"
                      : "expand_more"}
                  </span>
                </button>
              </div>
            </div>
            {selectedDescription === index && (
              <p className="text-sm text-justify bg-lime-100 p-5 rounded indent-7">
                {row.deskripsi}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="fixed top-10 right-20">
        <Login />
      </div>
    </div>
  );
}

export default Keuntungan;
