import Admin from "../../components/Admin";
import SideNavbar from "../../components/SideNavbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { meAdmin } from "../../features/AuthSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import Table from "../../components/Table";

function Konsumen() {
  const [hasil, setHasil] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(meAdmin());
  }, [dispatch]);
  useEffect(() => {
    if (isError) {
      navigate("/admin");
    }
  }, [isError, navigate]);
  const fetchData = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setHasil(response.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const sortedKonsumen = [...hasil].sort((a, b) =>
    a.nama.localeCompare(b.nama)
  );

  const filteredKonsumen = sortedKonsumen.filter((row) =>
    row.nama.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const konsumenTerdaftar = sortedKonsumen.filter(
    (row) => row.status_konsumen.toLowerCase() === "terdaftar"
  );

  const konsumenBelum = sortedKonsumen.filter(
    (row) => row.status_konsumen.toLowerCase() === "belum"
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="">
      <SideNavbar />
      <Admin />
      <div className="mt-5 ms-80 pl-6 mr-10">
        <hr className="h-px border-0 bg-lime-200 mb-5" />
        <div className="flex justify-between items-center">
          <div className="flex flex-row">
            <span className="material-symbols-outlined text-lime-500">
              person_check
            </span>
            <h1 className="ml-5">Managemen konsumen</h1>
          </div>
          <div className="mr-5 flex flex-row">
            <p className="text-gray-600 mx-2 flex">
              Jumlah Konsumen:{" "}
              <p className="font-bold mx-2">{hasil.length} Orang</p>
            </p>
            <p className="text-gray-600 mx-2 flex">
              Terdaftar:{" "}
              <p className="font-bold mx-2">{konsumenTerdaftar.length} Orang</p>
            </p>
            <p className="text-gray-600 mx-2 flex">
              Belum:{" "}
              <p className="font-bold mx-2">{konsumenBelum.length} Orang</p>
            </p>
          </div>
          <div className="right-10">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Cari konsumen..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="p-2 border border-lime-300 rounded-lg outline-lime-400 text-xs"
              />
              <button onClick={() => window.location.reload()}>
                <span className="material-symbols-outlined ml-2 bg-lime-300 p-2 rounded-full text-[17px]">
                  autorenew
                </span>
              </button>
            </div>
          </div>
        </div>
        <Table data={filteredKonsumen} />
      </div>
    </div>
  );
}

export default Konsumen;
