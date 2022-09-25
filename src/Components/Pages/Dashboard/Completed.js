import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import auth from "../../../firebase.init";
import Loader from "../Loader";

const Completed = () => {
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
  // const handleSubmit = (id, e) => {
  //   e.preventDefault();
  //   const price = e.target.price.value;
  //   console.log(id);
  //   const inputData = {
  //     price,
  //   };
  //   if (price) {
  //     fetch(`https://visa-processing.onrender.com/companies/${id}`, {
  //       method: "PATCH",
  //       headers: {
  //         "content-type": "application/json",
  //       },
  //       body: JSON.stringify(inputData),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);
  //         swal("Yayy", "Status Updated Successfully", "success");
  //       });
  //   }
  //   e.target.reset();
  // };
  const {
    data: completedData,
    isLoading,
    refetch,
  } = useQuery("completedData", () =>
    fetch("https://visa-processing.onrender.com/completed/", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
  );
  refetch();
  // const handleDelete = (id) => {
  //   swal({
  //     title: "Are you sure?",
  //     text: "Once deleted, you will not be able to recover this  file!",
  //     icon: "warning",
  //     buttons: true,
  //     dangerMode: true,
  //   }).then((willDelete) => {
  //     if (willDelete) {
  //       fetch(`http://localhost:5000/completed/${id}`, {
  //         method: "DELETE",
  //       })
  //         .then((res) => res.json())
  //         .then((data) => {
  //           console.log(data);
  //           swal("Yayy", "Company Deleted Successfully", "success");
  //         });
  //     } else {
  //       swal("Your imaginary file is safe!");
  //     }
  //   });
  // };

  // const { data: fixedData } = useQuery("fixedData", () =>
  //   fetch(`https://visa-processing.onrender.com/comapnies/`, {
  //     method: "GET",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       return data;
  //     })
  //     );
  //     refetch();

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <div>
        <h1 className="text-center text-green-400 text-2xl my-5">
          All Completed Job Orders
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
                 Jon Nature
                </th>
                <th scope="col" class="py-3 px-6">
                 Status
                </th>

                {/* <th scope="col" class="py-3 px-6">
                  Fixed any price
                </th> */}
              </tr>
            </thead>
            {completedData?.map((data) => (
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
                    <td class="py-4 px-6 text-green-400">Completed</td>
                    <td class="py-4 px-6">
                      {" "}
                      {/* {admin?.data?.role === "admin" && (
                        <>
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
                      )} */}
                    </td>
                  </tr>
                </tbody>
              </>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Completed;
