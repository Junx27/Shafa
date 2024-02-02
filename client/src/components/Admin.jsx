import { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
  const [profile, setProfile] = useState([]);
  const fetchProfile = async () => {
    const response = await axios.get("http://localhost:5000/adminme");
    setProfile(response.data);
  };

  useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <div className="flex justify-end pr-10 pt-5 sticky top-0 ml-80 backdrop-blur-md bg-white/30 z-50">
      <div className="flex flex-row items-center">
        Hi,
        <p className="font-bold ml-2 capitalize">{profile.nama}</p>
        <img src={profile.image} alt="" className="w-10 ml-5 rounded-full" />
      </div>
    </div>
  );
}

export default Admin;
