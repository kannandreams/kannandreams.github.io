
import React from "react";

// Brief introduction for the static text
const intro =
  "👋 Hi, I'm KK — a deeply curious and collaborative software engineer passionate about making meaningful products, especially in web, developer tools, and AI. I thrive building elegant products, shipping iteratively, and bringing energy to every team.";

const VimAbout: React.FC = () => {
  return (
    <div
      className="w-full py-1 px-2"
      style={{
        minHeight: 28,
      }}
    >
      <span className="text-white text-[1rem] font-semibold">{intro}</span>
    </div>
  );
};

export default VimAbout;
