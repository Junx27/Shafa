import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { meUser } from "../../features/AuthSlice";
import { Suspense, lazy, useEffect, useState } from "react";
import axios from "axios";
import { animated, useSpring } from "react-spring";
import LoadingSpinner from "../../components/animate/Loading";
import PopOver from "../../components/layout/PopOver";

const Navbar = lazy(() => import("../../components/Navbar"));
const Footer = lazy(() => import("../../components/Footer"));

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
      }, 800);
    };
    startLoading();
  }, []);
  const animation = useSpring({
    opacity: loading ? 0 : 1,
    marginTop: loading ? -10 : 0,
  });

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
      <Suspense fallback={<div></div>}>
        <div>
          <Navbar />
        </div>
        {loading ? (
          <div className="w-[100%] h-[800px]">
            <div className="flex justify-center mt-64">
              <LoadingSpinner />
            </div>
          </div>
        ) : (
          <animated.div style={animation}>
            <div className="mx-5 mt-32 md:m-32">
              <div className="text-[10px] md:text-xs flex mb-5 bg-green-400 p-2 rounded w-[150px] md:w-64 shadow items-center">
                <span className="text-[10px] md:text-xs material-symbols-outlined">
                  manage_accounts
                </span>
                <h1 className=" ml-2 md:ml-3">Informasi profil</h1>
              </div>
              <div className="h-[500px] mb-5 md:w-[600px] md:h-[700px] mt-10 relative flex flex-col md:mx-auto rounded-[20px] shadow transition-all duration-1000 hover:shadow-lg">
                <div className="">
                  <div className="w-full h-[310px] absolute z-0 rounded-t-[20px] shadow"></div>
                  <img
                    src={
                      profile.gambar_profil === "belum"
                        ? "defaultProfile.png"
                        : profile.gambar_profil
                    }
                    alt=""
                    className="relative w-[100px] h-[100px] md:w-[200px] md:h-[200px] rounded-full mx-auto mt-10 shadow z-10"
                  />
                </div>
                <div className="mt-3 mx-16 z-10">
                  <h1 className="font-bold md:text-2xl text-center capitalize">
                    {profile.nama}
                  </h1>
                  <div className="absolute w-full md:w-[600px] left-0 px-6 mt-3 bg-white rounded-t-[20px] border-t">
                    <div className="text-xs mt-5 flex flex-col">
                      <p className="font-light text-gray-500 mr-20">Email</p>
                      <p className="mt-2">{profile.email}</p>
                    </div>
                    <div className="text-xs mt-3 flex flex-col">
                      <p className="font-light text-gray-500 mr-20">Alamat</p>
                      <p className="mt-2">{profile.alamat}</p>
                    </div>
                    <div className="text-xs mt-3 flex flex-col">
                      <p className="font-light text-gray-500 mr-20">No. Tlp</p>
                      <p className="mt-2">{profile.no_tlp}</p>
                    </div>
                  </div>
                  <div className="absolute bottom-10 right-20 md:right-10 text-xs">
                    <button
                      className="transition-all duration-1000 bg-black text-white hover:text-black hover:bg-red-400 w-20 p-2 rounded mr-5"
                      onClick={openDelete}
                    >
                      Hapus
                    </button>
                    <button
                      className="transition-all duration-1000 bg-green-400 w-20 p-2 rounded hover:bg-green-300"
                      onClick={openEdit}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
              {open && (
                <PopOver>
                  <form
                    onSubmit={updateProfile}
                    className="bg-white w-[400px] md:w-[500px] md:h-[750px] relative flex flex-col mx-auto rounded-[20px] shadow-lg transition-all duration-1000 hover:shadow-lg pb-5"
                  >
                    <div className="flex flex-col mx-5">
                      <img
                        src={
                          profile.gambar_profil === "belum"
                            ? "defaultProfile.png"
                            : profile.gambar_profil
                        }
                        alt=""
                        className={`relative w-[200px] rounded-full mx-auto mt-10 md:mt-5 shadow z-10 ${
                          image ? "invisible" : "visible"
                        }`}
                      />
                      <div className="">
                        {image && (
                          <img
                            src={image}
                            alt="Preview"
                            className="absolute top-0 right-[28%] md:right-[33%] md:w-[200px] h-[200px] rounded-full mx-auto mt-10 shadow z-10"
                          />
                        )}
                      </div>
                      <label htmlFor="gambar" className="text-xs">
                        <input
                          type="file"
                          id="gambar"
                          onChange={handleImageChange}
                          className="invisible"
                        />
                        <div className="flex justify-center mt-5">
                          <p className="transition-all duration-1000 bg-green-400 p-2 rounded-md w-20 text-center -mt-5 hover:bg-green-300 mb-5">
                            {image ? "Ganti" : "Pilih"}
                          </p>
                        </div>
                      </label>
                    </div>
                    <div className="bg-white rounded-lg mx-10">
                      <div className="flex flex-col">
                        <label
                          htmlFor="nama"
                          className="font-light text-gray-500 mr-20 text-xs"
                        >
                          Nama
                        </label>
                        <input
                          id="nama"
                          type="text"
                          value={nama}
                          maxLength={15}
                          onChange={(e) => setNama(e.target.value)}
                          className="text-xs my-2 p-2 rounded border border-green-400 outline-green-400"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="email"
                          className="font-light text-gray-500 mr-20 mt-2 text-xs"
                        >
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="text-xs my-2 p-2 rounded border border-green-400 outline-green-400"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="password"
                          className="font-light text-gray-500 mr-20 mt-2 text-xs"
                        >
                          New Password
                        </label>
                        <input
                          id="password"
                          type="password"
                          value={password}
                          placeholder="******"
                          onChange={(e) => setPassword(e.target.value)}
                          className="text-xs my-2 p-2 rounded border border-green-400 outline-green-400"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="alamat"
                          className="font-light text-gray-500 mr-20 mt-2 text-xs"
                        >
                          Alamat
                        </label>
                        <textarea
                          id="alamat"
                          type="text"
                          value={alamat}
                          onChange={(e) => setAlamat(e.target.value)}
                          className="text-xs my-2 p-2 rounded border border-green-400 outline-green-400"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="noTlp"
                          className="font-light text-gray-500 mr-20 mt-2 text-xs"
                        >
                          No. Tlp
                        </label>
                        <input
                          id="noTlp"
                          type="number"
                          value={no_tlp}
                          onChange={(e) => setNoTlp(e.target.value)}
                          className="text-xs my-2 p-2 rounded border border-green-400 outline-green-400"
                        />
                      </div>
                      <div className="flex justify-center mt-5">
                        <button
                          className="w-full transition-all duration-1000 bg-black text-white py-2 rounded hover:bg-red-400 hover:text-black text-xs mr-5"
                          type="button"
                        >
                          Batal
                        </button>
                        <button
                          className="w-full transition-all duration-1000 bg-green-400 py-2 rounded hover:bg-green-300 text-xs"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                      <div className="absolute right-6 top-8 md:top-3 md:right-3">
                        <div className="" onClick={cancel} type="button">
                          <span className="transition-all duration-1000 hover:text-red-400 p-1 mt-1 rounded cursor-pointer material-symbols-outlined">
                            cancel
                          </span>
                        </div>
                      </div>
                    </div>
                  </form>
                </PopOver>
              )}
            </div>
            <div>
              {openPopUp && (
                <Popover onClose={openDelete}>
                  <div
                    className={`z-20 ${openPopUp ? "visible" : "invisible"}`}
                  >
                    <div className="bg-white rounded-lg border shadow-lg mx-auto w-96">
                      <p className="text-xs text-center p-10">
                        Apa anda ingin menghapus akun ini, semua data akan
                        dihapus dari sistem ini!
                      </p>
                      <div className="flex justify-end pb-5 text-xs">
                        <button
                          className=" bg-black text-white hover:text-black hover:bg-green-400 p-2 rounded w-20"
                          onClick={closeDelete}
                        >
                          Tidak
                        </button>
                        <button
                          className="bg-green-400 hover:bg-green-300 p-2 rounded w-20 mx-5"
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
          </animated.div>
        )}
      </Suspense>
    </div>
  );
}

export default Profile;
