import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Profile() {
  const [preview, setPreview] = useState();
  const [image, setImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState([]);
  const [nama, setNama] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [no_tlp, setNoTlp] = useState();
  const [no_rek, setNoRek] = useState();
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

  const editProfile = () => {
    setOpen(!open);
  };
  const fetchProfile = async () => {
    const response = await axios.get("http://localhost:5000/adminme");
    setProfile(response.data);
    setNama(response.data.nama);
    setEmail(response.data.email);
    setPassword(response.data.password);
    setNoTlp(response.data.no_tlp);
    setNoRek(response.data.no_rek);
    setImage(response.data.image);
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
      formData.append("no_rek", no_rek);
      formData.append("image", image);

      await axios.patch(
        `http://localhost:5000/admin/${profile.uuid}`,
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
  return (
    <div>
      <div className="grid grid-cols-2 gap-10">
        <div>
          <h1 className="bg-lime-400 w-32 p-2 rounded text-center">Profile</h1>
          <div className="flex flex-col mt-5">
            <img
              src={
                profile.image === "belum"
                  ? "http://localhost:5000/images/defaultProfile.png"
                  : profile.image
              }
              alt=""
              className="w-32 h-32 rounded-full"
            />
            <h1 className="font-bold mt-3 mb-5 text-xl">{profile.nama}</h1>
            <p className="text-gray-500">Email :</p>
            <hr />
            <h1 className="font-bold my-2">{profile.email}</h1>
            <p className="text-gray-500">No. Rekening :</p>
            <hr />
            <h1 className="font-bold my-2">{profile.no_rek}</h1>
            <p className="text-gray-500">No. Telepon :</p>
            <hr />
            <h1 className="font-bold my-2">{profile.no_tlp}</h1>
          </div>
          <div className="flex justify-end">
            <button
              className={
                open ? "bg-red-400 p-2 rounded" : "bg-lime-400 p-2 rounded"
              }
              onClick={editProfile}
            >
              <span className="material-symbols-outlined">
                {open ? "edit_off" : "edit"}
              </span>
            </button>
          </div>
        </div>
        <div>
          <button className="ml-5 flex flex-row items-center mt-10">
            <span className="material-symbols-outlined bg-lime-400 p-2 rounded-full mr-3">
              add_circle
            </span>
            Menambahkan Informasi
          </button>
          <button className="ml-5 flex flex-row items-center mt-10">
            <span className="material-symbols-outlined bg-lime-400 p-2 rounded-full mr-3">
              add_circle
            </span>
            Menambahkan Testimoni
          </button>
        </div>
      </div>
      <hr className="h-px bg-lime-400 border-0 my-2" />
      <div className={open ? "visible relative" : "invisible absolute"}>
        <div className="mt-5 bg-lime-50 p-10 pb-20 rounded-lg relative">
          <h1 className="px-5 py-2 bg-lime-400 mr-[50%] rounded-r-lg absolute top-0 left-0">
            Mengedit profile
          </h1>
          <form action="" className="flex flex-row " onSubmit={updateProfile}>
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
                <label htmlFor="password">New Password</label>
                <input
                  id="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
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
              <div className="grid grid-flow-row auto-rows-max mt-2">
                <label htmlFor="noRek">No. Rek</label>
                <input
                  id="noRek"
                  type="text"
                  value={no_rek}
                  onChange={(e) => setNoRek(e.target.value)}
                  className="mt-3 p-2 rounded-lg border border-lime-500"
                />
              </div>
            </div>
            <div className="w-96 mx-32">
              <div>
                {!preview && <h1 className="my-2">Gambar Lama</h1>}
                {!preview && (
                  <img
                    src={profile.image}
                    alt=""
                    className="my-2 w-[300px] h-[300px] rounded"
                  />
                )}
              </div>
              <div className="flex flex-col my-2">
                Gambar Baru
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
                      className="mt-5 rounded-lg w-[300px] h-[300px]"
                    />
                  )}
                  {preview && (
                    <p
                      onClick={removeImage}
                      className="bg-red-400 py-2 px-5 rounded-b-md text-center absolute top-5 right-0 cursor-pointer"
                    >
                      X
                    </p>
                  )}
                </div>
              </div>
              {msg && <p className="text-red-400">{msg}</p>}
              <div className="flex justify-end mt-10 absolute right-5 bottom-5">
                <Link
                  className="bg-red-400 p-2 rounded mx-10"
                  onClick={() => window.location.reload()}
                >
                  Cancel
                </Link>
                <button className="bg-lime-400 p-2 rounded" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <h1>test</h1>
    </div>
  );
}

export default Profile;
