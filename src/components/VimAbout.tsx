
import React from "react";

// Brief introduction for the scrolling text
const intro =
  "👋 Hi, I'm KK — a deeply curious and collaborative software engineer passionate about making meaningful products, especially in web, developer tools, and AI. I thrive building elegant products, shipping iteratively, and bringing energy to every team.";

const VimAbout: React.FC = () => {
  return (
    <div
      className="w-full mt-3 py-2 relative overflow-hidden"
      style={{
        minHeight: 34,
      }}
    >
      <div
        className="animate-scroll-horizontal whitespace-nowrap text-terminal-accent text-[1rem] font-semibold"
        style={{
          animation: "scroll-left 18s linear infinite",
          willChange: "transform",
        }}
      >
        {intro}
        <span className="mx-6">{intro}</span>
        <span className="mx-6">{intro}</span>
      </div>
      <style>
        {`
          @keyframes scroll-left {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
        `}
      </style>
    </div>
  );
};

export default VimAbout;

