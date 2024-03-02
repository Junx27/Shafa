import Lottie from "react-lottie";
import animationData from "../../assets/animate/paymentAnimate.json";

function PaymentAnimateHistory() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={100} width={100} />
    </div>
  );
}

export default PaymentAnimateHistory;
