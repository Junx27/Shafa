import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function EditKonsumen() {
  const { id } = useParams();
  const [profile, setProfile] = useState([]);
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alamat, setAlamat] = useState("");
  const [no_tlp, setNoTlp] = useState("");
  const [gambar, setGambar] = useState("");
  const [image, setImage] = useState(null);
  const [open, setOpen] = useState("");
  const [openPopUp, setOpenPopUp] = useState();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
      setGambar(file);
    }
  };

  const openEdit = () => {
    setOpen(true);
  };

  const cancel = () => {
    setOpen(false);
    setImage(null);
    setGambar(null);
  };

  const openDelete = () => {
    setOpenPopUp(true);
  };
  const closeDelete = () => {
    setOpenPopUp(false);
  };
  const fetchProfile = async () => {
    const response = await axios.get(`http://localhost:5000/users/${id}`);
    setProfile(response.data);
    setNama(response.data.nama);
    setEmail(response.data.email);
    setAlamat(response.data.alamat);
    setNoTlp(response.data.no_tlp);
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
      formData.append("alamat", alamat);
      formData.append("no_tlp", no_tlp);
      formData.append("gambar_profil", gambar);

      await axios.patch(`http://localhost:5000/users/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate(`/konsumen/${id}`);
      window.location.reload();
    } catch (error) {
      if (error.response) {
        console.error("Gagal memperbarui data:", error);
      }
    }
  };

  const deleteKonsumen = async () => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      navigate("/konsumen");
    } catch (error) {
      if (error.response) {
        console.error("Gagal", error);
      }
    }
  };

  return (
    <div>
      <div className="mt-10 ms-80 pl-6 mr-10">
        <div className="relative flex flex-row mx-20 py-10 border border-lime-400 rounded-lg shadow transition-all duration-1000 hover:shadow-lg">
          <div className="">
            <img
              src={
                profile.gambar_profil === "belum"
                  ? "http://localhost:5000/images/defaultProfile.png"
                  : profile.gambar_profil
              }
              alt=""
              className="w-96 w-96 rounded-full p-20"
            />
          </div>
          <div className="mt-10 ml-32 ">
            <h1 className="font-bold text-2xl capitalize">{profile.nama}</h1>
            <hr className="h-px border-0 bg-lime-400 mt-3" />
            <div className="mt-5 flex flex-col">
              <label htmlFor="" className="font-light text-gray-500 mr-20">
                Email
              </label>
              <p className="mt-2">{profile.email}</p>
            </div>
            <div className="mt-3 flex flex-col">
              <label htmlFor="" className="font-light text-gray-500 mr-20">
                Alamat
              </label>
              <p className="mt-2">{profile.alamat}</p>
            </div>
            <div className="mt-3 flex flex-col">
              <label htmlFor="" className="font-light text-gray-500 mr-20">
                No. Tlp
              </label>
              <p className="mt-2">{profile.no_tlp}</p>
            </div>
            <div className="absolute bottom-10 right-10">
              <button
                className="bg-lime-300 py-3 px-5 rounded hover:bg-lime-400"
                onClick={openEdit}
              >
                Edit
              </button>
              <button
                className="bg-red-400 py-3 px-5 rounded ml-5 hover:bg-red-500"
                onClick={openDelete}
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
        {open && (
          <form
            onSubmit={updateProfile}
            className="relative -mt-[467px] bg-white flex flex-row mx-20 py-10 border border-lime-400 rounded-lg shadow transition-all duration-1000 hover:shadow-lg"
          >
            <div className="flex flex-col mx-10">
              <label htmlFor="gambar">
                <input
                  type="file"
                  id="gambar"
                  onChange={handleImageChange}
                  className="invisible"
                />
                <p className="bg-lime-400 p-2 rounded-md w-20 text-center -mt-5 hover:bg-lime-500 hover:text-white mb-5">
                  {image ? "Ganti" : "Pilih"}
                </p>
              </label>
              <div className="relative">
                {image && (
                  <img
                    src={image}
                    alt="Preview"
                    className="mt-5 rounded-lg w-96"
                  />
                )}
              </div>
            </div>
            <div className="ml-32 -mt-5">
              <div className="flex flex-col">
                <label
                  htmlFor="nama"
                  className="font-light text-gray-500 mr-20"
                >
                  Nama
                </label>
                <input
                  id="nama"
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className=" mt-2 p-2 border border-lime-400 rounded"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="font-light text-gray-500 mr-20 mt-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className=" mt-2 p-2 border border-lime-400 rounded"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="password"
                  className="font-light text-gray-500 mr-20 mt-2"
                >
                  New Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className=" mt-2 p-2 border border-lime-400 rounded"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="alamat"
                  className="font-light text-gray-500 mr-20 mt-2"
                >
                  Alamat
                </label>
                <input
                  id="alamat"
                  type="text"
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                  className=" mt-2 p-2 border border-lime-400 rounded"
                />
              </div>
              <div className="flex flex-col pb-5">
                <label
                  htmlFor="noTlp"
                  className="font-light text-gray-500 mr-20 mt-2"
                >
                  No. Tlp
                </label>
                <input
                  id="noTlp"
                  type="number"
                  value={no_tlp}
                  onChange={(e) => setNoTlp(e.target.value)}
                  className=" mt-2 p-2 border border-lime-400 rounded"
                />
              </div>
              <div className="absolute bottom-10 right-10">
                <button
                  className="bg-lime-300 py-2 px-3 rounded hover:bg-lime-400"
                  type="submit"
                >
                  Submit
                </button>
              </div>
              <div className="absolute top-0 right-0">
                <div
                  className="bg-red-400 py-2 px-3 rounded-b-md hover:bg-red-500"
                  onClick={cancel}
                  type="button"
                >
                  <span className="material-symbols-outlined">close</span>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>

      <div
        className={`absolute top-32 left-[40%] ${
          openPopUp ? "visible" : "invisible"
        }`}
      >
        <div className="bg-lime-50 mx-auto w-96">
          <p className="text-center p-10">
            Apa anda ingin menghapus akun ini, semua data akan dihapus dari
            sistem ini!
          </p>
          <div className="flex justify-end pb-5">
            <button
              className="bg-red-400 hover:bg-red-500 p-2 rounded w-20"
              onClick={closeDelete}
            >
              Tidak
            </button>
            <button
              className="bg-lime-400 hover:bg-lime-500 p-2 rounded w-20 mx-5"
              onClick={deleteKonsumen}
            >
              ya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditKonsumen;
