import React from 'react';

const VimHelp: React.FC = () => {
  // Navigation commands split into two columns
  const navCommands = [
    { label: ":skills", desc: "View my skills" },
    { label: ":projects", desc: "View my projects" },
    { label: ":github", desc: "GitHub activity" },
    { label: ":metrics", desc: "Performance metrics" },
    { label: ":blog", desc: "Latest blog posts" },
    { label: ":tools", desc: "Open AI tools page" },
    { label: ":help", desc: "Show this help" },
    { label: ":clear", desc: "Clear terminal" },
    { label: ":q", desc: "Attempt to quit" },
  ];

  // Divide command list into two columns
  const midpoint = Math.ceil(navCommands.length / 2);
  const firstCol = navCommands.slice(0, midpoint);
  const secondCol = navCommands.slice(midpoint);

  return (
    <div className="vim-help animate-fade-in text-[0.96rem] md:text-[1rem]">
      <h2 className="text-terminal-accent text-xl mb-4">KK</h2>
      {/* About Me section */}
      <div className="bg-terminal-border/30 p-3 rounded mb-5">
        <h3 className="text-terminal-primary mb-2">About Me</h3>
        <p className="text-terminal-muted">
          Hello! I’m a passionate software engineer with expertise in frontend and backend technologies. I love building user-centric web apps, learning new tools, and automating workflows. Type a command below to explore my portfolio and see how I work!
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Navigation Commands - 2 columns */}
        <div className="bg-terminal-border/30 p-3 rounded col-span-1">
          <h3 className="text-terminal-primary mb-2">Navigation Commands</h3>
          <div className="grid grid-cols-2 gap-y-1 gap-x-6">
            {firstCol.map(({ label, desc }) => (
              <div key={label} className="flex items-baseline space-x-2">
                <span className="text-terminal-accent min-w-[62px]">{label}</span>
                <span className="text-terminal-muted text-xs">{desc}</span>
              </div>
            ))}
            {/* Fill up to keep columns equal height */}
            {firstCol.length < secondCol.length && <div></div>}
            {secondCol.map(({ label, desc }) => (
              <div key={label} className="flex items-baseline space-x-2">
                <span className="text-terminal-accent min-w-[62px]">{label}</span>
                <span className="text-terminal-muted text-xs">{desc}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-terminal-border/30 p-3 rounded col-span-1">
          <h3 className="text-terminal-primary mb-2">Command Tips</h3>
          <ul className="space-y-1">
            <li>Commands are case-insensitive.</li>
            <li>You can type <span className="text-terminal-accent">i</span> to enter Insert Mode; <span className="text-terminal-accent">&lt;ESC&gt;</span> returns to Normal.</li>
            <li>Want the PDF resume? Use Recruiter Mode toggle on top-right.</li>
            <li>Ready to explore? Try <span className="text-terminal-accent">:skills</span> or <span className="text-terminal-accent">:projects</span>!</li>
          </ul>
        </div>
      </div>
      <div className="text-terminal-muted italic border-l-2 border-terminal-accent pl-3 mt-2">
        <p>This terminal is a vim-inspired interface for my professional portfolio. Curious about something not shown? Reach out anytime!</p>
      </div>
    </div>
  );
};

export default VimHelp;
