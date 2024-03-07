import { NavLink, useNavigate } from "react-router-dom";
import { navbar } from "../data/navbarKonsumen";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, reset } from "../features/AuthSlice.js";
import axios from "axios";
import PopOver from "./layout/PopOver.jsx";
import { animated, useSpring } from "react-spring";
import Logo from "./animate/Logo.jsx";

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
    <div>
      <div
        className={`flex justify-between fixed w-full top-0 z-50 px-10 py-3 items-center backdrop-blur-md bg-white/90 transition-all duration-1000 ${
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
                  : "py-2 text-gray-400 hover:text-black rounded-md hover:underline hover:underline-offset-8"
              }
            >
              <div className="mx-5">{row.nama}</div>
            </NavLink>
          ))}
        </div>
        <div
          className={`hidden md:block bg-orange-400 absolute right-[720px] top-7 text-xs px-1 rounded-full ${
            data.filter((row) => row.user_id === userId).length !== 0
              ? "visible"
              : "invisible"
          }`}
        >
          {data.filter((row) => row.user_id === userId).length}
        </div>
        <div
          className={`hidden md:block bg-orange-400 absolute right-[615px] top-7 text-xs px-1 rounded-full ${
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
              <img
                src={
                  profile.gambar_profil === "belum"
                    ? "http://localhost:5000/images/defaultProfile.png"
                    : profile.gambar_profil
                }
                alt=""
                className="transition-all duration-1000 w-10 ml-5 rounded-full shadow hover:shadow-lg"
              />
            </animated.div>
          )}
          <span className="font-bold text-xl ml-3 cursor-pointer">:</span>
        </div>
        {openLogout && (
          <button
            className="hidden md:block absolute right-10 top-20 bg-green-400 hover:bg-green-300 py-2 px-4 rounded-md shadow text-xs"
            onClick={logout}
          >
            Logout
          </button>
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
                {navbar.map((row, index) => (
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
