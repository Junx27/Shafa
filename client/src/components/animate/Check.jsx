import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../../assets/animate/check.json";

function Check() {
  return (
    <div>
      <Player
        autoplay
        loop
        src={animationData}
        style={{ height: "200px", width: "200px" }}
      />
    </div>
  );
}

export default Check;
