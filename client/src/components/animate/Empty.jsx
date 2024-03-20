import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../../assets/animate/Empty.json";
function Empty() {
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

export default Empty;
