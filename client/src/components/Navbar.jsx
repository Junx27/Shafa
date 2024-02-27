import { NavLink, useNavigate } from "react-router-dom";
import { navbar } from "../data/navbarKonsumen";
import Logo from "../assets/images/shafa.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, reset } from "../features/AuthSlice.js";
import axios from "axios";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [pembayaranBelum, setPembayaranBelum] = useState([]);
  const [profile, setProfile] = useState([]);
  const [openLogout, setOpenLogout] = useState(false);
  const fetchProfile = async () => {
    const response = await axios.get("http://localhost:5000/me");
    setProfile(response.data);
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  useEffect(() => {
    const fetchPembayaranBelum = async () => {
      const response = await axios("http://localhost:5000/pembayaran/belum");
      setPembayaranBelum(response.data);
    };
    fetchPembayaranBelum();
  }, []);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:5000/transaksis");
    setData(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const logout = () => {
    dispatch(logoutUser());
    dispatch(reset());
    navigate("/");
  };
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
  return (
    <div
      className={`flex justify-between fixed w-full top-0 z-50 px-10 py-3 items-center backdrop-blur-md bg-white/10 transition-all duration-1000 ${
        changeColor ? "bg-white/100 shadow-lg pt-3" : "pt-5"
      }`}
    >
      <img src={Logo} alt="" className="saturate-200 w-10" />
      <div className="hidden md:flex md:flex-row md:justify-center md:mx-32">
        {navbar.map((row, index) => (
          <NavLink
            key={index}
            to={row.link}
            className={({ isActive }) =>
              isActive
                ? "transition-all duration-1000 bg-lime-400 hover:bg-lime-300 py-2 rounded-md shadow"
                : "py-2 rounded-md hover:text-lime-400 hover-saturete-200"
            }
          >
            <div className="mx-7">{row.nama}</div>
          </NavLink>
        ))}
      </div>
      <div
        className={`hidden md:block bg-black text-white absolute right-[720px] top-7 text-xs px-1 rounded-full ${
          data.length !== 0 ? "visible" : "invisible"
        }`}
      >
        {data.length}
      </div>
      <div
        className={`hidden md:block bg-black text-white absolute right-[615px] top-7 text-xs px-1 rounded-full ${
          pembayaranBelum.length !== 0 ? "visible" : "invisible"
        }`}
      >
        {pembayaranBelum.length}
      </div>
      <div className="flex flex-row items-center">
        <img
          src={
            profile.gambar_profil === "belum"
              ? "http://localhost:5000/images/defaultProfile.png"
              : profile.gambar_profil
          }
          alt=""
          className="w-10 ml-5 rounded-full"
        />
        <span
          className="font-bold text-xl ml-3 cursor-pointer"
          onClick={() => setOpenLogout(!openLogout)}
        >
          :
        </span>
      </div>
      {openLogout && (
        <button
          className="absolute right-10 top-20 bg-lime-400 hover:bg-lime-300 py-2 px-4 rounded-md shadow text-xs"
          onClick={logout}
        >
          Logout
        </button>
      )}
    </div>
  );
}

export default Navbar;
