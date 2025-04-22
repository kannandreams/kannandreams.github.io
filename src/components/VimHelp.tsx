
import React from 'react';

const VimHelp: React.FC = () => {
  return (
    <div className="vim-help animate-fade-in">
      <h2 className="text-terminal-accent text-xl mb-4">Welcome to Vim Portfolio Terminal</h2>
      {/* About Me section */}
      <div className="bg-terminal-border/30 p-3 rounded mb-5">
        <h3 className="text-terminal-primary mb-2">About Me</h3>
        <p className="text-terminal-muted">
          Hello! I’m a passionate software engineer with expertise in frontend and backend technologies. I love building user-centric web apps, learning new tools, and automating workflows. Type a command below to explore my portfolio and see how I work!
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-terminal-border/30 p-3 rounded">
          <h3 className="text-terminal-primary mb-2">Navigation Commands</h3>
          <ul className="space-y-1">
            <li><span className="text-terminal-accent">:skills</span> - View my skills</li>
            <li><span className="text-terminal-accent">:projects</span> - View my projects</li>
            <li><span className="text-terminal-accent">:github</span> - GitHub activity</li>
            <li><span className="text-terminal-accent">:metrics</span> - Performance metrics</li>
            <li><span className="text-terminal-accent">:blog</span> - Latest blog posts</li>
            <li><span className="text-terminal-accent">:tools</span> - Open AI tools page</li>
            <li><span className="text-terminal-accent">:help</span> - Show this help</li>
            <li><span className="text-terminal-accent">:clear</span> - Clear terminal</li>
            <li><span className="text-terminal-accent">:q</span> - Attempt to quit</li>
          </ul>
        </div>
        <div className="bg-terminal-border/30 p-3 rounded">
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
