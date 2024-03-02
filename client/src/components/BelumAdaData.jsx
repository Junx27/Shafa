import { useNavigate } from "react-router-dom";
import CartAnimate from "./animate/CartAnimate";

function BelumAdaData() {
  const navigate = useNavigate();
  return (
    <div className="mt-10 text-center bg-white">
      <CartAnimate />
      <p className="text-gray-400 mt-5 text-[10px] md:text-xs">
        Belum ada data transaksi silahkan memilih <br />
        produk terlebih dahulu,
        <button
          className="text-black hover:underline ml-1 cursor-pointer"
          onClick={() => navigate("/produkkonsumen")}
        >
          disini!
        </button>
      </p>
    </div>
  );
}

export default BelumAdaData;
