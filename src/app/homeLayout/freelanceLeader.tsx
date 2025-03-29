"use client";

import Image from "next/image";

const FreelancerLeaders = () => {
  return (
    <div className="flex my-20 flex-col md:flex-row bg-violet-900 text-white rounded-3xl overflow-hidden shadow-lg w-full max-w-6xl mx-auto mb-10">
      {/* Left Section */}
      <div className="p-10 flex flex-col justify-center w-full md:w-1/2">
        <h3 className="text-lg font-light">For Freelancer Leaders</h3>
        <h2 className="text-4xl md:text-5xl font-semibold mt-2">
          This is how great minds build great teams.
        </h2>
        <p className="mt-4 text-lg opacity-80">
          Connect with the top IT professionals and collaborate seamlessly. Find
          expert talent, build teams, and drive innovation—all in one place.
        </p>

        <div className="mt-6 space-y-4">
          {[
            {
              text: "Access top-tier talent",
              description:
                "Find skilled professionals across software development, data science, cybersecurity, and more.",
            },
            {
              text: "Seamless collaboration",
              description:
                "Communicate, form teams, and manage projects efficiently.",
            },
            {
              text: "End-to-end support",
              description:
                "Get guidance, tools, and a secure platform to ensure smooth project execution.",
            },
          ].map((item, index) => (
            <div key={index} className="flex items-start space-x-3">
              <span className="text-green-400 text-2xl">✅</span>
              <p className="text-lg">
                <span className="font-semibold">{item.text}</span> –{" "}
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <button className="mt-8 bg-white text-violet-900 font-semibold py-3 px-6 rounded-full shadow-md hover:bg-gray-200 transition-all">
          Let’s hire top talents
        </button>
      </div>

      {/* Right Section (Image) */}
      <div className="w-full md:w-1/2">
        <Image
          src="/images/freelance-leader.jpg"
          alt="Freelancer working"
          width={600}
          height={400}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default FreelancerLeaders;
