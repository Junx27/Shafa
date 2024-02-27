import { useNavigate } from "react-router-dom";

function BelumAdaData() {
  const navigate = useNavigate();
  return (
    <div className="mt-10 text-center bg-white">
      <hr className="h-px border-0 bg-lime-200" />
      <div className="flex justify-center">
        <h1 className="font-bold mb-20 text-xl bg-lime-400 w-32 p-2 rounded-b-lg shadow text-center">
          Perhatian!
        </h1>
      </div>
      <span className="material-symbols-outlined text-6xl bg-lime-400 p-2 shadow rounded-full animate-bounce">
        assignment_late
      </span>
      <p className="text-gray-400 mt-5 text-xs">
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
