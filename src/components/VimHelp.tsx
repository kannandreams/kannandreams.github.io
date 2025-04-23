
import React from 'react';
import { Mail, Book, Wrench, Star, List, Smile } from 'lucide-react';
import { Link } from 'react-router-dom';

const navCommands = [
  { label: ":about", desc: "See my short intro", emoji: "👨‍💻" },
  { label: ":skills", desc: "View my skills", emoji: "💼" },
  { label: ":projects", desc: "View my projects", emoji: "📁" },
  { label: ":blog", desc: "Latest blog posts", emoji: "📝" },
  { label: ":contact", desc: "Get in touch with me", emoji: "📧" }, // Updated label and description
  { label: ":help", desc: "Show this page", emoji: "❔" },
  { label: ":clear", desc: "Clear terminal", emoji: "🧹" },
  { label: ":q", desc: "Attempt to quit", emoji: "🚪" },
];

// Split commands into 2 columns
const midpoint = Math.ceil(navCommands.length / 2);
const firstCol = navCommands.slice(0, midpoint);
const secondCol = navCommands.slice(midpoint);

// Accept activeSection as a prop to enable conditional rendering
const VimHelp: React.FC<{ activeSection?: string }> = ({ activeSection }) => {
  return (
    <div className="vim-help animate-fade-in text-white">
      {activeSection === "about" ? (
        <div className="bg-transparent p-3 rounded mb-3">
          <h2 className="text-terminal-accent text-xl mb-2">About Me</h2>
          <p className="text-terminal-muted text-base">
            👋 Hi, I'm KK — a deeply curious and collaborative software engineer passionate about making meaningful products, especially in web, developer tools, and AI. I thrive building elegant products, shipping iteratively, and bringing energy to every team.
          </p>
          <p className="mt-2">
            I enjoy architecting scalable, robust web applications, collaborating with cross-functional teams, and building tools that empower others. My toolkit spans frontend frameworks, full-stack solutions, and modern infrastructure.
          </p>
          <p className="text-terminal-muted mt-2 italic">
            For more details, check out the <Link to="/about" className="text-terminal-accent hover:underline">About page</Link>.
          </p>
        </div>
      ) : (
        <>
          <h2 className="text-terminal-accent text-xl mb-2">Kannan Kalidasan</h2>
          <div className="bg-transparent p-3 rounded mb-3">
            <h3 className="text-terminal-primary mb-2">About Me</h3>
            <p className="text-terminal-muted text-base">
              Hello! I'm a passionate software engineer with expertise in frontend and backend technologies. I love building user-centric web apps, learning new tools, and automating workflows. Type a command below to explore my portfolio and see how I work!
            </p>
          </div>
          <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div className="border border-[#555] rounded-sm bg-transparent col-span-1 px-0 pb-1 relative">
              <div className="flex items-center pl-1">
                <span className="px-2 py-0.5 font-semibold text-terminal-bright-green text-sm ml-2" style={{ fontWeight: 600, letterSpacing: 0.5 }}>
                  Navigation Commands
                </span>
                <div className="flex-1 h-px bg-[#555] ml-3" />
              </div>
              <div className="grid grid-cols-2 gap-y-1 gap-x-2 mt-2 pl-4 pr-2">
                {firstCol.map(({ label, desc, emoji }) => (
                  <div key={label} className="flex items-baseline space-x-2">
                    <span className="text-terminal-accent min-w-[62px]">{label}</span>
                    <span className="text-xs text-white">
                      <span className="mr-1" role="img" aria-label="icon">{emoji}</span>
                      {desc}
                    </span>
                  </div>
                ))}
                {secondCol.map(({ label, desc, emoji }) => (
                  <div key={label} className="flex items-baseline space-x-2">
                    <span className="text-terminal-accent min-w-[62px]">{label}</span>
                    <span className="text-xs text-white">
                      <span className="mr-1" role="img" aria-label="icon">{emoji}</span>
                      {desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="border border-[#555] rounded-sm bg-transparent col-span-1 px-0 pb-1 relative">
              <div className="flex items-center pl-1">
                <span className="px-2 py-0.5 font-semibold text-terminal-bright-green text-sm ml-2" style={{ fontWeight: 600, letterSpacing: 0.5 }}>
                  Command Tips
                </span>
                <div className="flex-1 h-px bg-[#555] ml-3" />
              </div>
              <ul className="space-y-1 mt-2 text-xs text-white pl-4">
                <li>Commands are case-insensitive.</li>
                <li>
                  You can type <span className="text-terminal-accent">i</span> to enter Insert Mode; <span className="text-terminal-accent">&lt;ESC&gt;</span> returns to Normal.
                </li>
                <li>Want the PDF resume? Use Recruiter Mode toggle on top-right.</li>
                <li>
                  Ready to explore? Try <span className="text-terminal-accent">:skills</span> or <span className="text-terminal-accent">:projects</span>!
                </li>
              </ul>
            </div>
          </div>
          <div className="text-terminal-muted italic border-l-2 border-terminal-accent pl-3 mt-2 text-sm">
            <p>
              This portfolio design is inspired by the Vim editor interface. 80% of it was built through pure vibe coding using ❤️ and :lovable. <br>
              Undeniable proof: I’m a certified vibe coder. 💻🎧⚡
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default VimHelp;
