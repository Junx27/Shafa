import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../../assets/animate/HeroAnimate.json";

function HeroAnimate() {
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

export default HeroAnimate;
