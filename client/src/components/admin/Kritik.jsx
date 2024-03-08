import axios from "axios";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import PopOver from "../layout/PopOver";

function Kritik() {
  const [openHapus, setOpenHapus] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const [kritik, setKritik] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [user, setUser] = useState([]);
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
    setOpenHapus(!openHapus);
  };

  const closePopHapus = () => {
    setDeleteId(null);
    setOpenHapus(!openHapus);
  };
  const getUser = async (uuid) => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${uuid}`);
      setUser(response.data);
    } catch (error) {
      console.error("Gagal mengambil data pembelian:", error);
    }
  };
  const handleUserById = (uuid) => {
    getUser(uuid);
    setOpenUser(!openUser);
  };
  return (
    <div className="text-xs">
      {kritik.length !== 0 ? (
        <div className="grid grid-cols-3 gap-10">
          {kritik.map((row, index) => (
            <div
              key={index}
              className="transition-all duration-1000 rounded-lg p-5 shadow relative pb-10 hover:shadow-lg"
            >
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
                  <h1 className="text-sm font-bold capitalize">
                    {row.user.nama}
                  </h1>
                  <div className="mt-1">
                    <p className="text-xs text-gray-400">
                      {formatIndonesianDate(row.createdAt)}
                    </p>
                  </div>
                </div>
                <span
                  className="ml-20 text-sm hover:text-green-400 cursor-pointer material-symbols-outlined"
                  onClick={() => handleUserById(row.user.uuid)}
                >
                  open_in_new
                </span>
              </div>
              <div className="bg-white p-2 rounded mt-2 mb-5 text-justify border">
                <p className="text-xs">{row.kritik}</p>{" "}
              </div>
              <div className="absolute bottom-3 right-3">
                <button
                  className="transition-all duration-1000 bg-black text-white p-2 rounded text-xs hover:bg-green-400 hover:text-black mr-2"
                  onClick={() => openPopHapus(row.uuid)}
                >
                  hapus
                </button>
              </div>
            </div>
          ))}
          {openHapus && (
            <PopOver>
              {deleteId && (
                <div className="bg-white w-[400px] h-[150px] rounded-lg absolute right-96 top-32 p-5">
                  <p className="p-5">Apakah anda ingin kritik ini?</p>
                  <div className="flex justify-end mt-5">
                    <button
                      className="w-20 text-center transition-all duration-1000 bg-black hover:bg-green-400 text-white hover:text-black py-2 px-5 rounded-lg mr-8"
                      onClick={() => {
                        closePopHapus();
                      }}
                    >
                      Tidak
                    </button>
                    <button
                      className="w-20 text-center transition-all duration-1000 bg-green-400 hover:bg-green-300 py-2 px-5 rounded-lg"
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
            </PopOver>
          )}
          {openUser && (
            <PopOver>
              <div className="relative -mt-64 bg-white w-[300px] p-5 rounded flex flex-col">
                <span
                  className="absolute top-3 right-3 text-xl cursor-pointer material-symbols-outlined"
                  onClick={() => setOpenUser(!openUser)}
                >
                  cancel
                </span>
                <img
                  src={
                    user.gambar_profil === "belum"
                      ? "http://localhost:5000/images/defaultProfile.png"
                      : user.gambar_profil
                  }
                  alt=""
                  className="w-[100px] h-[100px] rounded-full mx-auto"
                />
                <h1 className="font-bold text-xl my-5 text-center capitalize">
                  {user.nama}
                </h1>
                <div className="border p-5 rounded">
                  <p className="text-gray-400 my-1">Alamat:</p>
                  <hr />
                  <p className="my-1">{user.alamat}</p>
                  <p className="text-gray-400 my-1">Email:</p>
                  <hr />
                  <p className="my-1">{user.email}</p>
                  <p className="text-gray-400 my-1">Kontak:</p>
                  <hr />
                  <p className="my-1">{user.no_tlp}</p>
                </div>
              </div>
            </PopOver>
          )}
        </div>
      ) : (
        <h1 className="ml-5">Belum ada kritik masuk</h1>
      )}
    </div>
  );
}

export default Kritik;
