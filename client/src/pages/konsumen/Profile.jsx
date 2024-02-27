import Navbar from "../../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { meUser } from "../../features/AuthSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../components/Footer";
import LoadingSpinner from "../../components/layout/Loading";

function Profile() {
  const [id, setId] = useState();
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const startLoading = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };
    startLoading();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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
    scrollToTop();
  };

  const cancel = () => {
    setOpen(false);
    setImage(null);
    setGambar(null);
  };

  const openDelete = () => {
    setOpenPopUp(true);
    scrollToTop();
  };
  const closeDelete = () => {
    setOpenPopUp(false);
  };
  const fetchProfile = async () => {
    const response = await axios.get("http://localhost:5000/me");
    setProfile(response.data);
    setNama(response.data.nama);
    setEmail(response.data.email);
    setAlamat(response.data.alamat);
    setNoTlp(response.data.no_tlp);
    setId(response.data.uuid);
  };
  useEffect(() => {
    dispatch(meUser());
    fetchProfile();
  }, [dispatch]);
  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);
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
      navigate("/profile");
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
      navigate("/");
    } catch (error) {
      if (error.response) {
        console.error("Gagal", error);
      }
    }
  };
  // eslint-disable-next-line react/prop-types
  const Popover = ({ children }) => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div>{children}</div>
      </div>
    );
  };
  return (
    <div>
      {loading ? (
        <div className="mx-[45%] md:mx-[50%] my-[80%] md:my-[20%]">
          <LoadingSpinner />
          <p className="text-lime-400 text-xs mt-5">Loading...</p>
        </div>
      ) : (
        <div>
          <div>
            <Navbar />
          </div>
          <div className="m-20 mt-32">
            <div className="flex ml-20 bg-lime-400 p-2 rounded w-64 shadow">
              <span className="material-symbols-outlined">manage_accounts</span>
              <h1 className="ml-5">Informasi profil pengguna</h1>
            </div>
            {!open && (
              <div className="w-[600px] h-[700px] mt-10 relative flex flex-col mx-auto rounded-lg shadow transition-all duration-1000 hover:shadow-lg">
                <div className="">
                  <div className="bg-lime-400 w-full h-[150px] absolute z-0 rounded-t-lg shadow"></div>
                  <img
                    src={
                      profile.gambar_profil === "belum"
                        ? "http://localhost:5000/images/defaultProfile.png"
                        : profile.gambar_profil
                    }
                    alt=""
                    className="relative w-[200px] w-[200px] rounded-full mx-auto mt-10 shadow z-10"
                  />
                </div>
                <div className="mt-5 mx-16">
                  <h1 className="font-bold text-2xl text-center capitalize">
                    {profile.nama}
                  </h1>
                  <hr className="h-px border-0 bg-lime-400 mt-3" />
                  <div className="mt-5 flex flex-col">
                    <label
                      htmlFor=""
                      className="font-light text-gray-500 mr-20"
                    >
                      Email
                    </label>
                    <p className="mt-2">{profile.email}</p>
                  </div>
                  <div className="mt-3 flex flex-col">
                    <label
                      htmlFor=""
                      className="font-light text-gray-500 mr-20"
                    >
                      Alamat
                    </label>
                    <p className="mt-2">{profile.alamat}</p>
                  </div>
                  <div className="mt-3 flex flex-col">
                    <label
                      htmlFor=""
                      className="font-light text-gray-500 mr-20"
                    >
                      No. Tlp
                    </label>
                    <p className="mt-2">{profile.no_tlp}</p>
                  </div>
                  <div className="absolute bottom-10 right-10 text-xs">
                    <button
                      className="transition-all duration-1000 bg-lime-300 w-20 p-2 rounded hover:bg-lime-400"
                      onClick={openEdit}
                    >
                      Edit
                    </button>
                    <button
                      className="transition-all duration-1000 bg-black text-white hover:text-black hover:bg-lime-400 w-20 p-2 rounded ml-5"
                      onClick={openDelete}
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            )}
            {open && (
              <form
                onSubmit={updateProfile}
                className="w-[600px] h-[750px] mt-10 relative flex flex-col mx-auto rounded-lg shadow transition-all duration-1000 hover:shadow-lg"
              >
                <div className="flex flex-col mx-10">
                  <img
                    src={
                      profile.gambar_profil === "belum"
                        ? "http://localhost:5000/images/defaultProfile.png"
                        : profile.gambar_profil
                    }
                    alt=""
                    className={`relative w-[200px] w-[200px] rounded-full mx-auto mt-10 shadow z-10 ${
                      image ? "invisible" : "visible"
                    }`}
                  />
                  <div className="">
                    {image && (
                      <img
                        src={image}
                        alt="Preview"
                        className="absolute top-0 right-[33%] w-[200px] w-[200px] rounded-full mx-auto mt-10 shadow z-10"
                      />
                    )}
                  </div>
                  <label htmlFor="gambar" className="flex justify-end text-xs">
                    <input
                      type="file"
                      id="gambar"
                      onChange={handleImageChange}
                      className="invisible"
                    />
                    <p className="transition-all duration-1000 bg-lime-400 p-2 rounded-md w-20 text-center -mt-5 hover:bg-lime-500 hover:text-white mb-5">
                      {image ? "Ganti" : "Pilih"}
                    </p>
                  </label>
                </div>
                <div className="mx-16">
                  <div className="flex flex-col">
                    <label
                      htmlFor="nama"
                      className="font-light text-gray-500 mr-20 text-xs"
                    >
                      Nama
                    </label>
                    <hr className="h-px border-0 bg-lime-200 my-3" />
                    <input
                      id="nama"
                      type="text"
                      value={nama}
                      maxLength={15}
                      onChange={(e) => setNama(e.target.value)}
                      className="border-0 outline-none"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="email"
                      className="font-light text-gray-500 mr-20 mt-2 text-xs"
                    >
                      Email
                    </label>
                    <hr className="h-px border-0 bg-lime-200 my-3" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-0 outline-none"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="password"
                      className="font-light text-gray-500 mr-20 mt-2 text-xs"
                    >
                      New Password
                    </label>
                    <hr className="h-px border-0 bg-lime-200 my-3" />
                    <input
                      id="password"
                      type="password"
                      value={password}
                      placeholder="******"
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-0 outline-none"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="alamat"
                      className="font-light text-gray-500 mr-20 mt-2 text-xs"
                    >
                      Alamat
                    </label>
                    <hr className="h-px border-0 bg-lime-200 my-3" />
                    <textarea
                      id="alamat"
                      type="text"
                      value={alamat}
                      onChange={(e) => setAlamat(e.target.value)}
                      className="border-0 outline-none"
                    />
                  </div>
                  <div className="flex flex-col pb-5">
                    <label
                      htmlFor="noTlp"
                      className="font-light text-gray-500 mr-20 mt-2 text-xs"
                    >
                      No. Tlp
                    </label>
                    <hr className="h-px border-0 bg-lime-200 my-3" />
                    <input
                      id="noTlp"
                      type="number"
                      value={no_tlp}
                      onChange={(e) => setNoTlp(e.target.value)}
                      className="border-0 outline-none"
                    />
                  </div>
                  <div className="absolute bottom-10 right-10">
                    <button
                      className="transition-all duration-1000 bg-lime-300 py-2 px-3 rounded hover:bg-lime-400 text-xs"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                  <div className="absolute top-0 right-0">
                    <div
                      className="transition-all duration-1000 hover:bg-black hover:text-white p-1 mt-1 rounded cursor-pointer"
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
          <div>
            {openPopUp && (
              <Popover onClose={openDelete}>
                <div
                  className={`absolute top-32 left-[40%] z-20 ${
                    openPopUp ? "visible" : "invisible"
                  }`}
                >
                  <div className="bg-white rounded-lg border shadow-lg mx-auto w-96">
                    <p className="text-center p-10">
                      Apa anda ingin menghapus akun ini, semua data akan dihapus
                      dari sistem ini!
                    </p>
                    <div className="flex justify-end pb-5 text-xs">
                      <button
                        className=" bg-black text-white hover:text-black hover:bg-lime-400 p-2 rounded w-20"
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
              </Popover>
            )}
          </div>
          <div>
            <Footer />
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
