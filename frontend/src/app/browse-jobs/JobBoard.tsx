'use client';

import { useState } from 'react';
import { FaSearch, FaSlidersH } from 'react-icons/fa';

interface Job {
  title: string;
  type: string;
  posted: string;
  description: string;
  categories: string[];
  inr: number;
  usd: number;
  time: string;
  popularity: number;
  featured: boolean;
}

const jobs: Job[] = [
  {
    title: 'Web Developer',
    type: 'Fixed Price',
    posted: 'an hour ago',
    description:
      'Looking for a skilled Full-Stack Developer with React.js and Node.js experience.',
    categories: ['Software Development', 'Node.js', 'MySQL'],
    inr: 17369,
    usd: 200,
    time: 'Full Time',
    popularity: 5,
    featured: true,
  },
  {
    title: 'Python Developer',
    type: 'Hourly Rate',
    posted: '2 hours ago',
    description:
      'Experienced Python developer needed with Django and AI/ML expertise.',
    categories: ['Python Development', 'Django', 'AI/ML'],
    inr: 500,
    usd: 5,
    time: 'Part Time',
    popularity: 8,
    featured: false,
  },
];

const JobBoard = () => {
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobs);
  const categories = Array.from(new Set(jobs.flatMap((job) => job.categories)));

  const handleFilter = (filter: string) => {
    let sortedJobs = [...jobs];
    if (filter === 'latest') {
      sortedJobs.sort((a, b) => (a.posted > b.posted ? -1 : 1));
    } else if (filter === 'popular') {
      sortedJobs.sort((a, b) => b.popularity - a.popularity);
    } else if (filter === 'featured') {
      sortedJobs = sortedJobs.filter((job) => job.featured);
    } else if (filter === 'high-budget') {
      sortedJobs.sort((a, b) => b.inr - a.inr);
    }
    setFilteredJobs(sortedJobs);
  };

  return (
    <div className="max-w-7xl mx-auto p-5 pt-20">
      <div className="bg-gray-200 rounded-2xl mt-10 p-8 text-left">
        <h1 className="text-3xl md:text-7xl font-bold">Find Your Next Big Project</h1>
        <p className="text-lg md:text-3xl text-purple-600 mt-4">
          Explore high-paying freelance opportunities. Work with top clients and build your career.
        </p>
        <button className="mt-6 bg-purple-600 text-white py-2 px-8 rounded-full text-lg">
          Browse Now
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-center mt-8 space-y-4 md:space-y-0 md:space-x-4 w-full">
        <div className="relative flex-grow w-full md:w-1/2 lg:w-1/3">
          <input
            type="text"
            className="w-full border rounded-full py-2 px-4 pl-10 focus:ring-2 focus:ring-purple-600"
            placeholder="Search..."
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
        <button className="p-2 border rounded-full bg-gray-200 hover:bg-gray-300">
          <FaSlidersH />
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-2 w-full md:w-auto mt-4">
        {['latest', 'popular', 'featured', 'high-budget'].map((filter) => (
          <button
            key={filter}
            className="bg-gray-200 py-2 px-4 rounded hover:bg-purple-600 hover:text-white transition"
            onClick={() => handleFilter(filter)}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      <div className="w-full overflow-x-auto bg-gray-100 py-5 mt-4 flex gap-5 px-5">
        {categories.map((category) => (
          <div key={category} className="bg-gray-800 text-white px-6 py-2 rounded-full whitespace-nowrap">
            {category}
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col space-y-6">
        {filteredJobs.map((job) => (
          <div
            key={job.title}
            className="p-6 border rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-gray-300 transition"
          >
            <div>
              <h2 className="text-2xl font-bold">{job.title}</h2>
              <p className="text-gray-500">{job.type} | Posted: {job.posted}</p>
              <p className="mt-2">
                {job.description} <span className="text-purple-600 cursor-pointer">Read More</span>
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {job.categories.map((cat) => (
                  <span key={cat} className="bg-gray-200 py-1 px-3 rounded-full">
                    {cat}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-left md:text-right mt-4 md:mt-0">
              <p className="text-4xl font-bold text-gray-900">₹{job.inr}/</p>
              <p className="text-4xl font-bold text-gray-900">${job.usd}</p>
              <p className="text-lg text-gray-500 mt-2">{job.time}</p>
              <button className="mt-4 bg-purple-600 text-white py-2 px-6 rounded-full text-lg">
                Discuss
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobBoard;
