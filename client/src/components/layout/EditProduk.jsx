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
    setImage(null);
    setGambarProduk(null);
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
    <div className="bg-lime-100 w-8/12 rounded-lg z-30 shadow-lg">
      <div className="">
        <div className="flex justify-between">
          <h1 className="pl-5 py-2 bg-lime-400 mr-[60%] rounded-r-lg">
            Mengedit Produk
          </h1>
          <button onClick={() => navigate("/produk")}>
            <span className="material-symbols-outlined bg-red-400 p-2 rounded-b-lg transition ease-in-out duration-1000">
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
          <div className="flex flex-col mx-10">
            <label htmlFor="nama" className="my-2">
              Nama
            </label>
            <input
              type="text"
              id="nama"
              value={nama_produk}
              onChange={(e) => setNamaProduk(e.target.value)}
              className="p-2 rounded-lg outline-lime-400 border border-lime-400"
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
              className="p-2 rounded-lg outline-lime-400 border border-lime-400"
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
              className="p-2 rounded-lg outline-lime-400 border border-lime-400 h-[150px]"
            />
          </div>
          <div className="flex flex-col mx-10">
            <label htmlFor="deskripsi" className="my-2">
              Status
            </label>
            <select
              name="status"
              id="status"
              className="p-2 border border-lime-400 rounded"
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
            >
              <option value="promo">Promo</option>
              <option value="tidak promo">Tidak promo</option>
            </select>
          </div>
          <div>
            {!image && <h1 className="mx-10 my-2">Gambar Lama</h1>}
            <img
              src={gambar_produk}
              alt=""
              className="mx-auto my-2 w-[600px] rounded"
            />
          </div>
          <div className="flex flex-col mx-10 my-2">
            Gambar Baru
            <label htmlFor="gambar">
              <input
                type="file"
                id="gambar"
                onChange={handleImageChange}
                className="invisible"
              />
              <p className="bg-lime-400 p-2 rounded-md w-20 text-center -mt-5 hover:bg-lime-500 hover:text-white">
                {image ? "Ganti" : "Pilih"}
              </p>
            </label>
            <div className="relative">
              {image && (
                <img src={image} alt="Preview" className="mt-5 rounded-lg" />
              )}
              {image && (
                <p
                  onClick={removeImage}
                  className="bg-red-400 py-2 px-5 rounded-b-md text-center absolute top-5 right-0 cursor-pointer"
                >
                  X
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-end mx-10">
            <Link
              className="bg-red-400 p-2 rounded-md mr-5 hover:bg-red-300 hover:text-white"
              to={"/produk"}
            >
              Cancel
            </Link>
            <button
              className="bg-lime-400 p-2 rounded-md hover:bg-lime-500 hover:text-white"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProduk;