
import React from "react";
import { Link } from "react-router-dom";

// Brief introduction for the static text
const intro = "View the About page to learn more about me.";

const VimAbout: React.FC = () => {
  return (
    <div
      className="w-full py-1 px-2"
      style={{
        minHeight: 28,
      }}
    >
      <span className="text-white text-[1rem] font-semibold">{intro}</span>
      <div className="mt-4">
        <Link 
          to="/about" 
          className="px-3 py-1 bg-terminal-accent text-black rounded hover:bg-terminal-bright-green transition-colors"
        >
          Go to About Page
        </Link>
      </div>
    </div>
  );
};

export default VimAbout;
