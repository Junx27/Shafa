import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../../assets/animate/LandingPage.json";

function LandingPageAnimateMobile() {
  return (
    <div>
      <Player
        autoplay
        loop
        src={animationData}
        style={{ height: "300px", width: "300px" }}
      />
    </div>
  );
}

export default LandingPageAnimateMobile;
