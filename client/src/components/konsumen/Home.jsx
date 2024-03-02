import { animated, useSpring } from "react-spring";
import { useEffect, useState } from "react";
import DeliciousAnimate from "../animate/DeliciousAnimate";
import PremiumAnimate from "../animate/PremiumAnimate";
import SelectedAnimate from "../animate/SelectedAnimate";
import Plants from "../animate/Plants";
import PlantsMobile from "../animate/PlantsMobile";
import ShafaAnimate from "../animate/ShafaAnimate";

function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const animation = useSpring({
    opacity: scrollY > 100 ? 1 : 0,
    marginLeft: scrollY > 100 ? 0 : 10,
    from: { opacity: 0, marginLeft: 10 },
    config: { tension: 200, friction: 12 },
  });
  const animationParagraf = useSpring({
    opacity: scrollY > 400 ? 1 : 0,
    from: { opacity: 0 },
    config: { tension: 40, friction: 12 },
  });
  const animation1 = useSpring({
    opacity: scrollY > 800 ? 1 : 0,
    marginRight: scrollY > 800 ? 0 : 10,
    from: { opacity: 0, marginRight: 10 },
    config: { tension: 200, friction: 12 },
  });
  const animationCard = useSpring({
    opacity: scrollY > 1200 ? 1 : 0,
    marginLeft: scrollY > 1200 ? 0 : 30,
    from: { opacity: 0, marginLeft: 30 },
    config: { tension: 200, friction: 12 },
  });
  const animationCard1 = useSpring({
    opacity: scrollY > 2100 ? 1 : 0,
    marginRight: scrollY > 2100 ? 15 : 0,
    marginLeft: scrollY > 2100 ? 15 : 0,
    from: { opacity: 0, marginRight: 0, marginLeft: 0 },
    config: { tension: 250, friction: 12 },
  });

  return (
    <div className="mt-10">
      <animated.h1
        className="font-bold text-center mb-5 md:mb-20 text-xl md:text-3xl"
        style={animation}
      >
        Apa itu pertanian Hidroponik?
      </animated.h1>
      <animated.div
        className="flex flex-col mx-5 md:flex-row md:mx-32 mb-20 items-center"
        style={animationParagraf}
      >
        <div className="hidden md:block -mt-64">
          <Plants />
        </div>
        <div className="block md:hidden -mt-32">
          <PlantsMobile />
        </div>
        <div className="mt-5 md:mt-0 mx-auto md:ml-10">
          <p className="indent-8 text-justify">
            Pertanian hidroponik adalah metode bercocok tanam tanaman yang tidak
            menggunakan tanah sebagai media tumbuh, tetapi menggunakan larutan
            nutrisi yang kaya akan unsur hara esensial yang disuntikkan langsung
            ke akar tanaman. Ini adalah teknik budidaya tanaman yang berbeda
            dari pertanian konvensional yang mengandalkan tanah sebagai media
            utama untuk menyediakan nutrisi dan air bagi tanaman. Dalam
            pertanian hidroponik, tanaman ditanam dalam wadah atau sistem khusus
            yang memungkinkan akar mereka berada dalam kontak langsung dengan
            larutan nutrisi. Sistem hidroponik dapat bervariasi, termasuk
            menggunakan media seperti pasir, kerikil, serat kokos, atau bahkan
            hanya air.
          </p>
          <h1 className="my-5 font-bold">Keuntungan pertanian hidroponik</h1>
          <p className="indent-8 text-justify">
            Keuntungan dari pertanian hidroponik termasuk penggunaan air yang
            lebih efisien, pengendalian yang lebih baik terhadap hama dan
            penyakit, pertumbuhan tanaman yang lebih cepat, dan kemampuan untuk
            menanam tanaman di lingkungan yang tidak mendukung pertanian
            konvensional, seperti di dalam ruangan atau dalam ruang terbatas.
            Ini adalah teknik yang umum digunakan dalam budidaya tanaman
            sayuran, buah-buahan, dan rempah-rempah, terutama di daerah dengan
            keterbatasan lahan atau masalah kekeringan.
          </p>
        </div>
      </animated.div>
      <div className="relative mt-5">
        <animated.h1
          className="font-bold text-center mb-10 text-xl md:text-3xl mt-10"
          style={animation1}
        >
          Bersama Shafa Farm Hidroponik?
        </animated.h1>
        <div className="mb-10">
          <ShafaAnimate />
        </div>
        <animated.div
          className="grid md:grid-cols-2 md:gap-5 mb-10"
          style={animationCard}
        >
          <div className="bg-gradient-to-t from-green-400 to-green-300 transition-all duration-1000 shadow rounded-lg hover:shadow-lg mx-5 md:ml-20 my-2 md:my-10 pb-10">
            <div className="flex items-center mx-auto text-center rounded p-1 font-bold mt-5 bg-green-400 w-64 shadow">
              <span className="material-symbols-outlined mr-3 p-2 bg-white rounded-full">
                unknown_document
              </span>
              <span className="bg-white p-2 rounded">
                Shafa Farm Hidroponik
              </span>
            </div>
            <p className="px-10 pt-8 md:pb-20 text-center text-justify indent-8">
              Sejak tahun 2020 Shafa Farm Hidroponik telah memulai bisnis dengan
              sistem pertanian hidroponik, seperti menjual sayur hidroponik
              mulai dari partai kecil hingga partai besar. Buah melon pada Shafa
              Farm Hidroponik dapat bersaing dengan kualitas yang ada di
              minimarket
            </p>
          </div>
          <div className="bg-gradient-to-t from-red-400 to-red-300 transition-all duration-1000 shadow rounded-lg hover:shadow-lg mx-5 md:mr-20 my-2 md:my-10 pb-10">
            <div className="flex items-center mx-auto text-center rounded p-1 font-bold mt-5 bg-red-400 w-64 shadow">
              <span className="material-symbols-outlined mr-3 p-2 bg-white rounded-full">
                tooltip
              </span>
              <span className="bg-white p-2 pr-16 rounded">Komitmen Kami</span>
            </div>
            <p className="px-10 pt-8 md:pb-20 text-center text-justify indent-8">
              Shafa Farm Hidroponik berkomitmen memberikan melon berkualitas
              terbaik yang dihasilkan melalui metode hidroponik kualitas produk
              menjaga kesegaran buah.
            </p>
          </div>
          <div className="bg-gradient-to-t from-yellow-400 to-yellow-300 transition-all duration-1000 rounded-lg shadow hover:shadow-lg mx-5 md:ml-20 my-2 md:my-10 pb-10">
            <div className="flex items-center mx-auto text-center rounded p-1 font-bold mt-5 bg-yellow-400 w-64 shadow">
              <span className="material-symbols-outlined mr-3 p-2 bg-white rounded-full">
                group
              </span>
              <span className="bg-white p-2 rounded pr-5">
                Ketenagakerjaan Tim
              </span>
            </div>
            <p className="px-10 pt-8 md:pb-20 text-center text-justify indent-8">
              Shafa Farm Hidroponik bersama tim yang ahli dibidangnya, sehingga
              menciptakan lingkungan yang selaras dalam menghasilkan produk yang
              berkualitas
            </p>
          </div>
          <div className="bg-gradient-to-t from-indigo-400 to-indigo-300 transition-all duration-1000 rounded-lg shadow hover:shadow-lg mx-5 md:mr-20 my-2 md:my-10 pb-10">
            <div className="flex items-center mx-auto text-center rounded p-1 font-bold mt-5 bg-indigo-400 w-64 shadow">
              <span className="material-symbols-outlined mr-3 p-2 bg-white rounded-full">
                construction
              </span>
              <span className="bg-white p-2 rounded pr-16">Prasarana Kami</span>
            </div>
            <p className="px-10 pt-8 md:pb-20 text-center text-justify indent-8">
              Shafa Farm Hidroponik memiliki prasarana yang lengkap serta luas
              lahan kurang lebih satu hektar, dengan sistem perarian yang baik,
              pemberian nutrisi yang lengkap.
            </p>
          </div>
        </animated.div>
        <animated.div
          className="bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg mx-5 md:mx-20 border rounded-lg mb-20"
          style={animationCard1}
        >
          <h1 className="text-white font-bold text-center mb-10 text-xl md:text-3xl mt-10">
            Produk Shafa Farm Hidroponik?
          </h1>
          <div className="grid md:grid-cols-3 md:gap-10 mb-20 px-10">
            <div className="bg-white w-full h-24 transition-all duration-1000 flex items-center shadow rounded-lg p-5 hover:shadow-lg my-5">
              <DeliciousAnimate />
              <h1 className="text-xs md:text-sm font-bold ml-10">
                Produk Segar
              </h1>
            </div>
            <div className="bg-white w-full h-24 transition-all duration-1000 flex items-center shadow rounded-lg p-5 hover:shadow-lg my-5">
              <SelectedAnimate />
              <h1 className="text-xs md:text-sm font-bold ml-16">
                Produk Terseleksi
              </h1>
            </div>
            <div className="bg-white w-full h-24 transition-all duration-1000 flex items-center shadow rounded-lg p-5 hover:shadow-lg my-5">
              <PremiumAnimate />
              <h1 className="text-xs md:text-sm font-bold ml-10">
                Produk Premium
              </h1>
            </div>
          </div>
        </animated.div>
      </div>
    </div>
  );
}

export default Home;
