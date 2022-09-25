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
    fetch(`https://visa-processing.onrender.com/users/${email}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        refetch();
        return data;
      })
  );
  // refetch();

  const handleStatus = (e) => {
    e.preventDefault();
    const status = e.target.status.value;
    const inputData = {
      status,
    };
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

    if (status === "Completed") {
      fetch(`https://visa-processing.onrender.com/completed`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(statusData),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          swal("Yayy", "Status Completed Successfully", "success");
        });
    }
  };

  const {
    data: statusData,
    refetch,
    isLoading,
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

  if (!user) {
    navigate("/login");
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const price = e.target.price.value;
    console.log(id);
    const inputData = {
      price,
    };
    if (price) {
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

  return (
    <div className="items-center ">
      <div>
        <span className="text-pink-400 text-xl flex justify-center">
          Company : {statusData?.name}
        </span>
      </div>
      <div className="flex justify-center">
        <button
          disabled
          type="button"
          class="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900  rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
        >
          <span className="text-5xl mr-5 p-2.5">{statusData?.status} </span>
          {statusData?.price && (
            <>
              <h1> Per visa :  </h1>
              <span className="text-green-600"> {statusData?.price} Riyal Fixed</span>
            </>
          )}

          {statusData?.status === "Negotiating" && (
            <>
              <svg
                role="status"
                class="inline mr-2 w-6 h-6 text-gray-200 animate-spin dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="#1C64F2"
                />
              </svg>
            </>
          )}
        </button>
      </div>
      {admin?.data?.role === "admin" && statusData?.status !== "Completed" && (
        <>
          <form
            onSubmit={handleStatus}
            className="lg:flex justify-center items-center"
          >
            <div className="form-control w-[200px] ">
              <label className="label">
                <span className="label-text text-green-400">Update Status</span>
              </label>
              <select name="status" className="select select-bordered">
                <option default>Select a status</option>
                <option>Negotiating</option>
                <option>Completed</option>
              </select>
            </div>

            <div className="ml-2 mt-10 ">

              <button
                type="submit"
                className="w-[200px] btn btn-outline btn-success"
              >
                Save
              </button>
            </div>
          </form>
        </>
      )}

      {statusData?.status === "Completed" && admin?.data?.role === "admin" && (
        <>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center items-center">
              <div>
                <input
                  name="price"
                  class="w-full p-3 text-sm border-gray-200 rounded-lg my-2"
                  placeholder="Per visa rate "
                  type="number"
                  id="price"
                />
              </div>
              <button type="submit" className="btn  btn-outline btn-success ml-2">
                Submit
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default CompanyStatus;
