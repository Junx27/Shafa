import { useNavigate } from "react-router-dom";

function Page404() {
  const navigate = useNavigate();
  return (
    <div className="m-32 text-center">
      <div className="m-10 text-center">
        <hr className="h-px border-0 bg-lime-200" />
        <div className="flex justify-center">
          <h1 className="font-bold mb-20 text-xl bg-lime-400 w-96 p-2 rounded-b-lg shadow">
            Halaman tidak ditemukan!
          </h1>
        </div>
      </div>
      <h1 className="text-[200px] font-bold text-lime-400 animate-bounce">
        404
      </h1>
      <button
        className="bg-lime-400 p-2 rounded"
        onClick={() => navigate("/home")}
      >
        Kembali ke Home
      </button>
    </div>
  );
}

export default Page404;
