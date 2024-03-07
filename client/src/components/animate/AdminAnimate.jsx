import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../../assets/animate/AdminAnimate.json";

function AdminAnimate() {
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

export default AdminAnimate;
