import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../../assets/animate/HeroAnimate1.json";

function HeroAnimate1() {
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

export default HeroAnimate1;
