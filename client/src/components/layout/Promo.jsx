import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

function Promo() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const produkList = async () => {
    try {
      const response = await axios.get("http://localhost:5000/produk");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    produkList();
  }, []);
  const formatRupiah = (number) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
    return formatter.format(number);
  };
  const settings = {
    className: "slider variable-width",
    dots: false,
    infinite: true,
    centerMode: false,
    slidesToShow: 1,
    slidesToScroll: 3,
    variableWidth: true,
    autoplay: true,
    speed: 20000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };
  return (
    <div className="mt-8 mx-10">
      <hr className="h-px border-0 bg-lime-300 mx-32" />
      <h1 className="font-bold bg-lime-300 w-20 p-2 mx-auto text-center rounded-b-lg shadow">
        Promo
      </h1>
      <Slider {...settings} className="mt-10">
        {data.map((row, index) => (
          <div
            key={index}
            className={`rounded rounded-lg mb-10 transition-all duration-1000 shadow-md hover:shadow-lg ${
              row.status_produk === "promo" ? "visible" : "invisible"
            }`}
            onClick={() => navigate("/produkkonsumen")}
          >
            {row.status_produk === "promo" && (
              <div>
                <img
                  src={
                    row.gambar_produk === "belum"
                      ? "http://localhost:5000/images/defaultProductImage.jpg"
                      : row.gambar_produk
                  }
                  alt=""
                  className="rounded-t-lg transition-all duration-1000 hover:brightness-75 object-cover h-48 w-96"
                />
                <h1 className="text-xl font-bold mx-5 my-2">
                  {row.nama_produk}
                </h1>
                <div className="flex justify-between">
                  <p className="mx-5 text-justify mb-5 text-red-500 font-light">
                    {formatRupiah(row.harga_produk)},00/Kg
                  </p>
                  <span className="material-symbols-outlined mr-5 cursor-pointer hover:text-lime-600">
                    read_more
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Promo;
