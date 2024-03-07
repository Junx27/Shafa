import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../../assets/animate/LandingPage.json";

function LandingPageAnimate() {
  return (
    <div>
      <Player
        autoplay
        loop
        src={animationData}
        style={{ height: "500px", width: "500px" }}
      />
    </div>
  );
}

export default LandingPageAnimate;
