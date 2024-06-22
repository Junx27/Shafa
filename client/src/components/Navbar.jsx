import { NavLink, useNavigate } from "react-router-dom";
import { navbar } from "../data/navbarKonsumen";
import { navbarSide } from "../data/navbarSide.js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, reset } from "../features/AuthSlice.js";
import axios from "axios";
import PopOver from "./layout/PopOver.jsx";
import { animated, useSpring } from "react-spring";
import Logo from "./animate/Logo.jsx";
import menu from "../assets/images/menu.png";
import Profile from "./konsumen/Profile.jsx";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState([]);
  const [pembayaranBelum, setPembayaranBelum] = useState([]);
  const [profile, setProfile] = useState([]);
  const [openLogout, setOpenLogout] = useState(false);
  const [openNavbar, setOpenNavbar] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const startLoading = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    };
    startLoading();
  }, []);

  const animation = useSpring({
    opacity: loading ? 0 : 1,
    marginTop: loading ? -10 : 0,
  });
  const animationSidebar = useSpring({
    marginLeft: openNavbar ? 0 : -100,
    config: { tension: 160, friction: 10 },
  });

  const fetchProfile = async () => {
    const response = await axios.get("http://localhost:5000/me");
    setProfile(response.data);
    setUserId(response.data.id);
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  useEffect(() => {
    const fetchPembayaranBelum = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/pembayaran/belum"
        );
        setPembayaranBelum(response.data);
      } catch (error) {
        console.error("gagal mengambil data");
      }
    };
    fetchPembayaranBelum();
  }, [userId]);

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
    <div className="text-sm">
      <div
        className={`flex justify-between fixed w-full top-0 z-50 px-5 py-3 items-center backdrop-blur-md bg-white/30 transition-all duration-1000 ${
          changeColor ? "bg-white/100 shadow-lg pt-3" : "pt-5"
        }`}
      >
        <Logo />
        <div className="hidden md:flex md:flex-row md:justify-center md:mx-32">
          {navbar.map((row, index) => (
            <NavLink
              key={index}
              to={row.link}
              className={({ isActive }) =>
                isActive
                  ? "transition-all duration-1000 bg-gradient-to-b from-green-400 to-green-500 hover:bg-green-300 py-2 rounded-md shadow"
                  : "py-2 hover:text-black rounded-md hover:underline hover:underline-offset-8"
              }
            >
              <div className="mx-5">{row.nama}</div>
            </NavLink>
          ))}
        </div>
        <div
          className={`hidden animate-pulse md:block w-2 h-2 bg-orange-400 rounded-full absolute right-[705px] top-7 ${
            data.filter((row) => row.user_id === userId).length !== 0
              ? "visible"
              : "invisible"
          }`}
        ></div>
        <div
          className={`hidden bg-orange-400 absolute right-[500px] top-7 text-xs px-1 rounded-full ${
            pembayaranBelum.filter((row) => row.user_id === userId).length !== 0
              ? "visible"
              : "invisible"
          }`}
        >
          {pembayaranBelum.filter((row) => row.user_id === userId).length}
        </div>
        <div
          className="flex flex-row items-center"
          onClick={() => {
            setOpenLogout(!openLogout), setOpenNavbar(!openNavbar);
          }}
        >
          {" "}
          {loading ? (
            <div className="w-10 ml-5 rounded-full"></div>
          ) : (
            <animated.div style={animation} className="flex items-center">
              <p className="font-bold capitalize text-sm absolute right-20 mr-2">
                {profile.nama}
              </p>
              <img
                src={
                  profile.gambar_profil === "belum"
                    ? "defaultProfile.png"
                    : profile.gambar_profil
                }
                alt=""
                className="transition-all duration-1000 w-10 ml-5 rounded-full shadow hover:shadow-lg"
              />
            </animated.div>
          )}
          <img src={menu} alt="" className="w-5" />
        </div>
        {openLogout && (
          <div className="hidden md:block absolute right-0 top-0">
            <Profile />
          </div>
        )}
      </div>
      {openNavbar && (
        <div className="md:hidden">
          <PopOver>
            <div className="flex">
              <animated.div
                style={animationSidebar}
                className="w-64 bg-white h-[800px] py-10"
              >
                {navbarSide.map((row, index) => (
                  <NavLink key={index} to={row.link}>
                    <div className="transition-all duration-1000 my-10 hover:underline hover:underline-offset-8 mx-10">
                      {row.nama}
                    </div>
                  </NavLink>
                ))}
                <button
                  className="mx-10 bg-green-400 hover:bg-green-300 py-2 px-4 rounded-md shadow text-xs"
                  onClick={logout}
                >
                  Logout
                </button>
              </animated.div>
              <div
                onClick={() => setOpenNavbar(!openNavbar)}
                className="w-32 bg-black opacity-20 h-[800px] py-10"
              >
                close
              </div>
            </div>
          </PopOver>
        </div>
      )}
    </div>
  );
}

export default Navbar;
