import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../../assets/animate/Plants.json";

function PlantsMobile() {
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

export default PlantsMobile;
