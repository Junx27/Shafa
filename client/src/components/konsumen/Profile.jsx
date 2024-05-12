import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser, reset } from "../../features/AuthSlice.js";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useSelector((state) => state.auth);
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState([]);
  const [nama, setNama] = useState();
  const [email, setEmail] = useState();
  const [alamat, setAlamat] = useState();
  const [password, setPassword] = useState();
  const [no_tlp, setNoTlp] = useState();
  const [msg, setMsg] = useState();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setImage(file);
    }
  };

  const removeImage = () => {
    setPreview(null);
    setImage(null);
  };
  const fetchProfile = async () => {
    const response = await axios.get("http://localhost:5000/me");
    setProfile(response.data);
    setNama(response.data.nama);
    setEmail(response.data.email);
    setPassword(response.data.password);
    setNoTlp(response.data.no_tlp);
    setAlamat(response.data.alamat);
    setImage(response.data.gambar_profile);
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("nama", nama);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("no_tlp", no_tlp);
      formData.append("alamat", alamat);
      formData.append("image", image);

      await axios.patch(
        `http://localhost:5000/users/${profile.uuid}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      window.location.reload();
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  const logout = () => {
    dispatch(logoutUser());
    dispatch(reset());
    navigate("/");
  };
  const cancel = () => {
    window.location.reload();
  };
  return (
    <div className="relative">
      <span
        className="absolute right-0 transition-all duration-1000 hover:text-red-400 material-symbols-outlined cursor-pointer mr-3 mt-3"
        onClick={cancel}
      >
        cancel
      </span>
      <div className="bg-white text-xs">
        <div
          className={`border p-5 rounded-md shadow w-[350px] md:w-64 mx-auto ${
            open ? "hidden" : "block"
          }`}
        >
          <div>
            <div className="flex flex-col mt-5">
              <img
                src={
                  profile.gambar_profil === "belum"
                    ? "http://localhost:5000/images/defaultProfile.png"
                    : profile.gambar_profil
                }
                alt=""
                className="w-32 h-32 rounded-full mx-auto"
              />
            </div>
          </div>
          <div>
            <div>
              <h1 className="text-center font-bold mt-3 mb-5 text-xl capitalize">
                {profile.nama}
              </h1>
              <p className="text-gray-400 my-1">Email :</p>
              <hr />
              <h1 className="font-bold my-2">{profile.email}</h1>
              <p className="text-gray-400 my-1">Alamat :</p>
              <hr />
              <h1 className="font-bold my-2">{profile.alamat}</h1>
              <p className="text-gray-400 my-1">No. Telepon :</p>
              <hr />
              <h1 className="font-bold my-2">{profile.no_tlp}</h1>
            </div>
          </div>
          <button
            className="w-full mt-10 md:mt-0 text-[10px] md:text-xs transition-all duration-1000 bg-black text-white hover:bg-green-400 hover:text-black p-2 rounded shadow text-xs"
            onClick={() => setOpen(!open)}
          >
            Edit
          </button>
          <button
            className="w-full mt-5 bg-green-400 hover:bg-green-300 py-2 px-4 rounded-md shadow text-xs"
            onClick={logout}
          >
            Logout
          </button>
        </div>
        {open && (
          <>
            <div>
              <form
                onSubmit={updateProfile}
                className="w-96 bg-white p-5 rounded-lg relative overflow-auto"
              >
                <div className="text-xs flex justify-between">
                  <h1 className="p-2 text-center bg-green-400 rounded w-32 my-auto shadow">
                    Mengedit profile
                  </h1>
                  <div onClick={() => setOpen(!open)}>
                    <span className="transition-all duration-1000 hover:text-red-400 material-symbols-outlined cursor-pointer">
                      cancel
                    </span>
                  </div>
                </div>
                <img
                  src={preview === null ? profile.gambar_profil : preview}
                  alt=""
                  className="my-2 w-[100px] h-[100px] md:w-[200px] md:h-[200px] object-cover rounded-full mx-auto"
                />
                <div className="my-2">
                  <label htmlFor="gambar">
                    <input
                      type="file"
                      id="gambar"
                      onChange={handleImageChange}
                      className="invisible"
                    />
                    <div className="flex justify-center">
                      <p className="transition-all duration-1000 bg-green-400 p-2 rounded w-20 text-center hover:bg-green-300">
                        {preview ? "Ganti" : "Pilih"}
                      </p>
                      {preview && (
                        <p
                          onClick={removeImage}
                          className="transition-all duration-1000 ml-3 bg-black text-white hover:text-black hover:bg-red-400 py-2 px-5 rounded text-center cursor-pointer"
                        >
                          Hapus
                        </p>
                      )}
                    </div>
                  </label>
                </div>
                <div className="w-full">
                  <div className="flex flex-col mx-auto mt-2">
                    <label htmlFor="nama">Nama</label>
                    <input
                      id="nama"
                      type="text"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      className="mt-3 p-2 rounded border border-green-400 outline-green-400"
                    />
                  </div>
                  <div className="flex flex-col mx-auto mt-2">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-3 p-2 rounded border border-green-400 outline-green-400"
                    />
                  </div>
                  <div className="flex flex-col mx-auto mt-2">
                    <label htmlFor="password">New Password</label>
                    <input
                      id="password"
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-3 p-2 rounded border border-green-400 outline-green-400"
                      placeholder="******"
                    />
                  </div>
                  <div className="flex flex-col mx-auto mt-2">
                    <label htmlFor="noTlp">No. Tlp</label>
                    <input
                      id="noTlp"
                      type="number"
                      value={no_tlp}
                      onChange={(e) => setNoTlp(e.target.value)}
                      className="mt-3 p-2 rounded border border-green-400 outline-green-400"
                    />
                  </div>
                  <div className="flex flex-col mx-auto mt-2">
                    <label htmlFor="alamat">Alamat</label>
                    <textarea
                      name="alamat"
                      id="alamat"
                      className="mt-3 p-2 rounded border border-green-400 outline-green-400 h-16"
                      onChange={(e) => setAlamat(e.target.value)}
                    >
                      {alamat}
                    </textarea>
                  </div>
                  {msg && <p className="text-red-400">{msg}</p>}
                  <div className="flex mt-10">
                    <button
                      className="w-96 transition-all duration-1000 mr-3 bg-black text-white hover:text-black hover:bg-red-400 py-2 px-5 rounded text-center cursor-pointer"
                      onClick={() => window.location.reload()}
                      type="button"
                    >
                      Batal
                    </button>
                    <button
                      className="w-96 transition-all duration-1000 bg-green-400 p-2 rounded w-20 text-center hover:bg-green-300"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
