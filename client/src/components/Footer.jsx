import axios from "axios";
import { useState } from "react";
import lokasi from "../assets/images/lokasi.png";
import PopOver from "./layout/PopOver";

function Footer() {
  const [kritik, setKritik] = useState();
  const [openNavigasi, setOpenNavigasi] = useState(false);
  const [openKontak, setOpenKontak] = useState(false);
  const [openKritik, setOpenKritik] = useState(false);

  const saveKritik = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("kritik", kritik);

      await axios.post("http://localhost:5000/kritik", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% px-10 md:px-32 py-8 text-xs">
        <div className="md:hidden">
          <div className="mx-auto">
            <h1 className="font-bold bg-white p-2 rounded shadow text-center">
              Shafa Farm Hidroponik
            </h1>
            <img
              src={lokasi}
              alt=""
              className="transition-all duration-1000 w-[200px] mx-auto md:ml-7 mt-10 rounded-lg hover:shadow-lg"
            />
            <p className="text-xs text-white mt-5 text-center">Scan me!</p>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-10">
            <span
              className="transition-all duration-1000 w-20 py-2 material-symbols-outlined text-xl bg-white shadow text-center rounded hover:bg-black hover:text-white"
              onClick={() => setOpenNavigasi(!openNavigasi)}
            >
              home
            </span>
            <span
              className="transition-all duration-1000 w-20 py-2 material-symbols-outlined text-xl bg-white shadow text-center rounded hover:bg-black hover:text-white"
              onClick={() => setOpenKontak(!openKontak)}
            >
              call
            </span>
            <span
              className="transition-all duration-1000 w-20 py-2 material-symbols-outlined text-xl bg-white shadow text-center rounded hover:bg-black hover:text-white"
              onClick={() => setOpenKritik(!openKritik)}
            >
              mail
            </span>
          </div>
          <div className="mx-auto">
            {openNavigasi && (
              <PopOver>
                <div className="absolute bottom-0 left-0 bg-gradient-to-b from-green-400 to-green-500 w-[500px] p-10">
                  <p
                    onClick={() => setOpenNavigasi(!openNavigasi)}
                    className="transition-all duration-1000 text-xl absolute top-1 left-[70%] hover:bg-black hover:text-white p-2 px-3 rounded"
                  >
                    X
                  </p>
                  <ul
                    className={`mt-5 ${
                      openNavigasi ? "visible" : "hidden md:visible"
                    }`}
                  >
                    <li className="transition-all duration-1000 flex items-center mt-2 cursor-pointer bg-white hover:w-[150px] hover:px-2 w-0 hover:shadow rounded py-1">
                      <span className="material-symbols-outlined mr-2 bg-white p-1 rounded-full shadow">
                        home
                      </span>
                      <a href="/home">Home</a>
                    </li>
                    <li className="transition-all duration-1000 flex items-center mt-2 cursor-pointer bg-white hover:w-[150px] hover:px-2 w-0 hover:shadow rounded py-1">
                      <span className="material-symbols-outlined mr-2 bg-white p-1 rounded-full shadow">
                        description
                      </span>
                      <a href="/produkkonsumen">Produk</a>
                    </li>
                    <li className="transition-all duration-1000 flex items-center mt-2 cursor-pointer bg-white hover:w-[150px] hover:px-2 w-0 hover:shadow rounded py-1">
                      <span className="material-symbols-outlined mr-2 bg-white p-1 rounded-full shadow">
                        shopping_cart_checkout
                      </span>
                      <a href="/keranjang">Keranjang</a>
                    </li>
                    <li className="transition-all duration-1000 flex items-center mt-2 cursor-pointer bg-white hover:w-[150px] hover:px-2 w-0 hover:shadow rounded py-1">
                      <span className="material-symbols-outlined mr-2 bg-white p-1 rounded-full shadow">
                        receipt_long
                      </span>
                      <a href="/riwayatkonsumen">Riwayat</a>
                    </li>
                    <li className="transition-all duration-1000 flex items-center mt-2 cursor-pointer bg-white hover:w-[150px] hover:px-2 w-0 hover:shadow rounded py-1">
                      <span className="material-symbols-outlined mr-2 bg-white p-1 rounded-full shadow">
                        person
                      </span>
                      <a href="/profile">Profile</a>
                    </li>
                    <li className="transition-all duration-1000 flex items-center mt-2 cursor-pointer bg-white hover:w-[150px] hover:px-2 w-0 hover:shadow rounded py-1">
                      <span className="material-symbols-outlined mr-2 bg-white p-1 rounded-full shadow">
                        info
                      </span>
                      <a href="/faq">Faq</a>
                    </li>
                  </ul>
                </div>
              </PopOver>
            )}
          </div>
          <div className="mx-auto">
            {openKontak && (
              <PopOver>
                <div className="absolute bottom-0 left-0 bg-gradient-to-b from-green-400 to-green-500 w-[500px] p-10">
                  <p
                    onClick={() => setOpenKontak(!openKontak)}
                    className="transition-all duration-1000 text-xl absolute top-1 left-[70%] hover:bg-black hover:text-white p-2 px-3 rounded"
                  >
                    X
                  </p>
                  <ul
                    className={`${
                      openKontak ? "visible" : "hidden md:visible"
                    }`}
                  >
                    <li className="transition-all duration-1000 flex items-center mt-2 cursor-pointer bg-white hover:w-[220px] hover:px-2 w-0 hover:shadow rounded py-1">
                      <span className="material-symbols-outlined mr-2 bg-white p-1 rounded-full shadow">
                        email
                      </span>
                      <a href="/faq">shafa@gmail.com</a>
                    </li>
                    <li className="transition-all duration-1000 flex items-center mt-2 cursor-pointer bg-white hover:w-[220px] hover:px-2 w-0 hover:shadow rounded py-1">
                      <span className="material-symbols-outlined mr-2 bg-white p-1 rounded-full shadow">
                        phone
                      </span>
                      <a href="/faq">+6281226319124</a>
                    </li>
                    <li className="transition-all duration-1000 flex items-center mt-2 cursor-pointer bg-white hover:w-[220px] hover:px-2 w-0 hover:shadow rounded py-1">
                      <span className="material-symbols-outlined mr-2 bg-white p-1 rounded-full shadow">
                        map
                      </span>
                      <a href="/faq">ShafaFarmHidroponik</a>
                    </li>
                  </ul>
                </div>
              </PopOver>
            )}
          </div>
          <div className="mx-auto">
            {openKritik && (
              <PopOver>
                <div className="absolute bottom-0 left-0 bg-gradient-to-b from-green-400 to-green-500 w-[500px] p-10">
                  <p
                    onClick={() => {
                      setOpenKritik(!openKritik);
                    }}
                    className="transition-all duration-1000 text-xl absolute top-1 left-[70%] hover:bg-black hover:text-white p-2 px-3 rounded"
                  >
                    X
                  </p>
                  <form
                    onSubmit={saveKritik}
                    className={`${
                      openKritik ? "visible" : "hidden md:visible "
                    }`}
                  >
                    <textarea
                      className="w-[320px] h-[200px] p-2 border border-green-400 rounded-lg outline-none shadow mt-5"
                      value={kritik}
                      maxLength={255}
                      onChange={(e) => setKritik(e.target.value)}
                      required
                    ></textarea>
                    <div className="flex ml-[130px]">
                      <button
                        className="mt-3 text-xs transition-all duration-1000 mt-3 hover:bg-black hover:text-white bg-white text-black py-2 px-4 rounded text-sm  hover:shadow"
                        type="submit"
                      >
                        Kirim
                      </button>
                    </div>
                  </form>
                </div>
              </PopOver>
            )}
          </div>
        </div>
        <div className="hidden md:grid md:grid-cols-4 md:gap-3">
          <div className="mx-auto">
            <h1 className="font-bold bg-white p-2 rounded shadow text-center">
              Shafa Farm Hidroponik
            </h1>
            <img
              src={lokasi}
              alt=""
              className="transition-all duration-1000 w-[200px] mx-auto md:ml-7 mt-10 rounded-lg hover:shadow-lg"
            />
            <p className="text-xs text-white mt-5 ml-24">Scan me!</p>
          </div>
          <div className="ml-20">
            <h1 className="font-bold bg-white w-32 p-2 rounded shadow text-center">
              Navigasi
            </h1>
            <ul className="mt-5">
              <li className="transition-all duration-1000 flex items-center mt-2 cursor-pointer bg-white hover:w-[150px] hover:px-2 w-0 hover:shadow rounded py-1">
                <span className="material-symbols-outlined mr-2 bg-white p-1 rounded-full shadow">
                  home
                </span>
                <a href="/home">Home</a>
              </li>
              <li className="transition-all duration-1000 flex items-center mt-2 cursor-pointer bg-white hover:w-[150px] hover:px-2 w-0 hover:shadow rounded py-1">
                <span className="material-symbols-outlined mr-2 bg-white p-1 rounded-full shadow">
                  description
                </span>
                <a href="/produkkonsumen">Produk</a>
              </li>
              <li className="transition-all duration-1000 flex items-center mt-2 cursor-pointer bg-white hover:w-[150px] hover:px-2 w-0 hover:shadow rounded py-1">
                <span className="material-symbols-outlined mr-2 bg-white p-1 rounded-full shadow">
                  shopping_cart_checkout
                </span>
                <a href="/keranjang">Keranjang</a>
              </li>
              <li className="transition-all duration-1000 flex items-center mt-2 cursor-pointer bg-white hover:w-[150px] hover:px-2 w-0 hover:shadow rounded py-1">
                <span className="material-symbols-outlined mr-2 bg-white p-1 rounded-full shadow">
                  receipt_long
                </span>
                <a href="/riwayatkonsumen">Riwayat</a>
              </li>
              <li className="transition-all duration-1000 flex items-center mt-2 cursor-pointer bg-white hover:w-[150px] hover:px-2 w-0 hover:shadow rounded py-1">
                <span className="material-symbols-outlined mr-2 bg-white p-1 rounded-full shadow">
                  person
                </span>
                <a href="/profile">Profile</a>
              </li>
              <li className="transition-all duration-1000 flex items-center mt-2 cursor-pointer bg-white hover:w-[150px] hover:px-2 w-0 hover:shadow rounded py-1">
                <span className="material-symbols-outlined mr-2 bg-white p-1 rounded-full shadow">
                  info
                </span>
                <a href="/faq">Faq</a>
              </li>
            </ul>
          </div>
          <div className="ml-10">
            <h1 className="font-bold bg-white w-32 p-2 rounded shadow text-center">
              Kontak
            </h1>
            <ul className="mt-5">
              <li className="transition-all duration-1000 flex items-center mt-2 cursor-pointer bg-white hover:w-[220px] hover:px-2 w-0 hover:shadow rounded py-1">
                <span className="material-symbols-outlined mr-2 bg-white p-1 rounded-full shadow">
                  email
                </span>
                <a href="/faq">shafa@gmail.com</a>
              </li>
              <li className="transition-all duration-1000 flex items-center mt-2 cursor-pointer bg-white hover:w-[220px] hover:px-2 w-0 hover:shadow rounded py-1">
                <span className="material-symbols-outlined mr-2 bg-white p-1 rounded-full shadow">
                  phone
                </span>
                <a href="/faq">+6281226319124</a>
              </li>
              <li className="transition-all duration-1000 flex items-center mt-2 cursor-pointer bg-white hover:w-[220px] hover:px-2 w-0 hover:shadow rounded py-1">
                <span className="material-symbols-outlined mr-2 bg-white p-1 rounded-full shadow">
                  map
                </span>
                <a href="/faq">ShafaFarmHidroponik</a>
              </li>
            </ul>
          </div>
          <div className="">
            <h1 className="font-bold bg-white w-32 p-2 rounded shadow text-center">
              Kritik & Saran
            </h1>
            <form onSubmit={saveKritik} className="mt-5">
              <textarea
                className="w-[320px] h-[150px] p-2 border border-green-400 rounded-lg outline-none shadow"
                value={kritik}
                maxLength={255}
                onChange={(e) => setKritik(e.target.value)}
                required
              ></textarea>
              <div className="flex justify-end -mr-8">
                <button
                  className="text-xs transition-all duration-1000 mt-3 hover:bg-black hover:text-white bg-white text-black py-2 px-4 rounded text-sm  hover:shadow"
                  type="submit"
                >
                  Kirim
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
