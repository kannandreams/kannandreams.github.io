
import React from "react";

// Brief introduction for the scrolling text
const intro =
  "👋 Hi, I'm KK — a deeply curious and collaborative software engineer passionate about making meaningful products, especially in web, developer tools, and AI. I thrive building elegant products, shipping iteratively, and bringing energy to every team.";

const VimAbout: React.FC = () => {
  return (
    <div
      className="w-full py-1 relative overflow-hidden"
      style={{
        minHeight: 28, // Slightly reduced height
      }}
    >
      <div
        className="animate-scroll-vertical whitespace-nowrap text-white text-[1rem] font-semibold"
        style={{
          animation: "scroll-top 24s linear infinite", // Slower animation (increased from 18s to 24s)
          willChange: "transform",
        }}
      >
        {intro}
        <span className="block mt-2">{intro}</span>
        <span className="block mt-2">{intro}</span>
      </div>
      <style>
        {`
          @keyframes scroll-top {
            0% { transform: translateY(100%); }
            100% { transform: translateY(-100%); }
          }
        `}
      </style>
    </div>
  );
};

export default VimAbout;
