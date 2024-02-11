import axios from "axios";
import { useEffect, useState } from "react";

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
    <div className="px-32 py-10">
      <div className="grid grid-cols-4 gap-10">
        <div className="px-5">
          <h1 className="font-bold">Shafa Farm Hidroponik</h1>
          <p className="mt-5 text-justify indent-8">
            Shafa Farm Hidroponik berkomitmen memberikan melon berkualitas
            terbaik yang dihasilkan melalui metode hidroponik kualitas produk.
          </p>
        </div>
        <div className="px-5 ml-20">
          <h1 className="font-bold">Navigasi</h1>
          <ul className="mt-5">
            <li className="flex items-center mt-2 cursor-pointer hover:text-lime-400">
              <span className="material-symbols-outlined mr-5">
                arrow_right_alt
              </span>
              <a href="/home">Home</a>
            </li>
            <li className="flex items-center mt-2 cursor-pointer hover:text-lime-400">
              <span className="material-symbols-outlined mr-5">
                arrow_right_alt
              </span>
              <a href="/produkkonsumen">Produk</a>
            </li>
            <li className="flex items-center mt-2 cursor-pointer hover:text-lime-400">
              <span className="material-symbols-outlined mr-5">
                arrow_right_alt
              </span>
              <a href="/keranjang">Keranjang</a>
            </li>
            <li className="flex items-center mt-2 cursor-pointer hover:text-lime-400">
              <span className="material-symbols-outlined mr-5">
                arrow_right_alt
              </span>
              <a href="/riwayatkonsumen">History</a>
            </li>
            <li className="flex items-center mt-2 cursor-pointer hover:text-lime-400">
              <span className="material-symbols-outlined mr-5">
                arrow_right_alt
              </span>
              <a href="/profile">Profile</a>
            </li>
            <li className="flex items-center mt-2 cursor-pointer hover:text-lime-400">
              <span className="material-symbols-outlined mr-5">
                arrow_right_alt
              </span>
              <a href="/faq">Faq</a>
            </li>
          </ul>
        </div>
        <div className="px-5 ml-10">
          <h1 className="font-bold">Sosial Media</h1>
          <ul className="mt-5">
            <li>
              <a href="/home">Instagram</a>
            </li>
            <li>
              <a href="/produkkonsumen">Tik Tok</a>
            </li>
            <li>
              <a href="/keranjang">Facebook</a>
            </li>
          </ul>
        </div>
        <div className="px-5">
          <h1 className="font-bold">Kritik & Saran</h1>
          <form onSubmit={saveKritik} className="mt-5">
            <textarea
              className="w-[250px] h-[150px] p-2 border border-lime-400 rounded"
              value={kritik}
              onChange={(e) => setKritik(e.target.value)}
            ></textarea>
            <div className="flex justify-end -mr-5">
              <button
                className="mt-3 bg-lime-300 p-2 rounded hover:bg-lime-400"
                type="submit"
              >
                Kirim
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Footer;
