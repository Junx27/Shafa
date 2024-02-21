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
      <div className="flex flex-row justify-center mx-32">
        {navbar.map((row, index) => (
          <NavLink
            key={index}
            to={row.link}
            className={({ isActive }) =>
              isActive
                ? "bg-lime-300 hover:bg-lime-400 py-2 rounded-md shadow"
                : "py-2 rounded-md hover:text-lime-400 hover-saturete-200"
            }
          >
            <div className="mx-7">{row.nama}</div>
          </NavLink>
        ))}
      </div>
      <div
        className={`bg-red-400 p-1 rounded-full absolute right-[725px] top-7 animate-pulse ${
          data.length !== 0 ? "visible" : "invisible"
        }`}
      ></div>

      <button
        className="bg-lime-300 hover:bg-lime-400 py-2 px-4 rounded-md"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;
