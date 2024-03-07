import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [nama, setNama] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [alamat, setAlamat] = useState();
  const [no_tlp, setNoTlp] = useState();
  const [gambar_profil, setGambar] = useState();
  const [preview, setPreview] = useState();
  const [msg, setMsg] = useState();

  const navigate = useNavigate();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setGambar(file);
    }
  };

  const removeImage = () => {
    setPreview(null);
    setGambar(null);
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("nama", nama);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("no_tlp", no_tlp);
      formData.append("alamat", alamat);
      formData.append("gambar_profil", gambar_profil);
      await axios.post("http://localhost:5000/users", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/registerberhasil");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
    <div>
      {msg && <p className="text-[10px] text-red-500">{msg}</p>}
      <div className="border p-5 md:p-10 md:mx-auto w-[350px] h-[610px] md:w-[500px] md:h-[730px] bg-white rounded-[20px] shadow-lg">
        <form
          action=""
          className="relative flex flex-col"
          onSubmit={handleRegister}
        >
          <div className="text-xs">
            <div className="grid grid-flow-row auto-rows-max mt-2">
              <label htmlFor="nama">Nama</label>
              <input
                id="nama"
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Masukan nama"
                className="mt-3 p-3 rounded-lg border border-green-400"
                required
              />
            </div>
            <div className="grid grid-flow-row auto-rows-max mt-2">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukan email"
                className="mt-3 p-3 rounded-lg border border-green-400"
                required
              />
            </div>
            <div className="grid grid-flow-row auto-rows-max mt-2">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukan password"
                className="mt-3 p-3 rounded-lg border border-green-400"
                required
              />
            </div>
            <div className="grid grid-flow-row auto-rows-max mt-2">
              <label htmlFor="password">Alamat</label>
              <input
                id="password"
                type="text"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
                placeholder="Masukan alamat"
                className="mt-3 p-3 rounded-lg border border-green-400"
                required
              />
            </div>
            <div className="grid grid-flow-row auto-rows-max mt-2">
              <label htmlFor="noTlp">No. Tlp</label>
              <input
                id="noTlp"
                type="number"
                value={no_tlp}
                onChange={(e) => setNoTlp(e.target.value)}
                placeholder="Masukan nomor telepon"
                className="mt-3 p-3 rounded-lg border border-green-400"
                required
              />
            </div>
          </div>
          <div className="flex justify-center my-2 text-xs">
            <label htmlFor="gambar">
              <input
                type="file"
                id="gambar"
                onChange={handleImageChange}
                className="invisible"
              />
              <div
                className={`bg-gray-100 text-center ml-[70px] md:ml-10 w-[100px] h-[100px] md:w-[150px] md:h-[150px] rounded-full ${
                  preview ? "hidden" : "block"
                }`}
              >
                <span className="mt-9 md:mt-16 material-symbols-outlined">
                  photo_camera
                </span>
                <p className="text-[8px] md:text-xs">Upload gambar</p>
              </div>

              <div className="relative">
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="ml-[70px] md:ml-10 w-[100px] h-[100px] md:w-[150px] md:h-[150px] rounded-full"
                  />
                )}
              </div>
            </label>
            {preview && (
              <p
                onClick={removeImage}
                className="bg-black text-white p-2 rounded absolute bottom-20 right-0 cursor-pointer"
              >
                Hapus
              </p>
            )}
          </div>
          <button
            className="text-xs transition-all duration-1000 bg-green-400 hover:bg-green-300 p-3 rounded-lg mt-2 md:mt-10 shadow"
            type="submit"
          >
            Mendaftar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
