"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Developer {
  avatar: string;
  name: string;
  role: string;
  availability: string;
  description: string;
  certifications: string[];
  rate_inr: number;
  rate_usd: number;
}

const BrowseTalent: React.FC = () => {
  const [developers, setDevelopers] = useState<Developer[]>([]);

  useEffect(() => {
    // Sample data
    setDevelopers([
      {
        avatar: "/images/avatar1.jpg",
        name: "Rahul Srivastava",
        role: "Software Developer",
        availability: "Available Full Time",
        description:
          "We are looking for a skilled Full-Stack Developer to build a modern, high-performance web application.",
        certifications: ["Hackerank Certified", "AWS Certified"],
        rate_inr: 200,
        rate_usd: 2,
      },
      {
        avatar: "/images/avatar2.jpg",
        name: "Aisha Khan",
        role: "Frontend Developer",
        availability: "Available Part Time",
        description:
          "Experienced in building stunning UI/UX with React and Tailwind CSS.",
        certifications: ["Google UX Certified", "Frontend Masters"],
        rate_inr: 150,
        rate_usd: 1.8,
      },
    ]);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-5 pt-20 max-sm:pt-12">
      {/* Hero Section */}
      <div className="bg-gray-200 rounded-[2rem] mt-10 p-8 text-left">
        <h1 className="text-3xl md:text-7xl font-bold text-gray-900">
          Hire the top talent
        </h1>
        <p className="text-lg md:text-3xl text-purple-600 mt-4">
          Explore high-paying freelance opportunities. Work with top clients and
          build your career.
        </p>
        <button className="mt-6 bg-purple-600 text-white py-2 px-8 rounded-full text-lg">
          Hire Now
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row items-center mt-8 space-y-4 md:space-y-0 md:space-x-4 w-full">
        <div className="relative flex-grow w-full md:w-1/2 lg:w-1/3">
          <input
            type="text"
            className="w-[70%] border rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="Search..."
          />
          <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
        </div>

        {/* Sorting Filters */}
        <div className="flex flex-wrap justify-center gap-2 w-full md:w-auto">
          <select className="p-2 rounded border">
            <option value="">Select Talent</option>
            <option value="option1">Option 1</option>
          </select>
        </div>
      </div>

      {/* Developer Listings */}
      <div className="mt-8 flex flex-col space-y-6">
        {developers.map((dev, index) => (
          <div
            key={index}
            className="p-6 mx-auto max-w-7xl mt-2 border rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-gray-300 ease-in duration-200"
          >
            <div className="flex items-center gap-4">
              <Image
                src={dev.avatar}
                alt="Avatar"
                width={64}
                height={64}
                className="w-16 h-16 rounded-full border"
              />
              <div>
                <h2 className="text-2xl font-bold">{dev.name}</h2>
                <p className="text-gray-500">
                  {dev.role} | {dev.availability}
                </p>
                <p className="mt-2">
                  {dev.description}{" "}
                  <span className="text-purple-600 cursor-pointer">
                    Read More
                  </span>
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {dev.certifications.map((cert, certIndex) => (
                    <span
                      key={certIndex}
                      className="bg-gray-200 py-1 px-3 rounded-full"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="text-left md:text-right mt-4 md:mt-0">
              <p className="text-4xl font-bold text-gray-900">
                ₹{dev.rate_inr}/- Hr
              </p>
              <p className="text-4xl font-bold text-gray-900">
                ${dev.rate_usd} per hour
              </p>
              <p className="text-lg text-gray-500 mt-2">{dev.availability}</p>
              <button className="mt-4 bg-purple-600 text-white py-2 px-6 rounded-full text-lg">
                Hire
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseTalent;
