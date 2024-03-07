import animationData from "../../assets/animate/shafa.json";
import { Player } from "@lottiefiles/react-lottie-player";
function Logo() {
  return (
    <div>
      <Player
        autoplay
        loop
        src={animationData}
        style={{ height: "40px", width: "40px" }}
      />
    </div>
  );
}

export default Logo;
