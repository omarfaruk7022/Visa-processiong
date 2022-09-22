import React from "react";
import { useParams } from "react-router-dom";
import swal from "sweetalert";

const CompanyEdit = () => {
  const { id } = useParams();
  const handleEdit = (e) => {
    e.preventDefault();
    const name = e.target.companyName.value;
    const address = e.target.companyAddress.value;
    const vacancy = Number(e.target.vacancy.value);
    const salary = Number(e.target.companySalary.value);
    const maleFemale = e.target.maleFemale.value;

    const editedData = {
      name,
      address,
      vacancy,
      salary,

      maleFemale,
    };
    console.log(editedData);
    if (name && address && vacancy && salary && maleFemale) {
      fetch(`https://visa-processing.onrender.com/companies/${id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(editedData),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          swal("Yayy", "Company Edited Successfully", "success");
        });
    } else {
      swal("Oops", "Please fill all the fields", "error");
    }

    e.target.reset();
  };

  return (
    <div className="lg:w-[380px] m-auto">
      <form onSubmit={handleEdit}>
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
              <span className="label-text text-green-400">Male/Female</span>
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
    </div>
  );
};

export default CompanyEdit;
