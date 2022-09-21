import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import swal from "sweetalert";

const CompanyStatus = () => {
  const { id } = useParams();
  const [statusData, setStatusData] = useState();
  const handleStatus = (e) => {
    e.preventDefault();
    const status = e.target.status.value;
    const inputData = {
      status,
    };
    console.log(inputData);
    if (status) {
      fetch(`http://localhost:5000/companies/${id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(inputData),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          swal("Yayy", "Status Updated Successfully", "success");
        });
    }
    e.target.reset();
  }

  useEffect(() => {
    fetch(`http://localhost:5000/companies/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setStatusData(data);
      });
  }, [id]);
  
  return (
    <div>
      <span className="text-5xl text-gray-300">{statusData?.status}</span>
      <form onSubmit={handleStatus}>
        <div className="form-control w-[200px]">
          <label className="label">
            <span className="label-text text-green-400">Update Status</span>
          </label>
          <select name="status" className="select select-bordered">
            <option disabled selected>
              Select Status
            </option>
            <option>Processing</option>
            <option>Completed</option>
          </select>
        </div>

        <div className=" mt-10">
          <button type="submit" className="w-[200px] btn btn-outline btn-primary">
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompanyStatus;
