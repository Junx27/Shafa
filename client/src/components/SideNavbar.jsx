import { NavLink, useNavigate } from "react-router-dom";
import { navbar } from "../data/navbar.js";
import { useDispatch, useSelector } from "react-redux";
import { logoutAdmin, reset } from "../features/AuthSlice.js";
import logoutIcon from "../assets/navbar/square.svg";
import LogoLogin from "./animate/LogoLogin.jsx";
import Logo from "./animate/Logo.jsx";
import PopOver from "./layout/PopOver.jsx";
import { useEffect, useState } from "react";
import Admin from "./Admin.jsx";

function SideNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
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
  useSelector((state) => state.auth);

  const logout = () => {
    dispatch(logoutAdmin());
    dispatch(reset());
    navigate("/admin");
  };
  return (
    <div className="relative">
      <div
        className={`fixed top-0 py-2 w-full flex justify-between backdrop-blur-md bg-white/30 z-40 border-b ${
          changeColor ? "shadow-lg" : ""
        }`}
      >
        <div className="ml-5">
          <Logo />
        </div>
        <div className="mr-5" onClick={() => setOpen(!open)}>
          <Admin />
        </div>
      </div>
      <div className="hidden relative md:block flex z-50">
        <div className="border border-r-1 bg-gradient-to-t from-gray-100 to-white w-[290px] md:w-[320px] h-[820px] shadow-lg fixed top-0">
          <div className="flex flex-col">
            <div className="w-16 mx-auto mt-8">
              <LogoLogin />
            </div>
            <div className="text-xs flex flex-col mt-10">
              {navbar.map((item) => {
                return (
                  <NavLink
                    key={item.id}
                    to={item.link}
                    className={({ isActive }) =>
                      isActive
                        ? "transition-all duration-1000 bg-green-400 py-4 px-5 hover:bg-green-300 hover:shadow-lg ml-10 rounded-l-lg shadow"
                        : "py-4 px-5 ml-10 hover:underline hover:underline-offset-8"
                    }
                  >
                    <div className="flex flex-row items-center">
                      <img src={item.image} alt="" className="w-8 mr-5" />
                      {item.nama}
                    </div>
                  </NavLink>
                );
              })}
            </div>
            <div className="transition-all duration-1000 text-xs flex flex-row ml-10 items-center px-5 mt-5 hover:underline hover:underline-offset-8 hover:text-green-400">
              <img src={logoutIcon} alt="" className="w-8 mr-5" />
              <button onClick={logout}>Logout</button>
            </div>
          </div>
        </div>
      </div>
      {open && (
        <div className="block md:hidden">
          <PopOver>
            <div className="flex">
              <div className="z-20 -ml-56 border border-r-1 bg-gradient-to-t from-gray-100 to-white w-[290px] md:w-[320px] h-[820px] shadow-lg fixed top-0">
                <div className="flex flex-col">
                  <div className="w-16 mx-auto mt-8">
                    <LogoLogin />
                  </div>
                  <div className="text-xs flex flex-col mt-10">
                    {navbar.map((item) => {
                      return (
                        <NavLink
                          key={item.id}
                          to={item.link}
                          className={({ isActive }) =>
                            isActive
                              ? "transition-all duration-1000 bg-green-400 py-4 px-5 hover:bg-green-300 hover:shadow-lg ml-10 rounded-l-lg shadow"
                              : "py-4 px-5 ml-10 hover:underline hover:underline-offset-8"
                          }
                        >
                          <div className="flex flex-row items-center">
                            <img src={item.image} alt="" className="w-5 mr-5" />
                            {item.nama}
                          </div>
                        </NavLink>
                      );
                    })}
                  </div>
                  <div className="transition-all duration-1000 text-xs flex flex-row ml-10 items-center px-5 mt-5 hover:underline hover:underline-offset-8 hover:text-green-400">
                    <img src={logoutIcon} alt="" className="w-5 mr-5" />
                    <button onClick={logout}>Logout</button>
                  </div>
                </div>
              </div>
              <div
                onClick={() => setOpen(!open)}
                className="z-0 absolute w-full top-0 bg-black opacity-20 h-[800px] py-10"
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

export default SideNavbar;
