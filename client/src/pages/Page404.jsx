import { useNavigate } from "react-router-dom";
import Animate404 from "../components/animate/404";

function Page404() {
  const navigate = useNavigate();
  return (
    <div className="mt-20 md:m-32 text-center">
      <Animate404 />
      <button
        className="transition-all duration-1000 text-xs bg-green-400 p-2 rounded shadow hover:shadow-lg"
        onClick={() => navigate("/")}
      >
        Back to home
      </button>
    </div>
  );
}

export default Page404;
