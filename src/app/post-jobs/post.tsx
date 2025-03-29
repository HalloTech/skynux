'use client';

import Link from 'next/link';
import { useEffect } from 'react';

const Post = () => {
  useEffect(() => {
    const animateCounter = (element: HTMLElement, target: number) => {
      let count = 0;
      const duration = 3000;
      const interval = 20;
      const steps = duration / interval;
      const increment = target / steps;

      const updateCounter = () => {
        count += increment;
        if (count < target) {
          element.innerText = Math.floor(count) + '+';
          requestAnimationFrame(updateCounter);
        } else {
          element.innerText = target + '+';
        }
      };

      updateCounter();
    };

    document.querySelectorAll<HTMLElement>('.counter').forEach((counter) => {
      const target = parseInt(counter.getAttribute('data-target') || '0', 10);
      animateCounter(counter, target);
    });
  }, []);

  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <div className="relative pt-20 max-sm:pt-12 mt-20">
        <img
          alt="A close-up of a person typing on a laptop with code on the screen"
          className="w-full h-96 object-cover"
          src="https://storage.googleapis.com/a1aa/image/4QzCIo7APc1mIihdHM_DuDvX_W4PhUwEKq2-2OVFZgU.jpg"
          width={1920}
          height={600}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-start text-left px-4 md:px-16">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">Find the Right Talent, Faster!</h1>
          <p className="text-white text-lg md:text-xl mb-6">
            Post your job and connect with top freelancers in software, AI, cybersecurity, and more.
          </p>
          <Link href="/" className="bg-blue-600 text-white text-lg font-semibold py-2 px-6 rounded-full hover:bg-blue-700">
            Post a Job Now!
          </Link>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center md:space-x-6">
          {[
            { value: 50, text: 'Peoples posted job', bg: 'bg-gray-800' },
            { value: 80, text: 'People Projects Done', bg: 'bg-blue-900' },
            { value: 30, text: 'Willing to post job', bg: 'bg-gray-800' },
          ].map((item, index) => (
            <div
              key={index}
              className={`${item.bg} text-white text-center px-12 py-6 rounded-[50px] w-full md:w-1/3 flex flex-col`}
            >
              <h2 className="text-[10rem] font-bold leading-none counter" data-target={item.value}>
                0+
              </h2>
              <p className="text-lg">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Post;
