import Lottie from "react-lottie";
import animationData from "../../assets/animate/HeroAnimate1.json";

function HeroAnimate1Mobile() {
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

export default HeroAnimate1Mobile;
