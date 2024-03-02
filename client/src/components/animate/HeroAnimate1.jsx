import Lottie from "react-lottie";
import animationData from "../../assets/animate/HeroAnimate1.json";

function HeroAnimate1() {
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
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
}

export default HeroAnimate1;
