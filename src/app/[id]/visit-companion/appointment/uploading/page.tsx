"use client"

import Link from "next/link";
import React, { useState, useEffect } from "react";

const Uploading = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading process with a timeout
    const timer = setTimeout(() => {
      setIsLoading(false); // Change to false when loading completes
    }, 4000); // Adjust the time as needed

    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  return (
    <div className="relative p-4 py-8 w-full max-w-[600px] mx-auto bg-[#F5F5F5] h-[100vh] h-[100dvh] text-[#273046] flex flex-col justify-around items-center">
      {/* logo */}
      <div className="my-10">
        <img src="/images/evvaLogo.png" alt="logo" />
      </div>
      {/* loading image */}
      <div className="w-1/2 max-w-[350px]">
        {isLoading ? (
          <img className="w-full relative object-contain" src="/images/circleLoader.gif" alt="loading" />
        ) : (
          <img className="w-full relative object-contain" src="/images/successLoading.gif" alt="done" />
        )}
      </div>
      {/* content */}
   
      {/* button */}
      <Link className="w-full" href={"/visit-history"}>
        <button
          className={`w-full ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#273046]"} text-white rounded-xl p-4`}
          disabled={isLoading}
        >
          See Visit history
        </button>
      </Link>
    </div>
  );
};

export default Uploading;
