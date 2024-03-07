import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../../assets/animate/HeroAnimate1.json";

function HeroAnimate1Mobile() {
  return (
    <div>
      <Player
        autoplay
        loop
        src={animationData}
        style={{ height: "150px", width: "150px" }}
      />
    </div>
  );
}

export default HeroAnimate1Mobile;
