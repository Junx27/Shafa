import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../../assets/animate/Promo.json";

function PromoAnimate() {
  return (
    <div>
      <Player
        autoplay
        loop
        src={animationData}
        style={{ height: "60px", width: "60px" }}
      />
    </div>
  );
}

export default PromoAnimate;
