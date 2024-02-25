import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

function Promo() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const produkList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/produk/status/promo"
      );
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
    <div className="mx-20 bg-white rounded-[20px] mb-32 py-2">
      <Slider {...settings} className="mt-5 mx-10 grid grid-cols-4 gap-10">
        {data.map((row, index) => (
          <div
            key={index}
            className={`rounded rounded-lg mb-5 transition-all duration-1000 shadow-md hover:shadow-lg`}
            onClick={() => navigate("/produkkonsumen")}
          >
            <div>
              <img
                src={
                  row.gambar_produk === "belum"
                    ? "http://localhost:5000/images/defaultProductImage.jpg"
                    : row.gambar_produk
                }
                alt=""
                className="rounded-t-lg transition-all duration-1000 hover:brightness-75 object-cover h-[200px] w-[300px]"
              />
              <div className="flex utems-center my-2">
                <h1 className="font-bold mx-5">{row.nama_produk}</h1>
                <h1 className="bg-lime-400 p-1 text-xs rounded">
                  {row.status_produk}
                </h1>
              </div>
              <div className="flex justify-between">
                <p className="mx-5 text-justify mb-5 font-light text-sm">
                  {formatRupiah(row.harga_produk)},00/Kg
                </p>
                <span className="material-symbols-outlined mr-5 cursor-pointer hover:text-lime-600">
                  read_more
                </span>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Promo;
