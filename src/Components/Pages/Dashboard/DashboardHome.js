import React from "react";
import { Link } from "react-router-dom";

const DashboardHome = () => {
  return (
    <div>
       
     <div className="grid grid-cols-3 gap-5  mt-12">
     <Link
       to="/dashboard/companies"
        class="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Company
        </h5>
        <p class="font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far.
        </p>
      </Link>
     <Link
       to="/dashboard/completed"
        class="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Completed
        </h5>
        <p class="font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far.
        </p>
      </Link>
     <Link
       to="/dashboard/fixed"
        class="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Price Fixed
        </h5>
        <p class="font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far.
        </p>
      </Link>
     
     </div>
    </div>
  );
};

export default DashboardHome;
