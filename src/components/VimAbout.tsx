
import React from "react";

// Brief introduction with updated content
const intro = `👋 Hi, I'm Kannan Kalidasan — you can call me KK.`

const VimAbout: React.FC = () => {
  return (
    <div
      className="w-full py-1 px-2 whitespace-pre-line"
      style={{
        minHeight: 28,
      }}
    >
      <h2 className="text-terminal-accent text-xl mb-2 font-bold block">About Me</h2>
      <span className="text-white text-[1rem] font-semibold">{intro}</span>
      <p className="mt-2 text-terminal-muted">
        I'm a Software Engineer and Tech Leader based in the UK, with expertise in Data, Analytics, ML, and Backend systems.
      </p>
    </div>
  );
};

export default VimAbout;
