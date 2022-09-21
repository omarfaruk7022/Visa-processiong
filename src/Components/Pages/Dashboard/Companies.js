import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import auth from "../../../firebase.init";
import Loader from "../Loader";

const Companies = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
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
    if (name && address) {
      fetch("https://visa-processing.onrender.com/companies", {
        method: "PUT",
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
    }

    e.target.reset();
  };

  //   useEffect(() => {
  //     fetch("https://visa-processing.onrender.com/companies")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setCompanyData(data);
  //         refetch()
  //     });
  // }, []);

  console.log(companyData);
  if (isLoading) {
    return <Loader />;
  }

  if (!user) {
    navigate("/login");
  }
  return (
    <div>
      <div>
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
                  Action
                </th>
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
                    <td class="py-4 px-6">
                      <Link
                        to={`/companyStatus/${data?._id}`}
                        class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Check Status
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </>
            ))}
          </table>
        </div>
      </div>
      <div>
        <label htmlFor="my-modal-6" className="btn modal-button">
          Add Job Order
        </label>

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

                {/* <div>
                <label class="sr-only" for="email">
                  Vacancy/Visa
                </label>
                <input
                  name="companyVacancy"
                  class="w-full p-3 text-sm border-gray-200 rounded-lg my-2"
                  placeholder="Company vacancy"
                  type="number"
                  id="vacancy"
                />
              </div> */}
              </div>
              <div>
                <div className="form-control w-[200px]">
                  <label className="label">
                    <span className="label-text text-green-400">
                      Male/Female
                    </span>
                  </label>
                  <select name="maleFemale" className="select select-bordered">
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
              <label htmlFor="my-modal-6" className="btn">
                Yay!
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Companies;
