import axios from "axios";
import { useState } from "react";

function CreateProduk() {
  const [image, setImage] = useState(null);
  const [nama_produk, setNamaProduk] = useState("");
  const [harga_produk, setHargaProduk] = useState("");
  const [deskripsi_produk, setDeskripsiProduk] = useState("");
  const [gambar_produk, setGambarProduk] = useState(null);
  const [promo, setPromo] = useState("tidak promo");
  const [msg, setMsg] = useState("");

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
  };

  const cancel = () => {
    window.location.reload();
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("nama_produk", nama_produk);
      formData.append("harga_produk", harga_produk);
      formData.append("deskripsi_produk", deskripsi_produk);
      formData.append("gambar_produk", gambar_produk);
      formData.append("status_produk", promo);

      await axios.post("http://localhost:5000/produk", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      window.location.reload();
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div className="bg-white w-[500px] ml-64 rounded-lg z-30">
      <div className="text-xs">
        <div className="flex justify-between items-center">
          <h1 className="p-2 ml-3 mt-3 bg-green-400 rounded shadow">
            Menambahkan produk
          </h1>
          <span
            className="material-symbols-outlined cursor-pointer mr-3 mt-3"
            onClick={cancel}
          >
            cancel
          </span>
        </div>
        {msg && (
          <div className="relative">
            <p className=" mt-2 px-5 py-5 bg-red-400">
              Menambahkan produk gagal, mungkin kesalahan pada nama, nama tidak
              boleh sama dengan yang sudah ada!
              <button
                className="rounded-b-md absolute top-0 right-0"
                onClick={cancel}
              >
                <span className="material-symbols-outlined text-white cursor-pointer">
                  disabled_by_default
                </span>
              </button>
            </p>
          </div>
        )}
        <form onSubmit={saveProduct} className="pb-10 py-5">
          <div className="flex flex-col mx-10">
            <label htmlFor="nama" className="my-2">
              Nama
            </label>
            <input
              type="text"
              id="nama"
              value={nama_produk}
              onChange={(e) => setNamaProduk(e.target.value)}
              className="p-2 rounded-lg outline-green-400 border border-green-400"
              required
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
              className="p-2 rounded-lg outline-green-400 border border-green-400"
              required
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
              className="p-2 rounded-lg outline-green-400 border border-green-400 h-[150px]"
              required
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
          <div className="flex flex-col mx-10 my-2">
            Gambar
            <label htmlFor="gambar">
              <input
                type="file"
                id="gambar"
                onChange={handleImageChange}
                className="invisible"
              />
              <p className="text-xs bg-green-400 p-2 rounded-md w-20 text-center -mt-5 hover:bg-green-300">
                {image ? "Ganti" : "Pilih"}
              </p>
            </label>
            <div className="relative">
              {image && (
                <img
                  src={image}
                  alt="Preview"
                  className="mt-5 rounded-lg w-[500px] h-[200px] object-cover"
                />
              )}
              {image && (
                <p
                  onClick={removeImage}
                  className="text-xs bg-black text-white py-2 px-5 rounded text-center absolute -top-8 left-24 cursor-pointer"
                >
                  Hapus
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-end mx-10">
            <button
              className="transition-all duration-1000 text-xs bg-black text-white p-2 rounded-md mr-5 hover:bg-green-400 hover:text-black"
              type="button"
              onClick={cancel}
            >
              Cancel
            </button>
            <button
              className="transition-all duration-1000 text-xs bg-green-400 p-2 rounded-md hover:bg-green-300"
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
