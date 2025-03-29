import React from "react";

const categories = [
  "Software Development",
  "Data Science & Analytics",
  "DevOps & Automation",
  "Cloud Computing",
  "Cybersecurity",
  "Quality Assurance & Testing",
  "IT Support & Systems Administration",
  "Networking & Telecommunications",
  "Project Management & IT Consulting",
  "UI/UX Design",
  "Blockchain & Cryptocurrency",
  "Game Development",
];

const BrowseCategories: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 mb-10 mt-20">
      <h1 className="text-5xl font-bold mb-4">Find Top Talent by Category</h1>
      <p className="text-xl mb-8">
        Seeking Opportunities?{" "}
        <a href="#" className="font-bold text-black">
          Explore Jobs
        </a>
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map((category, index) => (
          <div
            key={index}
            className="relative flex items-center justify-center group w-full h-20"
          >
            <div className="absolute inset-0 duration-1000 opacity-60 transition-all bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-400 rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200"></div>
            <a
              role="button"
              className="group relative flex items-center justify-center text-lg rounded-xl bg-gray-900 w-full h-full px-6 py-4 font-semibold text-white transition-all duration-200 hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 hover:shadow-gray-600/30"
              title={category}
              href="#"
            >
              {category}
              <svg
                aria-hidden="true"
                viewBox="0 0 10 10"
                height="10"
                width="10"
                fill="none"
                className="mt-0.5 ml-2 -mr-1 stroke-white stroke-2"
              >
                <path d="M0 5h7" className="transition opacity-0 group-hover:opacity-100"></path>
                <path d="M1 1l4 4-4 4" className="transition group-hover:translate-x-[3px]"></path>
              </svg>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseCategories;
