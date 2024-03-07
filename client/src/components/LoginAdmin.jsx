import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin, reset } from "../features/AuthSlice.js";
import Logo from "../components/animate/LogoLogin.jsx";

function LoginAdmin() {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (user || isSuccess) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(loginAdmin({ email, password }));
  };

  return (
    <form
      onSubmit={Auth}
      className="text-xs border p-5 md:p-10 md:mx-auto w-[350px] md:w-[400px] md:h-[500px] bg-white rounded-[20px] shadow-lg"
    >
      <Logo />

      {isError && (
        <p className="text-[10px] text-red-500 absolute mt-1">{message}</p>
      )}
      <div className="grid grid-flow-row auto-rows-max mt-5">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-3 p-3 rounded-lg border border-green-400"
          placeholder="Masukan email"
          required
        />
      </div>
      <div className="grid grid-flow-row auto-rows-max mt-10 relative">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type={passwordVisible ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-3 p-3 rounded-lg border border-green-400"
          placeholder="*****"
          required
        />
        <button
          onClick={togglePasswordVisibility}
          className="absolute top-10 right-5"
          type="button"
        >
          <span className="material-symbols-outlined text-gray-400 text-xs">
            {passwordVisible ? "visibility_off" : "visibility"}
          </span>
        </button>
      </div>
      <div className="mt-5 flex justify-center">
        <button
          className="transition-all duration-1000 bg-green-400 hover:bg-green-300 py-3 px-8 rounded-md mt-10 mx-auto text-[8px] md:text-xs"
          type="submit"
        >
          {isLoading ? "Loading.." : "Login"}
        </button>
      </div>
    </form>
  );
}

export default LoginAdmin;
