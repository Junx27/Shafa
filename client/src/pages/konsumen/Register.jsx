import axios from "axios";
import { useEffect, useState } from "react";
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
      navigate("/");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
    <div>
      <button
        className={
          changeColor
            ? "sticky top-5 left-5 z-20 bg-lime-300 hover:bg-lime-400 p-2 rounded-md transition duration-1000"
            : "sticky top-5 left-5 z-20 bg-white p-2 rounded-md hover:bg-lime-200 hover:p-2 hover:rounded-md"
        }
        onClick={() => navigate("/")}
      >
        <div className="flex intems-center">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          <p className="text-sm">Kembali</p>
        </div>
      </button>
      <hr className="h-px border-0 bg-lime-400 mx-32" />
      <div className=" flex justify-center mx-auto w-32">
        <h1 className="font-bold text-3xl text-center bg-lime-400 p-4 rounded-b-lg shadow-lg">
          Registration
        </h1>
      </div>
      <p className="text-center mt-5">
        Silahkan mendaftar untuk dapat menggunakan aplikasi Shafa Farm
        Hidroponik <br />
        dapatkan kemudahan menemukan produk berkualitas.
      </p>
      {msg && <p className="text-red-500">{msg}</p>}
      <div className="mt-10 bg-lime-50 p-10 pb-20 rounded-lg relative mx-32 shadow-lg">
        <form action="" className="flex flex-row " onSubmit={handleRegister}>
          <div className="w-96">
            <div className="grid grid-flow-row auto-rows-max mt-2">
              <label htmlFor="nama">Nama</label>
              <input
                id="nama"
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="mt-3 p-2 rounded-lg border border-lime-500"
              />
            </div>
            <div className="grid grid-flow-row auto-rows-max mt-2">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-3 p-2 rounded-lg border border-lime-500"
              />
            </div>
            <div className="grid grid-flow-row auto-rows-max mt-2">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-3 p-2 rounded-lg border border-lime-500"
              />
            </div>
            <div className="grid grid-flow-row auto-rows-max mt-2">
              <label htmlFor="password">Alamat</label>
              <input
                id="password"
                type="text"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
                className="mt-3 p-2 rounded-lg border border-lime-500"
              />
            </div>
            <div className="grid grid-flow-row auto-rows-max mt-2">
              <label htmlFor="noTlp">No. Tlp</label>
              <input
                id="noTlp"
                type="number"
                value={no_tlp}
                onChange={(e) => setNoTlp(e.target.value)}
                className="mt-3 p-2 rounded-lg border border-lime-500"
              />
            </div>
          </div>
          <div className="w-96 mx-32">
            <div className="flex flex-col my-2">
              Gambar
              <label htmlFor="gambar">
                <input
                  type="file"
                  id="gambar"
                  onChange={handleImageChange}
                  className="invisible"
                />
                <p className="bg-lime-400 p-2 rounded-md w-20 text-center -mt-5 hover:bg-lime-500 hover:text-white">
                  {preview ? "Ganti" : "Pilih"}
                </p>
              </label>
              <div className="relative">
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="mt-5 mx-20 rounded-lg w-[500px] h-[300px]"
                  />
                )}
                {preview && (
                  <p
                    onClick={removeImage}
                    className="bg-red-400 py-2 px-5 rounded-b-md text-center absolute top-5 -right-20 cursor-pointer"
                  >
                    X
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-end mt-10 absolute right-32 bottom-10">
              <button
                className="bg-lime-300 p-2 rounded hover:bg-lime-400"
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
