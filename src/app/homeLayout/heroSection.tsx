"use client";

const HeroSection = () => {
  return (
    <div className="relative flex items-center justify-start h-[80vh] mt-20">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://videos.pexels.com/video-files/1093662/1093662-hd_1920_1080_30fps.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Content Section */}
      <div className="relative z-10 text-left mx-auto px-4">
        <h1 className="text-5xl text-stone-50 md:text-6xl font-bold mb-6">
          The Future of <br /> IT Freelancing.
        </h1>
        <p className="text-lg text-white md:text-xl mb-8">
          Join a thriving community of IT professionals. Build teams,
          collaborate on projects, and grow your freelancing career like never
          before.
        </p>
        <button className="bg-violet-800 text-white py-1.5 px-6 rounded-full text-md font-light hover:bg-violet-900 transition duration-300">
          Request Access
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
