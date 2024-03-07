import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../../assets/animate/Selected.json";

function SelectedAnimate() {
  return (
    <div>
      <Player
        autoplay
        loop
        src={animationData}
        style={{ height: "50px", width: "50px" }}
      />
    </div>
  );
}

export default SelectedAnimate;
