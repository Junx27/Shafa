import { useEffect, useState } from "react";
import axios from "axios";
import { animated, useSpring } from "react-spring";

function Admin() {
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const startLoading = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 800);
    };
    startLoading();
  }, []);
  const animation = useSpring({
    opacity: loading ? 0 : 1,
    marginRight: loading ? -10 : 0,
  });
  const fetchProfile = async () => {
    const response = await axios.get("http://localhost:5000/adminme");
    setProfile(response.data);
  };

  useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <div>
      {loading ? (
        <div></div>
      ) : (
        <animated.div style={animation} className="bg-none">
          <div className="text-xs flex flex-row items-center">
            Hi,
            <p className="font-bold ml-2 capitalize">{profile.nama}</p>
            <img
              src={
                profile.image === "belum"
                  ? "http://localhost:5000/images/defaultProfile.png"
                  : profile.image
              }
              alt=""
              className="w-10 ml-5 rounded-full"
            />{" "}
          </div>
        </animated.div>
      )}
    </div>
  );
}

export default Admin;
