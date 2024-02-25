import Navbar from "../../components/Navbar";
import Promo from "../../components/layout/Promo";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { meUser } from "../../features/AuthSlice";
import { useEffect } from "react";
import Footer from "../../components/Footer";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

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
      <div className="">
        <Navbar />
      </div>
      <div className=" bg-[url('http://localhost:5000/images/bghero.jpg')] bg-no-repeat bg-cover bg-center w-[100%] h-[450px] z-0 bg-fixed top-0 z-0 relative rounded-b-[20px]"></div>
      <div className="relative -mt-32">
        <Promo />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
