"use client";
import React, { useRef } from "react";

const BransCarousel: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 sm:py-16 pt-96">
      <h2 className="text-center text-black font-bold text-3xl sm:text-4xl md:text-5xl mb-8 sm:mb-12">
        Brands Trust Freelance
      </h2>

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide space-x-6 px-4 sm:px-8 md:px-12"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* Slide 1 - Meta */}
          <div className="flex-shrink-0 snap-center w-[90%] sm:w-[75%] md:w-[80%] bg-gradient-to-br from-violet-900 to-black text-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-xl">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <img
                  src="/images/logo/meta.png"
                  className="w-12 sm:w-20 h-12 sm:h-14"
                  alt="Meta"
                />
                <h1 className="text-3xl">
                  Meta – Scaling Innovation with Freelancers
                </h1>
              </div>
              <p className="text-lg sm:text-xl md:text-2xl font-medium leading-relaxed">
                Empowering the future of AI, VR, and content creation with
                global talent.
              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex items-start">
                  <span className="text-green-400 text-2xl sm:text-3xl">✔</span>
                  <div className="ml-3">
                    <b className="text-lg sm:text-xl font-semibold">
                      Rapid Prototyping
                    </b>
                    <p className="text-sm sm:text-base text-gray-300">
                      Hiring specialized freelancers speeds up development.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 text-2xl sm:text-3xl">✔</span>
                  <div className="ml-3">
                    <b className="text-lg sm:text-xl font-semibold">
                      Global Expertise
                    </b>
                    <p className="text-sm sm:text-base text-gray-300">
                      Accesses a diverse talent pool for tech advancements.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="mt-8 sm:mt-12 flex justify-center">
              <a
                href="#"
                className="block w-full sm:w-[70%] md:w-[50%] text-center bg-white text-black font-bold text-lg py-3 rounded-full hover:bg-gray-200"
              >
                Hire Top Talent
              </a>
            </div>
          </div>

          {/* Slide 2 - Microsoft */}
          <div className="flex-shrink-0 snap-center w-[90%] sm:w-[75%] md:w-[80%] bg-gradient-to-br from-violet-900 to-black text-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-xl">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <img
                  src="/images/logo/microsoft.webp"
                  className="w-12 sm:w-16 h-12 sm:h-16"
                  alt="Microsoft"
                />
                <h1 className="text-3xl">
                  Microsoft – Powering Global Projects with Freelancers
                </h1>
              </div>
              <p className="text-lg sm:text-xl md:text-2xl font-medium leading-relaxed">
                Driving efficiency and innovation with top-tier freelance
                professionals.
              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex items-start">
                  <span className="text-green-400 text-2xl sm:text-3xl">✔</span>
                  <div className="ml-3">
                    <b className="text-lg sm:text-xl font-semibold">
                      50% Faster Execution
                    </b>
                    <p className="text-sm sm:text-base text-gray-300">
                      Freelancers help Microsoft roll out projects with agility.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="mt-8 sm:mt-12 flex justify-center">
              <a
                href="#"
                className="block w-full sm:w-[70%] md:w-[50%] text-center bg-white text-black font-bold text-lg py-3 rounded-full hover:bg-gray-200"
              >
                Hire Top Talent
              </a>
            </div>
          </div>

          {/* Slide 3 - Google, Amazon, Tesla */}
          <div className="flex-shrink-0 snap-center w-[90%] sm:w-[75%] md:w-[80%] bg-gradient-to-br from-violet-900 to-black text-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-xl">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <img
                  src="/images/logo/google.webp"
                  className="w-12 sm:w-16 h-12 sm:h-16"
                  alt="Google"
                />
                <h1 className="text-3xl">
                  Google, Amazon & Tesla – Trusted by Tech Giants
                </h1>
              </div>
              <p className="text-lg sm:text-xl md:text-2xl font-medium leading-relaxed">
                Leading companies rely on freelancers for groundbreaking
                innovations.
              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex items-start">
                  <span className="text-green-400 text-2xl sm:text-3xl">✔</span>
                  <div className="ml-3">
                    <b className="text-lg sm:text-xl font-semibold">
                      AI & Data Science Experts
                    </b>
                    <p className="text-sm sm:text-base text-gray-300">
                      Tech leaders hire specialists for AI, ML, and big data
                      solutions.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="mt-8 sm:mt-12 flex justify-center">
              <a
                href="#"
                className="block w-full sm:w-[70%] md:w-[50%] text-center bg-white text-black font-bold text-lg py-3 rounded-full hover:bg-gray-200"
              >
                Hire Top Talent
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BransCarousel;
