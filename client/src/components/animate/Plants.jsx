import Lottie from "react-lottie";
import animationData from "../../assets/animate/Plants.json";

function Plants() {
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
      <Lottie options={defaultOptions} height={500} width={500} />
    </div>
  );
}

export default Plants;
