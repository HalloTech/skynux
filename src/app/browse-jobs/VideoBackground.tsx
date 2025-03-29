import React from "react";

const VideoBackground: React.FC = () => {
  return (
    <div className="relative w-full h-screen max-w-6xl mx-auto my-10">
      <video
        className="absolute inset-0 w-full h-full object-cover rounded-3xl filter brightness-50"
        autoPlay
        muted
        loop
        playsInline
      >
        <source
          src="https://videos.pexels.com/video-files/4974883/4974883-hd_1920_1080_25fps.mp4"
          type="video/mp4"
        />
        <source src="/videos/find-talent.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoBackground;
