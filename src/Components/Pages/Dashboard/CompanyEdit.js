import React from "react";
import { useParams } from "react-router-dom";
import swal from "sweetalert";

const CompanyEdit = () => {
  const { id } = useParams();
  const handleEdit = (e) => {
    e.preventDefault();
    const name = e.target.companyName.value;
    const country = e.target.companyAddress.value;
    const category = e.target.category.value;
    const quantity = Number(e.target.vacancy.value);
    const gender = e.target.gender.value;
    const salary = Number(e.target.companySalary.value);
    const duty = e.target.duty.value;
    const nature = e.target.nature.value;

    const editedData = {
      name,
      country,
      quantity,
      salary,
      category,
      duty,
      nature,
      gender,
    };
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
    <div className="modal-box m-auto">
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
              <select name="gender" className="select select-bordered">
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
              <select name="nature" className="select select-bordered">
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

      
    </div>
  );
};

export default CompanyEdit;
