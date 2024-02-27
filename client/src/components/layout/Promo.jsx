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
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="bg-white rounded-[20px] overflow-hidden">
      <Slider {...settings} className="pt-3 md:mx-3 grid md:grid-cols-4">
        {data.map((row, index) => (
          <div
            key={index}
            className={`rounded rounded-lg mb-5 transition-all duration-1000 shadow-md hover:shadow-lg`}
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
              <div className="flex justify-between items-center pb-5">
                <p className="mx-5 text-justify font-light text-sm">
                  {formatRupiah(row.harga_produk)},00/Kg
                </p>
                <span
                  className=" transition-all duration-1000 material-symbols-outlined mr-5 cursor-pointer p-1 rounded hover:bg-black hover:text-white text-sm"
                  onClick={() => navigate("/produkkonsumen")}
                >
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
