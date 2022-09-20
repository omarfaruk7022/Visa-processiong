import swal from "sweetalert";

import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";

import auth from "../../firebase.init";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Loader from "./Loader";

const Login = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
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
  // if (googleLoading || loading || gitLoading || fbLoading) {
  //   return <Loader></Loader>
  // }
  if (loading) {
    return <Loader />;
  }
  if (user) {
    // Router.push('/');

    swal("Yayy", "Login Successfully Completed", "success");
  }
  if (error) {
    swal("Something Wrong", "Login Failed", "error");
  }

  const onSubmit = (data) => {
    signInWithEmailAndPassword(data.email, data.password);
  };
  return (
    <div>
      <div className="flex justify-center items-center h-screen ">
        <div className="mr-28 hidden lg:block">
          <img alt="" />
        </div>
        <div className="card w-96 bg-base-100 shadow-xl mx-3 lg:mx-0">
          <div className="card-body">
            <h2 className="text-center text-2xl font-bold text-primary">
              Login
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text text-primary">Email </span>
                </label>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="input input-bordered w-full max-w-xs"
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
                />
                <label className="label">
                  {errors.email?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.email.message}
                    </span>
                  )}
                  {errors.email?.type === "pattern" && (
                    <span className="label-text-alt text-red-500">
                      {errors.email.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text text-primary">Password </span>
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered w-full max-w-xs"
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
                />
                <label className="label">
                  {errors.password?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                  {errors.password?.type === "minLength" && (
                    <span className="label-text-alt text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                </label>
              </div>

              {signInError}

              <input
                className="btn btn-outline w-full max-w-xs hover:bg-primary border-primary hover:border-primary"
                type="submit"
                value="Login"
              />
            </form>
            <div className="divider">OR</div>
            <div className="flex">
              <p>
                {" "}
                <small>
                  Do you have not an account !{" "}
                  <Link className="text-primary link" to="/signup">
                    <span className="underline cursor-pointer text-blue-500">
                      Create an account
                    </span>
                  </Link>
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;