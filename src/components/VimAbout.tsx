
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
      <span className="text-white text-[1rem] font-semibold">{intro}</span>
    </div>
  );
};

export default VimAbout;
