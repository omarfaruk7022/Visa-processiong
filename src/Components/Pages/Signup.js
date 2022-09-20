import { async } from "@firebase/util";
import React, { useEffect, useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import auth from "../../firebase.init";
import Loader from "./Loader";

const Signup = () => {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";

  let signInError;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, from, navigate]);
  if (loading) {
    return <Loader />;
  }
  const onSubmit = async (data) => {
    const email = data.email;
    const password = data.password;

    const firstName = data.first_name;
    const lastName = data.last_name;
    const name = firstName + " " + lastName;
    const userSignupData = {
      email,
      password,
      name,
    };
    if (error) {
        return;
      } else {
        await createUserWithEmailAndPassword(data.email, data.password);
        fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userSignupData), 
        })
          .then((res) => res.json())
          .then((data) => {});
  
        swal("Yayy", "Sign Up  Successfully Completed ", "success");
      }
  };
  return (
    <div className="lg:flex justify-center items-center h-screen ">
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div class="relative z-0 mb-6 w-full group">
          <input
            {...register("email", {
              required: {
                value: true,
                message: "Email is required",
              },
              pattern: {
                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                message: "Provide a valid email",
              },
            })}
            type="email"
            id="floating_email"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary-600 peer"
            placeholder=" "
            required=""
          />
          <label
            for="floating_email"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-16 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>
        <div class="relative z-0 mb-6 w-full group">
          <input
            type="password"
            {...register("password", {
              required: {
                value: true,
                message: "Password is required",
              },
              minLength: {
                value: 6,
                message: "Must be 6 character or longer",
              },
            })}
            id="floating_password"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required=""
          />
          <label
            for="floating_password"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-16 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>

        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 mb-6 w-full group">
            <input
              type="text"
              {...register("first_name", {
                required: {
                  value: true,
                  message: "First Name is required",
                },
              })}
              id="floating_first_name"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required=""
            />
            <label
              for="floating_first_name"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-16 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              First name
            </label>
          </div>
          <div class="relative z-0 mb-6 w-full group">
            <input
              type="text"
              {...register("last_name", {
                required: {
                  value: true,
                  message: "Last Name is required",
                },
              })}
              id="floating_last_name"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required=""
            />
            <label
              for="floating_last_name"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-16 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Last name
            </label>
          </div>
        </div>
        {signInError}
        <div class="grid md:grid-cols-2 md:gap-6"></div>
        <button
          type="submit"
          class="text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
         Sign up
        </button>
      </form>
    </div>
  );
};

export default Signup;