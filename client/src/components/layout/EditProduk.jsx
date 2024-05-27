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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="mt-10 w-full h-full md:h-auto md:w-[800px] bg-white border rounded-lg z-30 shadow-lg overflow-auto">
        <div className="">
          <div className="fixed w-[388px] bg-white -top-1 rounded px-5 py-5 md:relative md:top-0 md:w-full text-xs flex justify-between">
            <h1 className="p-2 text-center bg-green-400 rounded w-32 my-auto shadow">
              Mengedit Produk
            </h1>
            <button onClick={() => navigate("/produk")}>
              <span className="transition-all duration-1000 hover:text-red-400 material-symbols-outlined cursor-pointer">
                cancel
              </span>
            </button>
          </div>
          {msg && (
            <div className="relative">
              <p className=" mt-2 px-5 py-5 bg-red-300">
                Menambahkan produk gagal, mungkin kesalahan pada nama, nama
                tidak boleh sama dengan yang sudah ada!
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
          <form
            onSubmit={updateProduk}
            className="mt-5 pb-10 py-5 overflow-hidden"
          >
            <div className="flex flex-col md:flex-row">
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
                    className="p-2 border border-green-400 rounded outline-green-400"
                    value={promo}
                    onChange={(e) => setPromo(e.target.value)}
                  >
                    <option value="promo">Promo</option>
                    <option value="tidak promo">Tidak promo</option>
                  </select>
                </div>
              </div>
              <div className="text-xs w-full mx-10 mr-0 md:mr-10">
                <div className="flex my-2">
                  <label htmlFor="gambar">
                    <input
                      type="file"
                      id="gambar"
                      onChange={handleImageChange}
                      className="invisible"
                    />
                    <p className="transition-all duration-1000 bg-green-400 p-2 rounded w-20 text-center -mt-5 hover:bg-green-300">
                      {image ? "Ganti" : "Pilih"}
                    </p>
                  </label>
                  {image && (
                    <button
                      className="w-20 -ml-[160px] transition-all duration-1000 bg-black text-white hover:text-black hover:bg-red-400 py-2 px-5 rounded text-center cursor-pointer"
                      onClick={() => window.location.reload()}
                      type="button"
                    >
                      Hapus
                    </button>
                  )}
                </div>
                <div className="relative">
                  <img
                    src={image === null ? gambar_produk : image}
                    alt=""
                    className="md:mx-auto my-2 w-[300px] h-[200px] md:w-[600px] md:h-[400px] object-cover rounded"
                  />
                </div>
                <div className="flex overflow-auto mr-20 md:mr-0 my-5">
                  <Link
                    className="w-full text-center transition-all duration-1000 bg-black text-white p-2 rounded mr-5 hover:bg-red-400 hover:text-black"
                    to={"/produk"}
                  >
                    Batal
                  </Link>
                  <button
                    className="w-full text-center transition-all duration-1000 bg-green-400 p-2 rounded hover:bg-green-300"
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
    </div>
  );
}

export default CreateProduk;
