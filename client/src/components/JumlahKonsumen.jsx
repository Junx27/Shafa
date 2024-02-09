import axios from "axios";
import { useEffect, useState } from "react";

function JumlahKonsumen() {
  const [hasil, setHasil] = useState([]);
  const fetchData = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setHasil(response.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const konsumenTerdaftar = hasil.filter(
    (row) => row.status_konsumen.toLowerCase() === "terdaftar"
  );
  const konsumenBelum = hasil.filter(
    (row) => row.status_konsumen.toLowerCase() === "belum"
  );
  return <div className="font-medium">{hasil.length} Konsumen</div>;
}

export default JumlahKonsumen;
