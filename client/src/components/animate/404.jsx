import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../../assets/animate/404.json";

function Animate404() {
  return (
    <div>
      <Player
        autoplay
        loop
        src={animationData}
        style={{ height: "400px", width: "400px" }}
      />
    </div>
  );
}

export default Animate404;
