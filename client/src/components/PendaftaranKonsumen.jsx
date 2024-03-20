import axios from "axios";
import { useEffect, useState } from "react";
import Empty from "./animate/Empty";

function PendaftaranKonsumen() {
  const status = "terdaftar";
  const [dataKonsumen, setData] = useState([]);
  const fetchData = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setData(response.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const updateProfile = async (e, id) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("status_konsumen", status);
      await axios.patch(`http://localhost:5000/users/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      window.location.reload();
    } catch (error) {
      if (error.response) {
        console.error("Gagal memperbarui data:", error);
      }
    }
  };
  return (
    <div className="mt-5">
      {dataKonsumen.filter((row) => row.status_konsumen === "belum").length !==
      0 ? (
        <div>
          {dataKonsumen
            .filter((row) => row.status_konsumen === "belum")
            .map((row, index) => (
              <div className="my-3" key={index}>
                <div className="transition-all duration-1000 rounded-lg  flex justify-between items-center py-2 shadow hover:shadow-lg border">
                  <img
                    src={
                      row.gambar_profil === "belum"
                        ? "http://localhost:5000/images/defaultProfile.png"
                        : row.gambar_profil
                    }
                    alt=""
                    className="w-16 mr-5 ml-3 rounded-full"
                  />
                  <h1 className="basis-1/2 text-sm font-bold capitalize">
                    {row.nama}
                  </h1>
                  <form action="" onSubmit={(e) => updateProfile(e, row.uuid)}>
                    <button
                      className="text-xs basis-1/4 bg-green-400 p-2 rounded mr-5 hover:bg-green-300 shadow"
                      type="submit"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="border rounded-lg shadow my-5">
          <h1 className="text-gray-400 text-xs p-5">
            Belum ada konsumen baru masuk
          </h1>
          <Empty />
        </div>
      )}
    </div>
  );
}

export default PendaftaranKonsumen;
