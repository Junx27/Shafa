import { useNavigate } from "react-router-dom";
import Login from "../components/Login";

function LandingPage() {
  let navigate = useNavigate();
  return (
    <div className="py-5">
      <div className=" bg-[url('http://localhost:5000/images/bgloginkonsumen.jpg')] bg-no-repeat bg-cover bg-center fixed w-[100%] h-[100%] -mt-5 z-0 brightness-75"></div>
      <div className="mt-32 mx-32 absolute z-20">
        <h1 className="text-5xl font-bold text-white z-20">
          Selamat Datang <br />
          di Shafa Farm Hidroponik
        </h1>
        <p className="mt-10 w-[600px] text-white indent-7 text-justify">
          Kami berkomitmen memberikan melon berkualitas terbaik yang dihasilkan
          melalui metode hidroponik yang mengutamakan kualitas, kebersihan, dan
          kesegaran.
        </p>
        <h2 className="mt-5 text-xl font-bold bg-lime-400 p-3 w-[350px] rounded-r-lg">
          Apa itu Shafa Farm Hidroponik?
        </h2>
        <p className="mt-2 w-[600px] text-white indent-7 text-justify">
          Shafa Farm Hidroponik adalah sebuah usaha pertanian yang mengkhususkan
          diri dalam budidaya buah melon menggunakan sistem hidroponik. Sistem
          hidroponik adalah metode pertanian yang menggunakan air sebagai media
          utama untuk memberikan nutrisi kepada tanaman, tanpa menggunakan
          tanah. Di Shafa Farm Hidroponik, tanaman melon ditanam dalam
          lingkungan yang terkontrol dengan baik, termasuk suhu, kelembaban, dan
          pencahayaan, sehingga memastikan pertumbuhan tanaman yang optimal
          sepanjang tahun.
        </p>
        <div className="flex justify-end mt-10">
          <button
            className="bg-lime-400 p-3 rounded-lg hover:bg-lime-500 hover:text-white cursor-pointer"
            onClick={() => navigate("/halamanproduk")}
          >
            Selengkapnya &rarr;
          </button>
        </div>
      </div>
      <div className="fixed top-10 right-20">
        <Login />
      </div>
    </div>
  );
}

export default LandingPage;
