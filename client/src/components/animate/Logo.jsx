import Lottie from "react-lottie";
import animationData from "../../assets/animate/shafa.json";

function Logo() {
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
      <Lottie options={defaultOptions} height={40} width={40} />
    </div>
  );
}

export default Logo;
