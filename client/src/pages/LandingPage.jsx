import { useNavigate } from "react-router-dom";
import imageContainer from "../assets/images/melon.jpg";
import Login from "../components/Login";

function LandingPage() {
  let navigate = useNavigate();
  return (
    <div className="grid grid-cols-2 gap-2 mt-32 mx-32">
      <div>
        <h1 className="text-3xl font-bold text-green-600">
          Selamat Datang <br />
          di Shafa Farm Hidroponik
        </h1>
        <p className="mt-20 w-96">
          Kami berkomitmen memberikan melon berkualitas terbaik yang dihasilkan
          melalui metode hidroponik yang mengutamakan kualitas, kebersihan, dan
          kesegaran.
        </p>
        <img src={imageContainer} className="w-64 mx-auto mt-10" alt="" />
        <button
          className="text-sky-500 mb-20 mt-10 ml-96"
          onClick={() => navigate("/halamanproduk")}
        >
          Selengkapnya &rarr;
        </button>
      </div>
      <div className="fixed top-10 right-20">
        <Login />
      </div>
    </div>
  );
}

export default LandingPage;
