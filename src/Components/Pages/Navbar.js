import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../../firebase.init";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const handleSignOut = () => {
    signOut(auth);
  };
  const [profileInfo, setProfileInfo] = useState();

  const email = user?.email;
  useEffect(() => {
    fetch(`http://localhost:5000/users/${email}`)
      .then((res) => res.json())
      .then((data) => {
        setProfileInfo(data?.data);
      });
  }, [email]);

  return (
    <div>
      <div className="navbar bg-base-100  flex justify-between">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabindex="0" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabindex="0"
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 "
            >
              <>
                <li>
                  <Link
                    to="/"
                    class="block h-12 leading-[3rem] border-b-4 border-transparent hover:text-primary hover:border-current text-[12px] "
                  >
                    Home
                  </Link>
                </li>
                {/* <li>
                  <Link
                    to="/about"
                    class="block h-12 leading-[3rem] border-b-4 border-transparent hover:text-primary hover:border-current text-[12px]"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog"
                    class="block h-12 leading-[3rem] border-b-4 border-transparent hover:text-primary hover:border-current text-[12px]"
                  >
                    Blog
                  </Link>
                </li> */}
                <li>
                  <Link
                    to="/dashboard"
                    class="block h-12 leading-[3rem] border-b-4 border-transparent hover:text-primary hover:border-current text-[12px]"
                  >
                    Dashboard
                  </Link>
                </li>

                <li>
                  {user ? (
                    <button onClick={handleSignOut} className="btn btn-ghost">
                      Logout
                    </button>
                  ) : (
                    <Link
                      className="block h-12 leading-[3rem] text-[13px] border-b-4 border-transparent hover:text-primary hover:border-current "
                      to="/login"
                    >
                      Login
                    </Link>
                  )}
                </li>
              </>
              <>
                {profileInfo?.name && (
                  <div>
                    <h1 className="text-green-400 text-sm lg:mt-3.5">
                      {profileInfo?.name}
                    </h1>
                  </div>
                )}
              </>
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex  ">
          <ul className="menu menu-horizontal p-0 px-16 lg:space-x-4">
            <>
              <Link
                to="/"
                class="block h-12 leading-[3rem] border-b-4 border-transparent hover:text-primary hover:border-current text-[12px] "
              >
                Home
              </Link>

              {/* <Link
                to="/about"
                class="block h-12 leading-[3rem] border-b-4 border-transparent hover:text-primary hover:border-current text-[12px]"
              >
                About
              </Link>
              
              <Link
                to="/blog"
                class="block h-12 leading-[3rem] border-b-4 border-transparent hover:text-primary hover:border-current text-[12px]"
              >
                Blog
              </Link> */}

              <Link
                to="/dashboard"
                class="block h-12 leading-[3rem] border-b-4 border-transparent hover:text-primary hover:border-current text-[12px]"
              >
                Dashboard
              </Link>

              {user ? (
                <button
                  onClick={handleSignOut}
                  className="block h-12 leading-[3rem] border-b-4 border-transparent hover:text-primary hover:border-current text-[13px] "
                >
                  Logout
                </button>
              ) : (
                <Link to="/login">
                  <button className="block h-12 leading-[3rem] text-[13px] border-b-4 border-transparent hover:text-primary hover:border-current ">
                    Login/Register
                  </button>
                </Link>
              )}
            </>

            

            <>
              {profileInfo?.name && (
                <div>
                  <h1 className="text-green-400 text-sm lg:mt-3.5">
                    {profileInfo?.name}
                  </h1>
                </div>
              )}
            </>
            {user && (
              <>
                <div class="overflow-hidden relative w-8 h-8 mt-1 bg-gray-100 rounded-full dark:bg-gray-600">
                  <svg
                    class="absolute -left-1 w-10 h-10 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
