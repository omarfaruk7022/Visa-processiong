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
    const country = e.target.companyAddress.value;
    const category = e.target.category.value;
    const quantity = Number(e.target.vacancy.value);
    const gender = e.target.gender.value;
    const salary = Number(e.target.companySalary.value);
    const duty = e.target.duty.value;
    const nature = e.target.nature.value;

    const inputData = {
      name,
      country,
      quantity,
      salary,
      category,
      duty,
      nature,
      gender
    };
    console.log(inputData);
    if (
      name &&
      country &&
      quantity &&
      salary &&
      gender &&
      category &&
      duty &&
      nature
    ) {
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
                  Country
                </th>
                <th scope="col" class="py-3 px-6">
                  Category
                </th>
                <th scope="col" class="py-3 px-6">
                  Quantity
                </th>
                <th scope="col" class="py-3 px-6">
                  Gender
                </th>
                <th scope="col" class="py-3 px-6">
                  Salary
                </th>
                <th scope="col" class="py-3 px-6">
                  Duty Hours
                </th>
                <th scope="col" class="py-3 px-6">
                  Job nature
                </th>
                <th scope="col" class="py-3 px-6">
                  Completed / Negotiating
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
                    <td class="py-4 px-6">{data?.country}</td>

                    <td class="py-4 px-6">{data?.category}</td>
                    <td class="py-4 px-6">{data?.quantity}</td>
                    <td class="py-4 px-6">{data?.gender}</td>
                    <td class="py-4 px-6">{data?.salary}</td>
                    <td class="py-4 px-6">{data?.duty}</td>
                    <td class="py-4 px-6">{data?.nature}</td>
                    {data?.status ? (
                      <td class="py-4 px-6 text-green-400">{data?.status}</td>
                    ) : (
                      <span className="ml-12 ">N/A</span>
                    )}

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
                              class="btn btn-outline btn-success"
                            >
                              Edit
                            </button>
                          </Link>
                        </td>
                        <td class="py-4 px-6">
                          <button
                            onClick={() => handleDelete(data._id)}
                            type="button"
                            class="btn btn-outline hover:border-0 text-red-500 hover:bg-red-500"
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

                  <div className="">
                    <label class="sr-only" for="email">
                      Company Country
                    </label>
                    <input
                      name="companyAddress"
                      class="w-full p-3 text-sm border-gray-200 rounded-lg my-2"
                      placeholder="Company Address"
                      type="text"
                      id="address"
                    />
                  </div>
                  <div className="lg:flex ">
                    <div className="">
                      <label class="sr-only" for="email">
                        Category
                      </label>
                      <input
                        name="category"
                        class="  w-[220px] p-3 text-sm border-gray-200 rounded-lg "
                        placeholder="Job Category"
                        type="text"
                        id="address"
                      />
                    </div>

                    <div>
                      <div className="form-control w-[220px] lg:ml-2">
                        <select
                          name="gender"
                          className="select select-bordered"
                        >
                          <option default>Select a Gender</option>
                          <option>Male</option>
                          <option>Female</option>
                          <option>Both</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="lg:flex my-2">
                    <div>
                      <div className="form-control w-[220px]">
                        <select name="duty" className="select select-bordered">
                          <option default>Select a Duty Hours</option>
                          <option>8 Hours</option>
                          <option>10 Hours</option>
                          <option>12 Hours</option>
                        </select>
                      </div>
                    </div>
                    <div className="">
                      <div className="form-control w-[220px] lg:ml-2">
                        <select
                          name="nature"
                          className="select select-bordered"
                        >
                          <option default>Select a Job Nature</option>
                          <option>Construction</option>
                          <option>Maintenance</option>
                          <option>Hospital</option>
                          <option>Project</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="lg:flex">
                    <div>
                      <label class="sr-only" for="email">
                        Quantity
                      </label>
                      <input
                        name="companyVacancy"
                        class="w-[220px]  p-3 text-sm border-gray-200 rounded-lg my-2"
                        placeholder="Quantity"
                        type="number"
                        id="vacancy"
                      />
                    </div>
                    <div>
                      <div className="">
                        <label class="sr-only" for="email">
                          Salary
                        </label>
                        <input
                          name="companySalary"
                          class="w-[220px] lg:ml-2 p-3 text-sm border-gray-200 rounded-lg my-2"
                          placeholder="Salary range"
                          type="number"
                          id="salary"
                        />
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-success btn-outline">
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
