import SideNavbar from "../../components/SideNavbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { meAdmin } from "../../features/AuthSlice";
import { useEffect } from "react";
import DataKonsumen from "../../components/layout/EditKonsumen";

function EditKonsumen() {
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

  return (
    <div className="">
      <SideNavbar />
      <div className="mt-5 ms-80 pl-6 mr-10">
        <hr className="h-px border-0 bg-lime-200 mb-5" />
        <div className="flex justify-between mx-5">
          <div className="flex flex-row py-2">
            <span className="material-symbols-outlined text-lime-400">
              person_edit
            </span>
            <h1 className="text ml-5">Edit Konsumen</h1>
          </div>
          <div
            className="flex flex-row bg-red-400 hover:bg-red-500 mr-5 py-2 rounded cursor-pointer"
            onClick={() => navigate("/konsumen")}
          >
            <span className="material-symbols-outlined px-2">backspace</span>
            <h1 className="text px-2">Cancel</h1>
          </div>
        </div>
      </div>
      <DataKonsumen />
    </div>
  );
}

export default EditKonsumen;
