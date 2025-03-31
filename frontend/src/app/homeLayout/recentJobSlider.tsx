import React from "react";

const RecentJobs: React.FC = () => {
  const posts = [
    {
      image: "HTS-2.jpg",
      name: "Amit Sharma",
      username: "@amit_dev",
      link: "#",
    },
    {
      image: "work-game-banner.jpg",
      name: "Priya Patel",
      username: "@priya_codes",
      link: "#",
    },
    {
      image: "HTS-4.jpg",
      name: "Rahul Verma",
      username: "@rahul_js",
      link: "#",
    },
    {
      image: "Deals.jpeg",
      name: "Sneha Kapoor",
      username: "@sneha_uiux",
      link: "#",
    },
    {
      image: "HTS-HOME2.jpg",
      name: "Vikram Singh",
      username: "@vikram_ai",
      link: "#",
    },
    {
      image: "work-game-banner.jpg",
      name: "Neha Srivastava",
      username: "@neha_stack",
      link: "#",
    },
    {
      image: "Deals.jpeg",
      name: "Siddharth Jain",
      username: "@sid_python",
      link: "#",
    },
  ];

  return (
    <div className="mt-16 container mx-auto">
      <h2 className="text-2xl font-bold text-left pl-2 mb-4 mt-3">Recent Jobs</h2>
      <div
        className="w-full overflow-x-auto scroll-hide scroll-smooth bg-gray-100 py-5"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        id="scrollContainer"
      >
        <div className="flex flex-nowrap gap-5 px-5">
          {posts.map((post, index) => (
            <a
              key={index}
              href={post.link}
              className="w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] min-w-[250px] rounded-lg overflow-hidden flex-shrink-0 p-4 transition-transform duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <img
                  src="/icons/man.png"
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-sm font-bold">{post.username}</h3>
                  <p className="text-xs text-gray-500">
                    {post.name} | Full Stack Developer
                  </p>
                </div>
              </div>
              <div className="w-full flex justify-center my-3">
                <img
                  src={`/images/${post.image}`}
                  alt="Post"
                  className="w-full h-[300px] object-cover rounded-md"
                />
              </div>
              <h2 className="text-md font-bold">How To do bug fixing?</h2>
              <div className="flex justify-between items-center mt-3">
                <p className="text-sm text-gray-500">Read More..</p>
                <div className="flex gap-3 text-gray-600">
                  <button className="hover:text-red-500 transition duration-200">
                    <i className="fas fa-heart"></i>
                  </button>
                  <button className="hover:text-blue-500 transition duration-200">
                    <i className="fas fa-share"></i>
                  </button>
                  <button className="hover:text-green-500 transition duration-200">
                    <i className="fas fa-bookmark"></i>
                  </button>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentJobs;
