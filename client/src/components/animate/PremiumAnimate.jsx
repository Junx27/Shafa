import Lottie from "react-lottie";
import animationData from "../../assets/animate/Premium.json";

function PremiumAnimate() {
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
      <Lottie options={defaultOptions} height={80} width={80} />
    </div>
  );
}

export default PremiumAnimate;
