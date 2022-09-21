import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import { useQuery } from "react-query";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import Loader from "../Loader";

const CompanyStatus = () => {
  const { id } = useParams();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const email = user?.email;
  const { data: admin } = useQuery("admin", () =>
    fetch(`http://localhost:5000/users/${email}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        // refetch();
        return data ;
      })
      );
      
  const handleStatus = (e) => {
    e.preventDefault();
    const status = e.target.status.value;
    const inputData = {
      status,
    };
    console.log(inputData);
    if (status) {
      fetch(`https://visa-processing.onrender.com/companies/${id}`, {
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
  };

  const {
    data: statusData,
    isLoading,
    refetch,
  } = useQuery("statusData", () =>
    fetch(`https://visa-processing.onrender.com/companies/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      );
      refetch();

  if (isLoading) {
    return <Loader />;
  }
  // useEffect(() => {
  //   fetch(`https://visa-processing.onrender.com/companies/${id}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setStatusData(data);
  //     });
  // }, [id]);
if(!user){
  navigate('/login')
}
  return (
    <div>
      <span className="text-5xl text-gray-300">{statusData?.status}</span>
      { admin?.data?.role === "admin" && (
        <>
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
              <button
                type="submit"
                className="w-[200px] btn btn-outline btn-primary"
              >
                Post
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default CompanyStatus;
