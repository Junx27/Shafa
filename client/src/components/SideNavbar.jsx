import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/images/shafa.png";
import { navbar } from "../data/navbar.js";
import { useDispatch, useSelector } from "react-redux";
import { logoutAdmin, reset } from "../features/AuthSlice.js";
import logoutIcon from "../assets/navbar/square.svg";

function SideNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useSelector((state) => state.auth);

  const logout = () => {
    dispatch(logoutAdmin());
    dispatch(reset());
    navigate("/admin");
  };
  return (
    <div className="sidebar fixed top-0">
      <div className="flex flex-col">
        <div className="w-16 mx-auto mt-8">
          <img src={Logo} alt="" className="saturate-200" />
        </div>
        <div className="flex flex-col mt-10">
          {navbar.map((item) => {
            return (
              <NavLink
                key={item.id}
                to={item.link}
                className={({ isActive }) =>
                  isActive
                    ? "bg-lime-300 py-4 px-5 hover:bg-lime-400 hover:text-white ml-10 rounded-l-lg shadow"
                    : "py-4 px-5 ml-10 hover:text-lime-500"
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
        <div className="flex flex-row ml-10 items-center px-5 mt-5 hover:text-lime-500">
          <img src={logoutIcon} alt="" className="w-8 mr-5" />
          <button onClick={logout}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default SideNavbar;
