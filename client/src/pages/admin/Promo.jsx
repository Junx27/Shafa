import Admin from "../../components/Admin";
import SideNavbar from "../../components/SideNavbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { meAdmin } from "../../features/AuthSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import previewImage from "../../assets/images/melon.jpg";
function Promo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(meAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/admin");
    }
  }, [isError, navigate]);
  const [profile, setProfile] = useState([]);
  const fetchProfile = async () => {
    const response = await axios.get("http://localhost:5000/adminme");
    setProfile(response.data);
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  const [produk, setProduk] = useState([]);
  const produkList = async () => {
    try {
      const response = await axios.get("http://localhost:5000/produk");
      setProduk(response.data);
    } catch (error) {
      console.error("Gagal mengambil data produk", error);
    }
  };
  useEffect(() => {
    produkList();
  }, []);
  return (
    <div className="">
      <SideNavbar />
      <Admin />
      <div className="mt-5 ms-80 pl-6 mr-10">
        <hr className="h-px border-0 bg-lime-200 mb-5" />
        <div className="flex items-center">
          <span className="material-symbols-outlined text-lime-400">
            add_circle
          </span>
          <h1 className="text ml-3">Ini halaman promo</h1>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-32 mx-20">
          <div className="w-[350px]">
            <img
              src="https://res.cloudinary.com/dk0z4ums3/image/upload/v1616483288/attached_image/6-manfaat-buah-melon-untuk-kesehatan-anak.jpg"
              alt=""
              className="rounded-lg"
            />
          </div>
          <div>
            <table>
              <tbody>
                <tr>
                  <td className="py-1">Tagline</td>
                  <td>:</td>
                  <td className="text-lime-600">12.12</td>
                </tr>
                <tr>
                  <td className="py-1">Nama</td>
                  <td>:</td>
                  <td className="text-lime-600">Makan gratis di tempat</td>
                </tr>
                <tr>
                  <td className="py-1">Deskripsi</td>
                  <td>:</td>
                  <td className="text-lime-600">Deskripsi makan gratis</td>
                </tr>
                <tr>
                  <td className="py-1">Waktu</td>
                  <td>:</td>
                  <td className="text-lime-600">08.00 - 12.00</td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-end mt-16">
              <button className="bg-lime-300 p-2 px-4 rounded hover:bg-lime-400">
                Edit
              </button>
              <button className="bg-red-400 p-2 rounded ml-5 hover:bg-red-500">
                Hapus
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Promo;
