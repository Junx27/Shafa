import axios from "axios";
import { useEffect, useRef, useState } from "react";
import menu from "../../assets/images/menu.png";
import PopOver from "../layout/PopOver";
import { animated, useSpring } from "react-spring";
import LoadingSpinner from "../animate/Loading";
import Empty from "../animate/Empty";

function Konsumen() {
  const [openHapus, setOpenHapus] = useState(false);
  const [konsumen, setKonsumen] = useState([]);
  const [originalKonsumen, setOriginalKonsumen] = useState([]);
  const [openItem, setOpenItem] = useState(null);
  const popoverRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [profile, setProfile] = useState([]);
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alamat, setAlamat] = useState("");
  const [no_tlp, setNoTlp] = useState("");
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);
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

  const fetchData = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setKonsumen(response.data);
    setOriginalKonsumen(response.data);
  };
  const fetchProfileUser = async (id) => {
    const response = await axios.get(`http://localhost:5000/users/${id}`);
    setProfile(response.data);
    setNama(response.data.nama);
    setEmail(response.data.email);
    setAlamat(response.data.alamat);
    setNoTlp(response.data.no_tlp);
    setImage(response.data.gambar_profil);
  };
  useEffect(() => {
    fetchProfileUser();
  }, []);
  const updateProfileStatus = async (e, id) => {
    e.preventDefault();
    try {
      const status = "terdaftar";
      const formData = new FormData();
      formData.append("status_konsumen", status);
      await axios.patch(`http://localhost:5000/users/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      window.location.reload();
    } catch (error) {
      if (error.response) {
        console.error("Gagal memperbarui data:", error);
      }
    }
  };
  const updateProfile = async (e, id) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("nama", nama);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("alamat", alamat);
      formData.append("no_tlp", no_tlp);
      formData.append("gambar_profil", image);

      await axios.patch(`http://localhost:5000/users/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      window.location.reload();
    } catch (error) {
      if (error.response) {
        console.error("Gagal memperbarui data:", error);
      }
    }
  };
  const deleteKonsumen = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      window.location.reload();
    } catch (error) {
      if (error.response) {
        console.error("Gagal", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setOpenItem(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const sortedKonsumen = [...konsumen].sort((a, b) =>
    a.nama.localeCompare(b.nama)
  );
  const filteredKonsumen = sortedKonsumen.filter((row) =>
    row.nama.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const konsumenTerdaftar = originalKonsumen.filter(
    (row) => row.status_konsumen.toLowerCase() === "terdaftar"
  );
  const konsumenBelum = originalKonsumen.filter(
    (row) => row.status_konsumen.toLowerCase() === "belum"
  );
  const filterResult = (item) => {
    if (item === "semua") {
      setKonsumen(originalKonsumen);
    } else {
      const result = originalKonsumen.filter(
        (row) => row.status_konsumen.toLowerCase() === item
      );
      setKonsumen(result);
    }
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  return (
    <div className="mt-20">
      {loading ? (
        <div className="w-[100%] h-[800px]">
          <div className="flex ml-20 md:ml-0 md:justify-center mt-64">
            <LoadingSpinner />
          </div>
        </div>
      ) : (
        <animated.div style={animation} className="mt-20 text-xs">
          <div className="flex justify-between items-center">
            <div className="text-[10px] md:text-xs flex bg-green-400 p-2 rounded  w-[170px] md:w-64 shadow items-center">
              <span className="text-[15px] md:text-xs material-symbols-outlined">
                person_check
              </span>
              <h1 className="ml-2">Managemen konsumen</h1>
            </div>
            <div className="hidden md:block">
              <div className="mr-5 flex flex-row items-center">
                <p className="text-gray-400 mx-2 flex">
                  Jumlah Konsumen:
                  <span
                    className="text-black font-bold mx-2 hover:underline cursor-pointer"
                    onClick={() => filterResult("semua")}
                  >
                    {originalKonsumen.length} Orang
                  </span>
                </p>
                <p className="text-gray-400 mx-2 flex">
                  Terdaftar:
                  <span
                    className="text-green-400 font-bold mx-2 hover:underline cursor-pointer"
                    onClick={() => filterResult("terdaftar")}
                  >
                    {konsumenTerdaftar.length} Orang
                  </span>
                </p>
                {konsumenBelum.length !== 0 && (
                  <p className="text-gray-400 mx-2 flex">
                    Belum:
                    <span
                      className="text-red-400 font-bold mx-2 hover:underline cursor-pointer"
                      onClick={() => filterResult("belum")}
                    >
                      {konsumenBelum.length} Orang
                    </span>
                  </p>
                )}
                <button
                  className="flex items-center transition-all duration-1000 hover:text-green-400"
                  onClick={() => window.location.reload()}
                >
                  <span className="material-symbols-outlined cursor-pointer ml-3 mr-2">
                    cached
                  </span>
                  <p className="text-xs hover:underline mr-3">Refresh all</p>
                </button>
                <div className="right-10">
                  <div className="flex items-center">
                    <input
                      type="text"
                      placeholder="Cari konsumen..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="p-2 border border-green-400 rounded outline-green-400 text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="block md:hidden mt-5">
            <div className="flex flex-row overflow-x-auto">
              <p
                className="text-gray-400 mx-2 flex my-2"
                onClick={() => filterResult("semua")}
              >
                Jumlah Konsumen:
                <span className="text-black font-bold mx-2 hover:underline cursor-pointer">
                  {originalKonsumen.length}
                </span>
              </p>
              <p
                className="text-gray-400 mx-2 flex my-2"
                onClick={() => filterResult("terdaftar")}
              >
                Terdaftar:
                <span className="text-green-400 font-bold mx-2 hover:underline cursor-pointer">
                  {konsumenTerdaftar.length}
                </span>
              </p>
              {konsumenBelum.length !== 0 && (
                <p
                  className="text-gray-400 mx-2 flex my-2"
                  onClick={() => filterResult("belum")}
                >
                  Belum:
                  <span className="text-red-400 font-bold mx-2 hover:underline cursor-pointer">
                    {konsumenBelum.length}
                  </span>
                </p>
              )}
            </div>
            <div className="flex items-center">
              <div className="right-10">
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Cari konsumen..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="p-2 border border-green-400 rounded outline-green-400 text-xs"
                  />
                </div>
              </div>
              <button
                className="flex items-center transition-all duration-1000 hover:text-green-400 my-2"
                onClick={() => window.location.reload()}
              >
                <span className="material-symbols-outlined cursor-pointer ml-3 mr-2">
                  cached
                </span>
                <p className="text-xs hover:underline mr-3">Refresh all</p>
              </button>
            </div>
          </div>
          {originalKonsumen.length !== 0 ? (
            <div className="mt-5">
              {filteredKonsumen.map((row, index) => (
                <div
                  key={index}
                  className="relative transition-all flex flex-col md:flex-row duration-1000 border p-5 shadow hover:shadow-lg rounded-lg my-5"
                >
                  <p className="font-bold my-auto pr-5">{index + 1}.</p>
                  <img
                    src={
                      row.gambar_profil === "belum"
                        ? "http://localhost:5000/images/defaultProfile.png"
                        : row.gambar_profil
                    }
                    alt=""
                    className="w-20 h-20 rounded-full object-cover shadow mx-auto"
                  />
                  <hr className="mt-3 block md:hidden" />
                  <div className="w-32 md:border-l pl-3 ml-3 my-3 grid content-between">
                    <p className="font-bold">Nama</p>
                    <p className="capitalize">{row.nama}</p>
                  </div>
                  <div className="w-32 md:border-l pl-3 ml-3 my-3 grid content-between">
                    <p className="font-bold">Email</p>
                    <p className="">{row.email}</p>
                  </div>
                  <div className="w-64 md:w-96 md:border-l pl-3 ml-3 my-3 grid content-between">
                    <p className="font-bold">Alamat</p>
                    <p className="capitalize">{row.alamat}</p>
                  </div>
                  <div className="w-32 md:border-l pl-3 ml-3 my-3 grid content-between">
                    <p className="font-bold">Kontak</p>
                    <p className="capitalize">{row.no_tlp}</p>
                  </div>
                  <div className="w-32 md:border-l pl-3 ml-3 my-3 grid content-between">
                    <p className="font-bold">Status</p>
                    <p
                      className={`capitalize ${
                        row.status_konsumen === "terdaftar"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {row.status_konsumen}
                    </p>
                  </div>
                  <div
                    onClick={() => setOpenItem(index)}
                    className="absolute bottom-10 right-3 md:bottom-12"
                  >
                    <img src={menu} alt="" className="w-5" />
                  </div>
                  {openItem === index && (
                    <div
                      ref={popoverRef}
                      className="absolute -bottom-5 right-10 text-xs bg-white shadow rounded"
                    >
                      <div className="flex flex-col items-start p-5">
                        <button
                          className="hover:text-green-400"
                          onClick={() => {
                            fetchProfileUser(row.uuid);
                            setOpenItem(null);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="hover:text-green-400 mt-2"
                          onClick={() => {
                            setOpenHapus(index);
                            setOpenItem(null);
                          }}
                        >
                          Hapus
                        </button>
                        {row.status_konsumen === "belum" && (
                          <form
                            action=""
                            onSubmit={(e) => updateProfileStatus(e, row.uuid)}
                          >
                            <button
                              className="hover:text-green-400 mt-2"
                              type="submit"
                            >
                              Submit
                            </button>
                          </form>
                        )}
                      </div>
                    </div>
                  )}
                  {openHapus === index && (
                    <PopOver>
                      <div className="-mt-56 md:w-[400px] md:h-[150px] bg-white rounded p-5">
                        <p className="text-xs mb-10">
                          Apakah anda ingin menghapus data pembelian ini?
                          <br />
                          Seluruh data transaksi akan dihapus!
                        </p>
                        <div className="flex justify-end">
                          <button
                            className="mr-3 transition-all duration-1000 bg-black text-white hover:bg-red-400 hover:text-black p-2 rounded shadow text-xs"
                            onClick={() => setOpenHapus(!openHapus)}
                          >
                            Tidak
                          </button>
                          <button
                            className="mr-3 transition-all duration-1000 bg-green-400 hover:bg-green-300 hover:text-black p-2 px-4 rounded shadow text-xs"
                            onClick={() => deleteKonsumen(row.uuid)}
                          >
                            Ya
                          </button>
                        </div>
                      </div>
                    </PopOver>
                  )}
                  {profile && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10">
                      <form
                        onSubmit={(e) => updateProfile(e, profile.uuid)}
                        className="w-96 bg-white p-5 rounded-lg relative overflow-auto"
                      >
                        <div className="text-xs flex justify-between">
                          <h1 className="p-2 text-center bg-green-400 rounded w-32 my-auto shadow">
                            Mengedit profile
                          </h1>
                          <div onClick={() => window.location.reload()}>
                            <span className="transition-all duration-1000 hover:text-red-400 material-symbols-outlined cursor-pointer">
                              cancel
                            </span>
                          </div>
                        </div>
                        <img
                          src={
                            preview === null ? profile.gambar_profil : preview
                          }
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
                            <label htmlFor="alamat">Alamat</label>
                            <textarea
                              id="alamat"
                              type="text"
                              value={alamat}
                              onChange={(e) => setAlamat(e.target.value)}
                              className="mt-3 p-2 rounded border border-green-400 outline-green-400"
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
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="border rounded-lg shadow my-5">
              <h1 className="text-gray-400 text-xs p-5">
                Belum ada konsumen masuk
              </h1>
              <Empty />
            </div>
          )}
        </animated.div>
      )}
    </div>
  );
}

export default Konsumen;
