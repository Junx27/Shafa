import Admin from "../../components/Admin";
import SideNavbar from "../../components/SideNavbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { meAdmin } from "../../features/AuthSlice";
import { useEffect, useState } from "react";
import axios from "axios";

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
      <div className="mt-20 ms-80 pl-6 mr-10">
        <hr className="h-px border-0 bg-lime-200 mb-5" />
        <h1 className="text-xl">Ini halaman promo</h1>
      </div>
    </div>
  );
}

export default Promo;
