import axios from "axios";
import { useState } from "react";

function Footer() {
  const [kritik, setKritik] = useState();
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
    <div className="px-32 py-8 bg-lime-400 rounded-t-[30px] text-xs">
      <div className="grid grid-cols-4 gap-3">
        <div className="">
          <h1 className="font-bold bg-white w-64 p-2 rounded shadow text-center">
            Shafa Farm Hidroponik
          </h1>
          <p className="mt-5 text-justify indent-8 text-md">
            Shafa Farm Hidroponik berkomitmen memberikan melon berkualitas
            terbaik yang dihasilkan melalui metode hidroponik kualitas produk
            menjaga kesegaran buah.
          </p>
          <p className="mt-10 text-md text-justify">
            Alamat : Jl. Panunggalan, Kecamatan Pengadegan, Kabupaten
            Purbalingga, Jawa Tengah. 53356 Indonesia
          </p>
          <p className="mt-5 text-xs text-white text-end">Copyright@2023</p>
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
              <a href="/riwayatkonsumen">History</a>
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
              className="w-[320px] h-[150px] p-2 border border-lime-400 rounded-lg outline-none shadow"
              value={kritik}
              maxLength={255}
              onChange={(e) => setKritik(e.target.value)}
              required
            ></textarea>
            <div className="flex justify-end -mr-10">
              <button
                className="mt-3 bg-white p-2 rounded text-sm hover:bg-lime-300 hover:shadow"
                type="submit"
              >
                Kirim kritik
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Footer;
