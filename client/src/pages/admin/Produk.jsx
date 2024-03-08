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
  // eslint-disable-next-line react/prop-types
  const Popover = ({ children }) => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div>{children}</div>
      </div>
    );
  };
  return (
    <div className="">
      <SideNavbar />
      <div className="mt-20 ms-80 pl-6 mr-10 z-0">
        <div className="mt-5 relative">
          <button
            onClick={showMenu}
            className="flex items-center transition-all duration-1000 hover:text-green-400"
          >
            <span className="material-symbols-outlined">add_circle</span>
            <p className="text-xs ml-5 hover:underline cursor-pointer">
              Menambahkan produk
            </p>
          </button>
          {!open && (
            <div>
              <Popover>
                <CreateProduk />
              </Popover>
            </div>
          )}
        </div>
        <div className="mt-5">
          <ProdukList />
        </div>
      </div>
    </div>
  );
}

export default Produk;
