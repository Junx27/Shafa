import logo from "../../assets/images/shafa.png";

function Home() {
  return (
    <div className="mt-10">
      <h1 className="font-bold text-center mb-5 md:mb-20 text-xl md:text-3xl">
        Apa itu pertanian Hidroponik?
      </h1>
      <div className="flex flex-col mx-5 md:flex-row md:mx-32 mb-20">
        <img
          src="https://images.unsplash.com/photo-1598025381636-6933369652c6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fG1lbG9ufGVufDB8fDB8fHww"
          alt=""
          className="md:w-96 md:h-96 object-cover rounded-lg"
        />
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
      </div>
      <div className=" bg-[url('http://localhost:5000/images/bghome.jpg')] bg-no-repeat bg-cover bg-center w-[100%] h-[200px] md:h-[300px] md:h-[500px] z-0 bg-fixed top-0 z-0 relative rounded-b-[20px] shadow-lg"></div>
      <div className="mt-5">
        <h1 className="font-bold text-center mb-10 text-xl md:text-3xl mt-10">
          Bersama Shafa Farm Hidroponik?
        </h1>
        <img
          src={logo}
          alt=""
          className=" w-20 h-20 md:w-[100px] md:h-[100px] saturate-200 mx-auto mb-10"
        />
        <div className="grid md:grid-cols-2 md:gap-5 mb-10">
          <div className="transition-all duration-1000 shadow rounded hover:shadow-lg mx-5 md:ml-20 my-2 md:my-10 pb-10">
            <div className="flex items-center mx-auto text-center rounded p-1 font-bold mt-5 bg-lime-400 w-64 shadow">
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
          <div className="transition-all duration-1000 shadow rounded hover:shadow-lg mx-5 md:mr-20 my-2 md:my-10 pb-10">
            <div className="flex items-center mx-auto text-center rounded p-1 font-bold mt-5 bg-lime-400 w-64 shadow">
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
          <div className="transition-all duration-1000 rounded shadow hover:shadow-lg mx-5 md:ml-20 my-2 md:my-10 pb-10">
            <div className="flex items-center mx-auto text-center rounded p-1 font-bold mt-5 bg-lime-400 w-64 shadow">
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
          <div className="transition-all duration-1000 rounded shadow hover:shadow-lg mx-5 md:mr-20 my-2 md:my-10 pb-10">
            <div className="flex items-center mx-auto text-center rounded p-1 font-bold mt-5 bg-lime-400 w-64 shadow">
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
        </div>
        <div className="shadow-lg mx-5 md:mx-20 border rounded-lg mb-20">
          <h1 className="font-bold text-center mb-10 text-xl md:text-3xl mt-10">
            Produk Shafa Farm Hidroponik?
          </h1>
          <div className="grid md:grid-cols-3 md:gap-10 mb-20 px-10">
            <div className="w-full h-24 transition-all duration-1000 flex items-center shadow rounded-lg p-5 hover:shadow-lg my-5">
              <span className="material-symbols-outlined text-6xl bg-lime-400 p-2 rounded-full shadow">
                health_and_safety
              </span>
              <h1 className="font-bold ml-10">Produk Higenis</h1>
            </div>
            <div className="w-full h-24 transition-all duration-1000 flex items-center shadow rounded-lg p-5 hover:shadow-lg my-5">
              <span className="material-symbols-outlined text-6xl bg-lime-400 p-2 rounded-full shadow">
                restaurant
              </span>
              <h1 className="font-bold ml-10">Citarasa Terjaga</h1>
            </div>
            <div className="w-full h-24 transition-all duration-1000 flex items-center shadow rounded-lg p-5 hover:shadow-lg my-5">
              <span className="material-symbols-outlined text-6xl bg-lime-400 p-2 rounded-full shadow">
                inventory
              </span>
              <h1 className="font-bold ml-10">Quality Control</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
