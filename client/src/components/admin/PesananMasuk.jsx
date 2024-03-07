import axios from "axios";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useNavigate } from "react-router-dom";

function PesananMasuk() {
  const navigate = useNavigate();
  const [pesanan, setPesanan] = useState([]);
  useEffect(() => {
    const fetchPembayaran = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/pembayaran/sudah"
        );
        setPesanan(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPembayaran();
  }, []);
  const formatRupiah = (number) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2,
    });
    return formatter.format(number);
  };
  const formatIndonesianDate = (date) => {
    return format(new Date(date), "dd MMMM yyyy", {
      locale: id,
    });
  };
  return (
    <div>
      {pesanan.length !== 0 ? (
        <div className="mt-5">
          <p className="text-gray-400 text-xs">
            Konfirmasi pesanan masuk{" "}
            <span className="text-black hover:underline cursor-pointer">
              disini!
            </span>
          </p>
          <div className="mt-5">
            {pesanan.map((row, index) => (
              <div
                key={index}
                className="border transition-all duration-1000 flex flex-col md:flex-row md:justify-between md:w-[450px] rounded-lg shadow hover:shadow-lg p-5 md:items-center mb-5"
              >
                <img
                  src={
                    row.user.gambar_profil === "belum"
                      ? "http://localhost:5000/images/defaultProfile.png"
                      : row.user.gambar_profil
                  }
                  alt=""
                  className="w-16 mx-auto md:mr-5 md:ml-3 rounded-full shadow"
                />
                <div className="flex flex-col mt-10 md:mt-0">
                  <p className="text-xs md:text-md font-bold capitalize">
                    {row.nama}
                  </p>
                  <p className="text-[10px] md:text-xs text-gray-400 my-1">
                    Detail:
                  </p>
                  <hr />
                  <p className="text-[10px] md:text-xs mt-2">
                    {formatIndonesianDate(row.createdAt)}/
                    <span className="font-bold">{formatRupiah(row.total)}</span>
                  </p>
                </div>
                <button
                  className="w-full md:w-20 mt-10 md:mt-0 text-[10px] md:text-xs transition-all duration-1000 bg-black text-white hover:bg-green-400 hover:text-black p-2 rounded shadow text-xs"
                  onClick={() => navigate(`/pesanan/${row.uuid}`)}
                >
                  Lihat
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h1 className="mt-10 text-center text-xs text-gray-400">
          Belum ada pesanan masuk
        </h1>
      )}
    </div>
  );
}

export default PesananMasuk;
