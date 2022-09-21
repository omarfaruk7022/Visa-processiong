import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const Companies = () => {
  const [companyData, setCompanyData] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.companyName.value;
    const address = e.target.companyAddress.value;

    const inputData = {
      name,
      address,
    };
    console.log(inputData);
    if (name && address) {
      fetch("http://localhost:5000/companies", {
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

  useEffect(() => {
    fetch("http://localhost:5000/companies")
      .then((res) => res.json())
      .then((data) => {
        setCompanyData(data);
      });
  }, []);
  console.log(companyData);
  return (
    <div>
      <div>
        <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="py-3 px-6">
                  Product name
                </th>
               
                <th scope="col" class="py-3 px-6">
                  Address
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
          Add company
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
