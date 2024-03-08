import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function CreateProduk() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [nama_produk, setNamaProduk] = useState("");
  const [harga_produk, setHargaProduk] = useState("");
  const [deskripsi_produk, setDeskripsiProduk] = useState("");
  const [gambar_produk, setGambarProduk] = useState(null);
  const [promo, setPromo] = useState("tidak promo");
  const [msg, setMsg] = useState("");
  const { id } = useParams();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
      setGambarProduk(file);
    }
  };

  const removeImage = () => {
    window.location.reload();
  };
  useEffect(() => {
    const getProdukByTd = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/produk/${id}`);
        setNamaProduk(response.data.nama_produk);
        setHargaProduk(response.data.harga_produk);
        setDeskripsiProduk(response.data.deskripsi_produk);
        setGambarProduk(response.data.gambar_produk);
        setPromo(response.data.status_produk);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getProdukByTd();
  }, [id]);

  const updateProduk = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("nama_produk", nama_produk);
      formData.append("harga_produk", harga_produk);
      formData.append("deskripsi_produk", deskripsi_produk);
      formData.append("gambar_produk", gambar_produk);
      formData.append("status_produk", promo);

      await axios.patch(`http://localhost:5000/produk/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/produk");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      } else {
        console.error("Gagal memperbarui data:", error);
      }
    }
  };
  return (
    <div className="mt-10 w-full border rounded-lg z-30 shadow-lg">
      <div className="">
        <div className="mx-5 mt-5 text-xs flex justify-between">
          <h1 className="p-2 text-center bg-green-400 rounded w-32 my-auto shadow">
            Mengedit Produk
          </h1>
          <button onClick={() => navigate("/produk")}>
            <span className="material-symbols-outlined cursor-pointer">
              cancel
            </span>
          </button>
        </div>
        {msg && (
          <div className="relative">
            <p className=" mt-2 px-5 py-5 bg-red-300">
              Menambahkan produk gagal, mungkin kesalahan pada nama, nama tidak
              boleh sama dengan yang sudah ada!
              <button
                className="rounded-b-md absolute top-0 right-0"
                onClick={() => navigate("/produk")}
              >
                <span className="material-symbols-outlined text-white cursor-pointer">
                  disabled_by_default
                </span>
              </button>
            </p>
          </div>
        )}
        <form onSubmit={updateProduk} className="pb-10 py-5">
          <div className="flex flex-row">
            <div className="w-full text-xs">
              <div className="flex flex-col mx-10">
                <label htmlFor="nama" className="my-2">
                  Nama
                </label>
                <input
                  type="text"
                  id="nama"
                  value={nama_produk}
                  onChange={(e) => setNamaProduk(e.target.value)}
                  className="p-2 rounded outline-green-400 border border-green-400"
                />
              </div>
              <div className="flex flex-col mx-10">
                <label htmlFor="harga" className="my-2">
                  Harga
                </label>
                <input
                  type="number"
                  min={20000}
                  value={harga_produk}
                  onChange={(e) => setHargaProduk(e.target.value)}
                  id="harga"
                  className="p-2 rounded outline-green-400 border border-green-400"
                />
              </div>
              <div className="flex flex-col mx-10">
                <label htmlFor="deskripsi" className="my-2">
                  Deskripsi
                </label>
                <textarea
                  type="text"
                  id="deskripsi"
                  maxLength={220}
                  value={deskripsi_produk}
                  onChange={(e) => setDeskripsiProduk(e.target.value)}
                  className="p-2 rounded outline-green-400 border border-green-400 h-[150px]"
                />
              </div>
              <div className="flex flex-col mx-10">
                <label htmlFor="deskripsi" className="my-2">
                  Status
                </label>
                <select
                  name="status"
                  id="status"
                  className="p-2 border border-green-400 rounded"
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                >
                  <option value="promo">Promo</option>
                  <option value="tidak promo">Tidak promo</option>
                </select>
              </div>
            </div>
            <div className="text-xs w-full mr-10">
              <div className="relative">
                <img
                  src={image === null ? gambar_produk : image}
                  alt=""
                  className="mx-auto my-2 w-[600px] h-[400px] object-cover rounded"
                />
                <div className="">
                  {image && (
                    <p
                      onClick={removeImage}
                      className="absolute top-2 right-2 cursor-pointer text-sm"
                    >
                      X
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col my-2">
                <label htmlFor="gambar">
                  <input
                    type="file"
                    id="gambar"
                    onChange={handleImageChange}
                    className="invisible"
                  />
                  <p className="transition-all duration-1000 bg-green-400 p-2 rounded-md w-20 text-center -mt-5 hover:bg-green-300">
                    {image ? "Ganti" : "Pilih"}
                  </p>
                </label>
              </div>
              <div className="flex justify-end">
                <Link
                  className="w-20 text-center transition-all duration-1000 bg-black text-white p-2 rounded-md mr-5 hover:bg-green-400 hover:text-black"
                  to={"/produk"}
                >
                  Batal
                </Link>
                <button
                  className="w-20 text-center transition-all duration-1000 bg-green-400 p-2 rounded-md hover:bg-green-300"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProduk;
