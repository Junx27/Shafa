import SideNavbar from "../../components/SideNavbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { meAdmin } from "../../features/AuthSlice";
import { useEffect, useState } from "react";
import CreateProduk from "../../components/layout/CreateProduk";
import ProdukList from "../../components/Produk";
import { animated, useSpring } from "react-spring";
import LoadingSpinner from "../../components/animate/Loading";

function Produk() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const startLoading = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 800);
    };
    startLoading();
  }, []);
  const animation = useSpring({
    opacity: loading ? 0 : 1,
    marginTop: loading ? -10 : 0,
  });

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
    <div className="mt-20">
      <SideNavbar />
      {loading ? (
        <div className="w-[100%] h-[800px]">
          <div className="flex ml-24 md:ml-64 md:justify-center mt-64">
            <LoadingSpinner />
          </div>
        </div>
      ) : (
        <animated.div
          style={animation}
          className="mt-20 mx-5 md:mx-0 md:ms-80 md:pl-6 md:mr-10"
        >
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
        </animated.div>
      )}
    </div>
  );
}

export default Produk;
