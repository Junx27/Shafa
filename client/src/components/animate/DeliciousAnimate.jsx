import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../../assets/animate/delicious.json";
function DeliciousAnimate() {
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

export default DeliciousAnimate;
