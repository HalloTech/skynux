import React, { useState } from "react";

const UserProfile: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto flex flex-col lg:flex-row p-5 pt-20 max-sm:pt-12">
        {/* Left Sidebar */}
        <LeftSidebar />

        {/* Main Content */}
        <div className="w-full lg:w-2/4 p-4 h-screen overflow-y-auto no-scrollbar">
          <Post
            username="@Jhony09"
            name="Jhon Doe"
            role="DevOps Engineer"
            profilePic="https://storage.googleapis.com/a1aa/image/aGnySD63ATsRoIzjw_HZ_halsOjM4W6OPbNJBwAQ2uI.jpg"
            postImage="https://storage.googleapis.com/a1aa/image/s0-JemKAlj8_zvpzZYi8YqwhdU0GnGgBP6lWYFMlQcU.jpg"
            postDate="29 Jan 25"
            postText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          />
          <Post
            username="@Neha_Sri"
            name="Neha Srivastava"
            role="Full Stack Developer"
            profilePic="https://storage.googleapis.com/a1aa/image/vJhuKpaQAIw9CDSUH9n7gZmlmkp4cpDeaKue0hsqFHs.jpg"
            postImage="https://storage.googleapis.com/a1aa/image/b0ZsN3jWQ_esC65mqaerPGsuOTI5xczEOzPD4dIjJPQ.jpg"
            postDate="29 Jan 25"
            postText="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          />
          <Post
            username="@Jhony09"
            name="Jhon Doe"
            role="DevOps Engineer"
            profilePic="https://storage.googleapis.com/a1aa/image/aGnySD63ATsRoIzjw_HZ_halsOjM4W6OPbNJBwAQ2uI.jpg"
            postImage="https://storage.googleapis.com/a1aa/image/8sWQrBocmeVdDq7zM4OnlTS2ltyG0A8_zaM9GjgQuNU.jpg"
            postDate="29 Jan 25"
            postText="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          />
        </div>

        {/* Right Sidebar */}
        <RightSidebar />
      </div>
    </div>
  );
};

export default UserProfile;

// Left Sidebar Component
const LeftSidebar: React.FC = () => {
  return (
    <div className="w-full lg:w-1/4 p-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col items-center">
          <img
            src="https://storage.googleapis.com/a1aa/image/J__Qk6moc86mHrxiCmew5lz8Q2nibBO5U9EesHT8lcw.jpg"
            alt="Profile picture"
            className="rounded-full w-24 h-24"
          />
          <div className="mt-4 text-center">
            <h2 className="text-xl font-bold">@Akash_A</h2>
            <p className="text-gray-600">Akash Agarwal | Software Engineer</p>
          </div>
        </div>
        <p className="mt-4 text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
    </div>
  );
};

// Post Component
interface PostProps {
  username: string;
  name: string;
  role: string;
  profilePic: string;
  postImage: string;
  postDate: string;
  postText: string;
}

const Post: React.FC<PostProps> = ({
  username,
  name,
  role,
  profilePic,
  postImage,
  postDate,
  postText,
}) => {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <div className="flex items-center">
        <img src={profilePic} alt={name} className="rounded-full w-12 h-12" />
        <div className="ml-4">
          <h2 className="text-lg font-bold">{username}</h2>
          <p className="text-gray-600">{name} | {role}</p>
        </div>
        <button
          onClick={() => setIsFollowing(!isFollowing)}
          className={`ml-auto px-4 py-2 rounded-full ${
            isFollowing ? "bg-gray-300 text-black" : "bg-purple-700 text-white"
          }`}
        >
          {isFollowing ? "Following" : "Follow"}
        </button>
      </div>
      <img src={postImage} alt="Post Image" className="mt-4 rounded-lg" />
      <div className="flex items-center mt-4">
        <i className="far fa-heart text-purple-700"></i>
        <i className="far fa-comment ml-4 text-purple-700"></i>
        <span className="ml-auto text-gray-500">{postDate}</span>
        <i className="fas fa-share ml-4 text-purple-700"></i>
      </div>
      <p className="mt-4 text-gray-700">{postText}</p>
    </div>
  );
};

// Right Sidebar Component
const RightSidebar: React.FC = () => {
  return (
    <div className="w-full lg:w-1/4 p-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-bold">Features</h3>
        <ul className="mt-2 text-gray-700">
          <li className="mt-2">Quality Assurance & Testing</li>
          <li className="mt-2">IT Support & Systems Administration</li>
          <li className="mt-2">Networking & Telecommunications</li>
        </ul>
        <h3 className="mt-4 text-lg font-bold">Following</h3>
        <ul className="mt-2 text-gray-700">
          <FollowingItem
            username="@Jhony09"
            name="Jhon Doe"
            role="DevOps Engineer"
            profilePic="https://storage.googleapis.com/a1aa/image/aGnySD63ATsRoIzjw_HZ_halsOjM4W6OPbNJBwAQ2uI.jpg"
          />
          <FollowingItem
            username="@Neha_Sri"
            name="Neha Srivastava"
            role="Full Stack Developer"
            profilePic="https://storage.googleapis.com/a1aa/image/vJhuKpaQAIw9CDSUH9n7gZmlmkp4cpDeaKue0hsqFHs.jpg"
          />
        </ul>
      </div>
    </div>
  );
};

// Following Item Component
interface FollowingProps {
  username: string;
  name: string;
  role: string;
  profilePic: string;
}

const FollowingItem: React.FC<FollowingProps> = ({
  username,
  name,
  role,
  profilePic,
}) => {
  return (
    <li className="flex items-center mt-2">
      <img src={profilePic} alt={name} className="rounded-full w-10 h-10" />
      <div className="ml-2">
        <h4 className="font-bold">{username}</h4>
        <p className="text-gray-600 text-sm">{name} | {role}</p>
      </div>
    </li>
  );
};
