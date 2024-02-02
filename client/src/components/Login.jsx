import { useState } from "react";
import Logo from "../assets/images/shafa.png";

function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <div className="mx-auto p-10 box-login border border-lime-200 shadow-lg shadow">
      <img src={Logo} className="w-16 mx-auto" alt="" />
      <div className="grid grid-flow-row auto-rows-max mt-16">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          className="mt-3 p-4 rounded-lg border border-lime-500"
          required
        />
      </div>
      <div className="grid grid-flow-row auto-rows-max mt-10 relative">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type={passwordVisible ? "text" : "password"}
          className="mt-3 p-4 rounded-lg border border-lime-500"
          required
        />
        <button
          onClick={togglePasswordVisibility}
          className="absolute top-14 right-5"
        >
          <span className="material-symbols-outlined text-lime-300">
            {passwordVisible ? "visibility_off" : "visibility"}
          </span>
        </button>
      </div>
      <div className="flex justify-center">
        <button className="bg-lime-300 py-3 px-8 rounded-md mt-10 mx-auto">
          Login
        </button>
      </div>
      <div className="mt-10 text-center">
        <p>
          Belum Punya Akun, <span className="text-sky-400">Register ?</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
