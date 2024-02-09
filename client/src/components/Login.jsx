import { useEffect, useState } from "react";
import Logo from "../assets/images/shafa.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, reset } from "../features/AuthSlice.js";
function Login() {
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
      navigate("/home");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <form
      onSubmit={Auth}
      className="mx-auto p-10 box-login border border-lime-200 shadow-lg shadow"
    >
      <img src={Logo} className="w-16 mx-auto saturate-200" alt="" />
      {isError && <p className="text-red-500 absolute mt-7">{message}</p>}
      <div className="grid grid-flow-row auto-rows-max mt-16">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-3 p-4 rounded-lg border border-lime-500"
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
          className="mt-3 p-4 rounded-lg border border-lime-500"
          required
        />
        <button
          onClick={togglePasswordVisibility}
          className="absolute top-14 right-5"
          type="button"
        >
          <span className="material-symbols-outlined text-lime-300">
            {passwordVisible ? "visibility_off" : "visibility"}
          </span>
        </button>
      </div>
      <div className="flex justify-center">
        <button
          className="bg-lime-300 py-3 px-8 rounded-md mt-10 mx-auto"
          type="submit"
        >
          {isLoading ? "Loading.." : "Login"}
        </button>
      </div>
      <div className="mt-10 text-center">
        <p>
          Belum Punya Akun,{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-sky-400"
          >
            Register ?
          </button>
        </p>
      </div>
    </form>
  );
}

export default Login;
