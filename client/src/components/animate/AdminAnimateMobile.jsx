import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../../assets/animate/AdminAnimate.json";

function AdminAnimateMobile() {
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

export default AdminAnimateMobile;
