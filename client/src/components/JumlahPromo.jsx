import axios from "axios";
import { useEffect, useState } from "react";

function JumlahPromo() {
  const [hasil, setHasil] = useState([]);
  const fetchData = async () => {
    const response = await axios.get("http://localhost:5000/promo");
    setHasil(response.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return <div className="font-medium">{hasil.length} Active</div>;
}

export default JumlahPromo;
