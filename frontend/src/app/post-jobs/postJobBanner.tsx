"use client";

import { useState, useEffect } from "react";

const PostJobBanner = () => {
  return (
    <div className="bg-white flex items-center justify-center min-h-screen px-4 ">
      <div className="flex justify-center py-10 w-full">
        <div className="relative w-full max-w-6xl">
          <img
            alt="A person in a hoodie looking down at a laptop with a gradient background"
            className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover rounded-[16px]"
            src="/images/post-button.jpg"
          />
          <div className="absolute top-1/2 right-4 md:right-8 transform -translate-y-1/2">
            <button className="bg-white text-black font-bold py-4 px-8 text-lg md:text-2xl rounded-full shadow-lg hover:bg-slate-200">
              Post Job Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJobBanner;
