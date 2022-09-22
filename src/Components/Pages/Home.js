import React from "react";
import Dashboard from "./Dashboard/Dashboard";
import Footer from "./Footer";
import image from "..//images//footerlogo.png";

const Home = () => {
  return (
    <div>
      <section>
        <div className="bg-gray-200">
          <div className="container flex flex-col items-center px-4 py-16 pb-24 mx-auto text-center lg:pb-56 md:py-32 md:px-10 lg:px-32 dark:text-gray-900">
            <h1 className="text-5xl font-bold leading-none sm:text-6xl xl:max-w-3xl dark:text-gray-900">
              Welcome to Idol Group
            </h1>
            <p className="mt-6 mb-8 text-lg sm:mb-12 xl:max-w-3xl dark:text-gray-900">
              While pacing through my childhood, I encountered a vast mass of
              suffering humanity but had also the fortune to see my father
              helping a great number of them as a doctor. I Too grew up with
              that sense of responsibility of being able to do something for the
              poor fellow muslims of my country. My first involvement in the
              trade of manpower recruitment was initiated by my attempt to bring
              a few young men from my hometown to be employed abroad in year
              1986. There I found that , one young man from each poor family
              employed abroad turned out to be cause and source of very survival
              of the rest of their family members. This enthused me into the
              trade of manpower recruitment.
            </p>
          </div>
        </div>
        <div>
         
          <img
            src={image}
            alt=""
            className="w-3/10 mx-auto mb-12 -mt-20 rounded-lg shadow-md lg:-mt-40 dark:bg-gray-500"
          />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
