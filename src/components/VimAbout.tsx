
import React from "react";

// Brief introduction for the static text
const intro =
  "
move the about me content
  
 "

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
