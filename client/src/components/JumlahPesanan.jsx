import axios from "axios";
import { useEffect, useState } from "react";

function JUmlahPesanan() {
  const [hasil, setHasil] = useState([]);
  const fetchData = async () => {
    const response = await axios.get("http://localhost:5000/pembelians");
    setHasil(response.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return <div className="font-medium">{hasil.length} Active</div>;
}

export default JUmlahPesanan;
