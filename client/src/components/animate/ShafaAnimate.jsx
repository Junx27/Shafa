import Lottie from "react-lottie";
import animationData from "../../assets/animate/shafa.json";

function ShafaAnimate() {
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
      <Lottie options={defaultOptions} height={150} width={150} />
    </div>
  );
}

export default ShafaAnimate;
