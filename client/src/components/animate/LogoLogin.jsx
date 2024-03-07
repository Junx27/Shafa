import animationData from "../../assets/animate/shafa.json";
import { Player } from "@lottiefiles/react-lottie-player";
function LogoLogin() {
  return (
    <div>
      <Player
        autoplay
        loop
        src={animationData}
        style={{ height: "80px", width: "80px" }}
      />
    </div>
  );
}

export default LogoLogin;
