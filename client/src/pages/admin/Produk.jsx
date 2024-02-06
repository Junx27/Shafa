import Admin from "../../components/Admin";
import SideNavbar from "../../components/SideNavbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { meAdmin } from "../../features/AuthSlice";
import { useEffect, useState } from "react";
import CreateProduk from "../../components/layout/CreateProduk";
import ProdukList from "../../components/Produk";

function Produk() {
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

  const [open, setOpen] = useState(true);
  const showMenu = () => {
    setOpen(!open);
  };

  return (
    <div className="">
      <SideNavbar />
      <Admin />
      <div className="mt-5 ms-80 pl-6 mr-10 z-0">
        <hr className="h-px border-0 bg-lime-200 mb-5" />
        <div className="mt-5 relative">
          <button
            className={
              open
                ? "relative top-0 left-0 z-40"
                : "absolute top-0 left-[46.2%] z-40"
            }
            onClick={showMenu}
          >
            <span
              className={
                open
                  ? "material-symbols-outlined bg-lime-400 p-2 rounded-b-lg transition ease-in-out duration-1000"
                  : "material-symbols-outlined bg-red-400 p-2 rounded-b-lg transition ease-in-out duration-1000"
              }
            >
              {open ? "add_circle" : "cancel"}
            </span>
          </button>
          <div className={open ? "invisible absolute" : "visible"}>
            <CreateProduk />
          </div>
        </div>
        <div className="mt-5">
          <h1 className="mb-5">Produk</h1>
          <ProdukList />
        </div>
      </div>
    </div>
  );
}

export default Produk;
