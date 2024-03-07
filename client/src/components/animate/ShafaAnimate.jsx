import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../../assets/animate/shafa.json";

function ShafaAnimate() {
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

export default ShafaAnimate;
