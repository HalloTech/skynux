"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FiSettings } from "react-icons/fi";
import { BsGrid3X3 } from "react-icons/bs";
import { BiMoviePlay } from "react-icons/bi";
import { BsBookmark, BsPersonSquare } from "react-icons/bs";

interface Story {
  id: string;
  title: string;
  imageUrl: string;
}

interface Post {
  id: string;
  imageUrl: string;
  likes: number;
  comments: number;
}

export default function Dashboard() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<'posts' | 'reels' | 'saved' | 'tagged'>('posts');

  const stories: Story[] = [
    { id: '1', title: 'HalloTech', imageUrl: '/story-covers/hallo.png' },
    { id: '2', title: 'Gym', imageUrl: '/story-covers/gym.png' },
    { id: '3', title: '1%', imageUrl: '/story-covers/one-percent.png' },
    { id: '4', title: 'Writing', imageUrl: '/story-covers/writing.png' },
    { id: '5', title: 'Photos', imageUrl: '/story-covers/photos.png' },
    { id: '6', title: 'Cars', imageUrl: '/story-covers/cars.png' },
  ];

  const posts: Post[] = [
    { id: '1', imageUrl: '/posts/post1.jpg', likes: 120, comments: 15 },
    { id: '2', imageUrl: '/posts/post2.jpg', likes: 89, comments: 7 },
    { id: '3', imageUrl: '/posts/post3.jpg', likes: 232, comments: 21 },
  ];

  return (
    <div className="max-w-[975px] mx-auto px-4 pt-8">
      
      {/* Profile Header */}
      <div className="flex items-start gap-8 mb-10">
        <Image
          src={session?.user?.image || "/images/default-avatar.png"}
          alt="Profile"
          width={120}
          height={120}
          className="rounded-full object-cover border-2 border-violet-600"
        />
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-3">
            <h2 className="text-2xl font-semibold">{session?.user?.name || "Your Name"}</h2>
            <button className="border px-4 py-1 rounded text-sm">Edit Profile</button>
            <FiSettings className="text-xl cursor-pointer" />
          </div>
          <div className="flex gap-6 text-sm mb-3">
            <span><strong>{posts.length}</strong> posts</span>
            <span><strong>500</strong> followers</span>
            <span><strong>300</strong> following</span>
          </div>
          <p className="text-sm text-gray-700">CEO @HalloTech | Building Skynux</p>
        </div>
      </div>

      {/* Story Highlights */}
      <div className="flex gap-6 mb-10 px-2 overflow-x-auto scrollbar-hide">
        {stories.map((story) => (
          <div key={story.id} className="flex flex-col items-center">
            <Image
              src={story.imageUrl}
              alt={story.title}
              width={70}
              height={70}
              className="rounded-full border p-[2px] border-gray-300 hover:border-violet-500 transition"
            />
            <p className="text-xs mt-1 text-gray-700">{story.title}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex justify-center border-t border-gray-300 mb-1">
        <button
          onClick={() => setActiveTab('posts')}
          className={`flex items-center gap-1 py-2 px-4 text-sm uppercase tracking-widest ${
            activeTab === 'posts' ? 'border-t-2 border-black text-black' : 'text-gray-500'
          }`}
        >
          <BsGrid3X3 /> Posts
        </button>
        <button
          onClick={() => setActiveTab('reels')}
          className={`flex items-center gap-1 py-2 px-4 text-sm uppercase tracking-widest ${
            activeTab === 'reels' ? 'border-t-2 border-black text-black' : 'text-gray-500'
          }`}
        >
          <BiMoviePlay /> Reels
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`flex items-center gap-1 py-2 px-4 text-sm uppercase tracking-widest ${
            activeTab === 'saved' ? 'border-t-2 border-black text-black' : 'text-gray-500'
          }`}
        >
          <BsBookmark /> Saved
        </button>
        <button
          onClick={() => setActiveTab('tagged')}
          className={`flex items-center gap-1 py-2 px-4 text-sm uppercase tracking-widest ${
            activeTab === 'tagged' ? 'border-t-2 border-black text-black' : 'text-gray-500'
          }`}
        >
          <BsPersonSquare /> Tagged
        </button>
      </div>

      {/* Posts Grid */}
      {activeTab === 'posts' && (
        <div className="grid grid-cols-3 gap-1">
          {posts.map((post) => (
            <div key={post.id} className="relative group aspect-square">
              <Image
                src={post.imageUrl}
                alt={`Post ${post.id}`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition">
                <span className="text-white text-sm">
                  ❤️ {post.likes}
                </span>
                <span className="text-white text-sm">
                  💬 {post.comments}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reels, Saved, Tagged will be added later */}
    </div>
  );
}
