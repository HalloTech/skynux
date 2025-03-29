import React from "react";

const features = [
  {
    icon: "fa-user-plus",
    title: "No cost to join",
    desc: "Register and browse talent profiles, explore projects, or even book a consultation.",
  },
  {
    icon: "fa-briefcase",
    title: "Post a job and hire top talent",
    desc: "Finding talent doesn’t have to be a chore. Post a job or we can search for you!",
  },
  {
    icon: "fa-users",
    title: "Make your team",
    desc: "Assemble the perfect group of professionals for any project.",
  },
  {
    icon: "fa-handshake",
    title: "Collaboration",
    desc: "Easily communicate with your team, share files, and stay organized.",
  },
  {
    icon: "fa-tasks",
    title: "Team Management",
    desc: "Stay on track with built-in tools and seamless project management.",
  },
];

const WorkGameSection: React.FC = () => {
  return (
    <>
      {/* Work Game Section */}
      <section className="text-center pt-16 pb-2 bg-white mt-20">
        <h2 className="text-center text-black font-bold text-3xl sm:text-4xl md:text-5xl mb-5 sm:mb-12">
          Level Up Your Freelance Career - Effortlessly
        </h2>
      </section>

      {/* Work Game Features Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between px-6 sm:px-12 py-16 mb-20 bg-gray-100 container mx-auto">
        {/* Left Side: Features List */}
        <div className="w-full lg:w-1/2 space-y-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-4">
              <i className={`fas ${feature.icon} text-4xl text-violet-700`}></i>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">{feature.title}</h2>
                <p className="text-gray-600 text-base">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Image */}
        <div className="w-full lg:w-2/5 flex justify-center mt-10 lg:mt-0">
          <img src="/images/work-section.jpg" className="max-w-full rounded-[5rem] shadow-lg" alt="Work Game Banner" />
        </div>
      </section>
    </>
  );
};

export default WorkGameSection;