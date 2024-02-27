import Navbar from "../../components/Navbar";
import Promo from "../../components/layout/Promo";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { meUser } from "../../features/AuthSlice";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import HomeView from "../../components/konsumen/Home";
import LoadingSpinner from "../../components/layout/Loading";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    navigate(`/produkkonsumen?search=${searchTerm}`);
  };

  useEffect(() => {
    const startLoading = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };
    startLoading();
  }, []);

  useEffect(() => {
    dispatch(meUser());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  return (
    <div>
      {loading ? (
        <div className="mx-[45%] md:mx-[50%] my-[80%] md:my-[20%]">
          <LoadingSpinner />
          <p className="text-lime-400 text-xs mt-5">Loading...</p>
        </div>
      ) : (
        <div>
          <div className="">
            <Navbar />
          </div>
          <div className=" bg-[url('http://localhost:5000/images/bghero.jpg')] bg-no-repeat bg-cover bg-center w-[100%] h-[450px] z-0 bg-fixed top-0 z-0 relative rounded-b-[20px]">
            <div className="absolute top-[40%] left-5 md:left-[35%] z-20 shadow-lg">
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  className="w-[300px] md:w-96 p-3 rounded-l-lg outline-none text-xs"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Cari produk disini"
                  required="masukan teks"
                />
                <button
                  className="bg-lime-400 p-3 rounded-r-lg text-xs"
                  type="submit"
                >
                  Cari
                </button>
              </form>
            </div>
          </div>
          <div className="relative -mt-32">
            <Promo />
          </div>
          <div>
            <HomeView />
          </div>
          <div>
            <Footer />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
