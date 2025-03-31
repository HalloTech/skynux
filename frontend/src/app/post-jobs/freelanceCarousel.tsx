"use client";

import { useRef } from "react";

const FreelanceCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-white text-gray-900 ">
      <div className="max-w-7xl mx-auto px-6 py-12 sm:py-16">
        <h2 className="text-center text-black font-bold text-3xl sm:text-4xl md:text-5xl mb-8 sm:mb-12">
          Brands Trust Freelance
        </h2>

        <div className="relative">
          <div
            ref={carouselRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide space-x-6 px-4 sm:px-8 md:px-12"
          >
            {/* Slide 1 */}
            <div className="flex-shrink-0 snap-center w-[90%] sm:w-[75%] md:w-[80%] bg-gradient-to-br from-violet-900 to-black text-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-xl">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <h1 className="text-5xl font-bold">
                    Instantly Connect with Top Talent
                  </h1>
                </div>

                <p className="text-lg sm:text-xl md:text-2xl font-medium leading-relaxed">
                  Post a Job & Get Matched with Experts | Find skilled <br />
                  professionals in software development, AI, <br />
                  cybersecurity, and more—quickly & hassle-free.
                </p>
                <ul className="mt-6 space-y-4">
                  <li className="flex items-start">
                    <span className="text-green-400 text-3xl sm:text-3xl">✔</span>
                    <div className="ml-3">
                      <b className="text-lg sm:text-xl md:text-2xl font-extralight leading-relaxed">
                        Post your job in minutes – Define your project & set a budget
                      </b>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 text-2xl sm:text-3xl">✔</span>
                    <div className="ml-3">
                      <b className="text-lg sm:text-xl md:text-2xl font-extralight leading-relaxed">
                        AI-powered matching – Instantly get the best candidates
                      </b>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 text-2xl sm:text-3xl">✔</span>
                    <div className="ml-3">
                      <p className="text-lg sm:text-xl md:text-2xl font-extralight leading-relaxed">
                        Work smarter, not harder – Manage everything in one place
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="mt-8 sm:mt-12 flex justify-center">
                <a
                  href="#"
                  className="block w-full sm:w-[70%] md:w-[50%] text-center bg-violet-700 text-white font-bold text-xl py-3 rounded-full transition hover:bg-violet-500"
                >
                  Post a Job Now!
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelanceCarousel;
