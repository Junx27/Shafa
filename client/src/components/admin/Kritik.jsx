import axios from "axios";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

function Kritik() {
  const [kritik, setKritik] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const fetchKritik = async () => {
    try {
      const response = await axios.get("http://localhost:5000/kritik");
      setKritik(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchKritik();
  }, []);
  const formatIndonesianDate = (date) => {
    return format(new Date(date), "dd MMMM yyyy", {
      locale: id,
    });
  };
  const hapus = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/kritik/${id}`);
      fetchKritik();
    } catch (error) {
      console.error("Gagal menghapus data kritik", error);
    }
  };
  const openPopHapus = (id) => {
    setDeleteId(id);
    scrollToTop();
  };

  const closePopHapus = () => {
    setDeleteId(null);
  };
  return (
    <div>
      {kritik.length !== 0 ? (
        <div className="grid grid-cols-4 gap-10">
          {kritik.map((row, index) => (
            <div
              key={index}
              className="transition-all duration-1000 rounded-lg p-5 shadow relative pb-10 hover:shadow-lg"
            >
              <div className="absolute top-0 right-0">
                <p className="text-xs bg-lime-300 p-1 rounded ml-10">
                  {formatIndonesianDate(row.createdAt)}
                </p>
              </div>
              <div className="flex items-center">
                <img
                  src={
                    row.user.gambar_profil === "belum"
                      ? "http://localhost:5000/images/defaultProfile.png"
                      : row.user.gambar_profil
                  }
                  alt=""
                  className="w-[60px] rounded-full"
                />
                <div className="ml-5">
                  <h1>{row.user.nama}</h1>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2 truncate">
                {row.user.alamat}
              </p>
              <div className="bg-white p-2 rounded-lg mt-2 mb-5 text-justify border">
                <p className="text-xs">{row.kritik}</p>{" "}
              </div>
              <div className="absolute bottom-3 right-3">
                <button
                  className="transition-all duration-1000 bg-black text-white p-2 rounded text-xs hover:bg-lime-400"
                  onClick={() => openPopHapus(row.uuid)}
                >
                  hapus
                </button>
              </div>
            </div>
          ))}
          {deleteId && (
            <div className="bg-lime-100 w-[400px] h-[130px] rounded-lg absolute right-96 top-32">
              <p className="p-5">Apakah anda ingin kritik ini?</p>
              <div className="flex justify-end mr-10">
                <button
                  className="bg-red-400 hover:bg-red-500 text-white py-2 px-5 rounded-lg mr-8"
                  onClick={() => {
                    closePopHapus();
                  }}
                >
                  Tidak
                </button>
                <button
                  className="bg-lime-400 hover:bg-lime-500 py-2 px-5 rounded-lg"
                  onClick={() => {
                    hapus(deleteId);
                    closePopHapus();
                  }}
                >
                  Ya
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <h1 className="ml-5">Belum ada kritik masuk</h1>
      )}
    </div>
  );
}

export default Kritik;
