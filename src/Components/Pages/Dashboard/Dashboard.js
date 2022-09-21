import React from "react";
// import { useState } from "react";
// import { useEffect } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";

import { Link, Outlet } from "react-router-dom";
// import auth from "../../firebase.init";

const Dashboard = () => {
  //   const [profileInfo, setProfileInfo] = useState();
  //   const [user] = useAuthState(auth);
  //   const email = user.email
  //   useEffect(() => {
  //     fetch(`https://visa-processing.onrender.com/profile/${email}`)
  //       .then((res) => res.json())
  //       .then((data) => setProfileInfo(data?.data));

  //   },[]);

  // console.log(profileInfo)
  return (
    <div>
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center ">
          <Outlet />
          <label
            for="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open Menu
          </label>
        </div>

        <div className="drawer-side">
          <label for="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 overflow-y-auto w-70 bg-base-100 text-base-content">
            <li>
              <Link
                to="/dashboard"
                className="border-b-4 border-transparent hover:text-primary hover:border-current text-[15px] bg-gray-200 my-2 "
              >
                {" "}
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/companies"
                className="border-b-4 border-transparent hover:text-primary hover:border-current text-[15px] bg-gray-200  my-2"
              >
                {" "}
                Company
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/completed"
                className="border-b-4 border-transparent hover:text-primary hover:border-current text-[15px] bg-gray-200  my-2"
              >
                {" "}
                Completed
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/fixed"
                className="border-b-4 border-transparent hover:text-primary hover:border-current text-[15px] bg-gray-200 my-2 "
              >
                {" "}
                Fixed
              </Link>
            </li>
            {/* <li>
              <Link
                to="/dashboard/ACE"
                className="border-b-4 border-transparent hover:text-primary hover:border-current text-[15px] "
              >
                {" "}
               Idol ACE
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/SFS"
                className="border-b-4 border-transparent hover:text-primary hover:border-current text-[15px] "
              >
                {" "}
                SFS{" "}
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/trading"
                className="border-b-4 border-transparent hover:text-primary hover:border-current text-[15px] "
              >
                {" "}
                Trading
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
