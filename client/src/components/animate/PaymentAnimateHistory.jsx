import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../../assets/animate/paymentAnimate.json";

function PaymentAnimateHistory() {
  return (
    <div>
      <Player
        autoplay
        loop
        src={animationData}
        style={{ height: "100px", width: "100px" }}
      />
    </div>
  );
}

export default PaymentAnimateHistory;
