import React from "react";

const FreelanceLanding: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen max-w-6xl mx-auto flex flex-col justify-center items-center overflow-hidden py-5">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full -z-10">
        <video className="w-full h-full object-cover rounded-3xl filter brightness-50" autoPlay muted loop playsInline>
          <source src="https://videos.pexels.com/video-files/4974883/4974883-hd_1920_1080_25fps.mp4" type="video/mp4" />
          <source src="/videos/find-talent.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-8 md:px-16 lg:px-28 text-center sm:text-left">
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8">
          Hire Smarter, Build Faster!
        </h1>
        <h2 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6">
          Find top talent, post jobs effortlessly, and bring your <br className="hidden sm:block" />
          projects to life—faster than ever!
        </h2>

        {/* Responsive Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-10">
          {/* First Card */}
          <a href="/discover" className="bg-violet-900 bg-opacity-90 text-white p-6 rounded-3xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:bg-opacity-100">
            <p className="text-sm text-center font-bold mb-2">Post a Job, Hire the Best, Build Something Amazing!</p>
            <p className="text-sm text-center">Find top-tier IT talent and get your project done—fast & hassle-free.</p>
            <div className="flex justify-center mt-6">
              <p className="w-[70%] text-center bg-violet-700 text-white font-bold text-sm p-3 rounded-full transition hover:bg-violet-500">Get started now</p>
            </div>
          </a>

          {/* Second Card */}
          <a href="/collaborate" className="bg-violet-900 bg-opacity-90 text-white p-6 rounded-3xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:bg-opacity-100">
            <h3 className="text-sm font-bold mb-2 text-center">Where Innovation Meets the Right Talent</h3>
            <p className="text-sm text-center">Join top businesses hiring expert freelancers for software, AI, and more.</p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center"><span className="text-green-400 mr-2">✔</span><p className="text-sm">Quality You Can Trust</p></li>
              <li className="flex items-center"><span className="text-green-400 mr-2">✔</span><p className="text-sm">Seamless Collaboration</p></li>
              <li className="flex items-center"><span className="text-green-400 mr-2">✔</span><p className="text-sm font-bold">Global Expertise</p></li>
            </ul>
          </a>

          {/* Third Card */}
          <a href="/hiring" className="bg-violet-900 bg-opacity-90 text-white p-6 rounded-3xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:bg-opacity-100">
            <p className="text-sm text-center font-bold mb-2">Post a Job & Watch Talent Come to You!</p>
            <p className="text-sm text-center">Post a Job & Watch Talent Come to You!</p>
            <div className="flex justify-center mt-6">
              <p className="w-[70%] text-center bg-violet-700 text-white font-bold text-sm p-3 rounded-full transition hover:bg-violet-500">Get started now</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FreelanceLanding;