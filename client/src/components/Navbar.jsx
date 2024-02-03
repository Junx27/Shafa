import { NavLink } from "react-router-dom";
import { navbar } from "../data/navbarKonsumen";
import Logo from "../assets/images/shafa.png";

function Navbar() {
  return (
    <div className="flex justify-between mx-10 mt-5 items-center">
      <img src={Logo} alt="" className="saturate-200 w-10" />
      <div className="flex flex-row justify-center mx-32">
        {navbar.map((row, index) => (
          <NavLink
            key={index}
            to={row.link}
            className={({ isActive }) =>
              isActive
                ? "bg-lime-300 hover:bg-lime-400 py-2 rounded-md"
                : "py-2 rounded-md hover:text-lime-600"
            }
          >
            <div className="mx-7">{row.nama}</div>
          </NavLink>
        ))}
      </div>
      <button className="bg-lime-300 hover:bg-lime-400 py-2 px-4 rounded-md">
        Logout
      </button>
    </div>
  );
}

export default Navbar;
