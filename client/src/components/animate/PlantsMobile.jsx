import Lottie from "react-lottie";
import animationData from "../../assets/animate/Plants.json";

function PlantsMobile() {
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
      <Lottie options={defaultOptions} height={300} width={300} />
    </div>
  );
}

export default PlantsMobile;
