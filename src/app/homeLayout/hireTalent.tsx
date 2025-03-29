'use client';

import React from 'react';
import Link from 'next/link';

const HireTalent: React.FC = () => {
  return (
    <div className="relative w-full h-screen max-w-6xl mx-auto mt-20">
      <video
        className="absolute inset-0 w-full h-full object-cover rounded-3xl filter brightness-50"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="https://videos.pexels.com/video-files/4974883/4974883-hd_1920_1080_25fps.mp4" type="video/mp4" />
        <source src="/videos/find-talent.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>

      <div className="relative z-10 flex flex-col items-start justify-center h-full px-8 md:px-16 lg:px-32">
        <h2 className="text-white text-lg mb-4">For clients</h2>
        <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
          Hire Talent, Your Way
        </h1>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <Link href="/discover" legacyBehavior>
            <a className="bg-violet-900 bg-opacity-90 text-white p-6 rounded-lg w-full md:w-1/3 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:bg-opacity-100">
              <h3 className="text-xl font-bold mb-2">Skilled professionals</h3>
              <p>Discover top IT professionals ready to bring your projects to life.</p>
            </a>
          </Link>
          <Link href="/collaborate" legacyBehavior>
            <a className="bg-violet-900 bg-opacity-90 text-white p-6 rounded-lg w-full md:w-1/3 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:bg-opacity-100">
              <h3 className="text-xl font-bold mb-2">Seamless Collaboration</h3>
              <p>Post projects, create private teams, and work efficiently with skilled freelancers.</p>
            </a>
          </Link>
          <Link href="/hiring" legacyBehavior>
            <a className="bg-violet-900 bg-opacity-90 text-white p-6 rounded-lg w-full md:w-1/3 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:bg-opacity-100">
              <h3 className="text-xl font-bold mb-2">Smart & Flexible Hiring</h3>
              <p>Access verified talent on demand, manage projects effortlessly, and scale your workforce with confidence.</p>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HireTalent;
