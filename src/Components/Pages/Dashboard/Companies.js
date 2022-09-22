import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import auth from "../../../firebase.init";
import Loader from "../Loader";

const Companies = () => {
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

  // const {id} = useParams()
  // console.log(id)
  const {
    data: companyData,
    isLoading,
    refetch,
  } = useQuery("companyData", () =>
    fetch("https://visa-processing.onrender.com/companies/", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
  );
  refetch();

  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this  file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your file has been deleted!", {});
        fetch(`https://visa-processing.onrender.com/companies/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            swal("Yayy", "Company Deleted Successfully", "success");
          });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };
  //   const [companyData, setCompanyData] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.companyName.value;
    const address = e.target.companyAddress.value;
    const vacancy = Number(e.target.vacancy.value);
    const salary = Number(e.target.companySalary.value);
    const maleFemale = e.target.maleFemale.value;

    const inputData = {
      name,
      address,
      vacancy,
      salary,

      maleFemale,
    };
    console.log(inputData);
    if (name && address && vacancy && salary && maleFemale) {
      fetch("https://visa-processing.onrender.com/companies", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(inputData),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          swal("Yayy", "Company Added Successfully", "success");
        });
    } else {
      swal("Oops", "Please fill all the fields", "error");
    }

    e.target.reset();
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!user) {
    navigate("/login");
  }

  return (
    <div>
      <div>
        <h1 className="text-center text-green-400 text-2xl my-5">
          All Job Orders
        </h1>
        <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="py-3 px-6">
                  Company name
                </th>

                <th scope="col" class="py-3 px-6">
                  Address
                </th>
                <th scope="col" class="py-3 px-6">
                  Vacancy
                </th>
                <th scope="col" class="py-3 px-6">
                  Male/Female
                </th>
                <th scope="col" class="py-3 px-6">
                  Salary
                </th>
                <th scope="col" class="py-3 px-6">
                  Completed/Processing
                </th>
                <th scope="col" class="py-3 px-6">
                  Action
                </th>
                {admin?.data?.role === "admin" && (
                  <>
                    <th scope="col" class="py-3 px-6">
                      Edit
                    </th>
                    <th scope="col" class="py-3 px-6">
                      Delete
                    </th>
                  </>
                )}
              </tr>
            </thead>
            {companyData?.map((data) => (
              <>
                <tbody>
                  <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      scope="row"
                      class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {data?.name}
                    </th>
                    <td class="py-4 px-6">{data?.address}</td>

                    <td class="py-4 px-6">{data?.vacancy}</td>
                    <td class="py-4 px-6">{data?.maleFemale}</td>
                    <td class="py-4 px-6">{data?.salary}</td>
                    {
                      data?.status ? (
                         
                        <td class="py-4 px-6 text-green-400">{data?.status}</td>
                      ) : (
                        <span className="ml-12 ">N/A</span>
                        
                      )
                    }

                    <td class="py-4 px-6">
                      <Link
                        to={`/companyStatus/${data?._id}`}
                        class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Check Status
                      </Link>
                    </td>
                    {admin?.data?.role === "admin" && (
                      <>
                        <td class="py-4 px-6">
                          <Link to={`companyEdit/${data._id}`}>
                            <button
                              type="button"
                              class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                            >
                              Edit
                            </button>
                          </Link>
                        </td>
                        <td class="py-4 px-6">
                          <button
                            onClick={() => handleDelete(data._id)}
                            type="button"
                            class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                          >
                            Delete
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                </tbody>
              </>
            ))}
          </table>
        </div>
      </div>
      <div>
        {admin?.data?.role === "admin" && (
          <>
            <button
              class=" mt-5 inline-block px-8 py-3 text-sm font-medium text-indigo-600 border rounded transition border-current hover:scale-110 hover:shadow-xl active:text-indigo-500 focus:outline-none focus:ring hover:text-green-400"
              href="/download"
            >
              <label
                htmlFor="my-modal-6"
                className=" modal-button cursor-pointer"
              >
                Add Job Order
              </label>
            </button>

            <input type="checkbox" id="my-modal-6" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
              <div className="modal-box">
                <form onSubmit={handleSubmit}>
                  <div>
                    <label class="sr-only" for="email">
                      Name
                    </label>
                    <input
                      name="companyName"
                      class="w-full p-3 text-sm border-gray-200 rounded-lg my-2"
                      placeholder="Company Name"
                      type="text"
                      id="name"
                    />
                  </div>
                  <div class="">
                    <div className="">
                      <label class="sr-only" for="email">
                        Company Address
                      </label>
                      <input
                        name="companyAddress"
                        class="w-full p-3 text-sm border-gray-200 rounded-lg my-2"
                        placeholder="Company Address"
                        type="text"
                        id="address"
                      />
                    </div>
                    <div className="">
                      <label class="sr-only" for="email">
                        Amount of vacancy
                      </label>
                      <input
                        name="companyVacancy"
                        class="w-full p-3 text-sm border-gray-200 rounded-lg my-2"
                        placeholder="Vacancy"
                        type="number"
                        id="vacancy"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="form-control w-[200px]">
                      <label className="label">
                        <span className="label-text text-green-400">
                          Male/Female
                        </span>
                      </label>
                      <select
                        name="maleFemale"
                        className="select select-bordered"
                      >
                        <option default>Select a status</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Both</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <div className="">
                      <label class="sr-only" for="email">
                        Salary range
                      </label>
                      <input
                        name="companySalary"
                        class="w-full p-3 text-sm border-gray-200 rounded-lg my-2"
                        placeholder="Salary range"
                        type="number"
                        id="salary"
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>

                <div className="modal-action">
                  <label
                    htmlFor="my-modal-6"
                    className="btn btn-sm btn-circle absolute right-2 bottom-2"
                  >
                    ✕
                  </label>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Companies;
