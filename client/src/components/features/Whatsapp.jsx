import axios from "axios";
import { useEffect, useState } from "react";
import { admin } from "../../data/data.js";

function Whatsapp() {
  const [wa, setWa] = useState();
  const fetchWa = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/admin/${admin[0].uuid}`
      );
      setWa(response.data.no_tlp);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    fetchWa();
  }, []);
  const [display, setDisplay] = useState(false);
  const changeDisplay = () => {
    let scroll = window.scrollY;
    if (scroll > 30) {
      setDisplay(true);
    } else {
      setDisplay(false);
    }
  };
  useEffect(() => {
    changeDisplay();
    window.addEventListener("scroll", changeDisplay);
  });
  return (
    <div
      className={`hidden md:block transition-all duration-100 fixed bottom-10 ${
        display ? "right-10" : "-right-10"
      }`}
    >
      <a href={`https://wa.me/${wa}`} target="blank">
        <img
          src="wa.png"
          alt=""
          className="transition-all duration-1000 w-10 h-10 rounded-full hover:shadow hover:w-11 hover:h-11"
        />
      </a>
    </div>
  );
}

export default Whatsapp;
