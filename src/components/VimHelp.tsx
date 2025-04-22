
import React from 'react';

const VimHelp: React.FC = () => {
  return (
    <div className="vim-help animate-fade-in">
      <h2 className="text-terminal-accent text-xl mb-4">Welcome to Vim Portfolio Terminal</h2>
      
      <div className="mb-6">
        <p className="text-terminal-muted mb-2">Navigate this portfolio using vim-like commands:</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-terminal-border/30 p-3 rounded">
            <h3 className="text-terminal-primary mb-2">Navigation Commands</h3>
            <ul className="space-y-1">
              <li><span className="text-terminal-accent">:skills</span> - View my skills</li>
              <li><span className="text-terminal-accent">:projects</span> - View my projects</li>
              <li><span className="text-terminal-accent">:github</span> - View GitHub activity</li>
              <li><span className="text-terminal-accent">:metrics</span> - View performance metrics</li>
              <li><span className="text-terminal-accent">:help</span> - Show this help info</li>
            </ul>
          </div>
          
          <div className="bg-terminal-border/30 p-3 rounded">
            <h3 className="text-terminal-primary mb-2">Shorthand Commands</h3>
            <ul className="space-y-1">
              <li><span className="text-terminal-accent">:s</span> - Shorthand for :skills</li>
              <li><span className="text-terminal-accent">:p</span> - Shorthand for :projects</li>
              <li><span className="text-terminal-accent">:g</span> - Shorthand for :github</li>
              <li><span className="text-terminal-accent">:m</span> - Shorthand for :metrics</li>
              <li><span className="text-terminal-accent">:h</span> - Shorthand for :help</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-terminal-border/30 p-3 rounded mb-4">
          <h3 className="text-terminal-primary mb-2">Mode Commands</h3>
          <ul className="space-y-1">
            <li><span className="text-terminal-accent">i</span> - Enter Insert Mode (from Normal Mode)</li>
            <li><span className="text-terminal-accent">&lt;ESC&gt;</span> - Return to Normal Mode (from Insert Mode)</li>
            <li><span className="text-terminal-accent">:clear</span> or <span className="text-terminal-accent">:cl</span> - Clear terminal</li>
            <li><span className="text-terminal-accent">:q</span> or <span className="text-terminal-accent">:quit</span> - Attempt to quit (use browser navigation instead)</li>
          </ul>
        </div>
      </div>
      
      <div className="text-terminal-muted italic border-l-2 border-terminal-accent pl-3">
        <p>This terminal is a vim-inspired interface to showcase my portfolio, skills, and other professional information. Start exploring by typing a command above!</p>
      </div>
    </div>
  );
};

export default VimHelp;
