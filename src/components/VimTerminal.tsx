
import React, { useState, useEffect, useRef } from 'react';
import { Terminal, FileText, Wrench, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import VimCommandLine from './VimCommandLine';
import VimSkills from './VimSkills';
import VimProjects from './VimProjects';
import VimGithub from './VimGithub';
import VimMetrics from './VimMetrics';
import VimHelp from './VimHelp';
import VimBlog from './VimBlog';
import RecruiterResume from './RecruiterResume';
import { Github, Linkedin, Rss } from "lucide-react";

// Change this to your AI tools URL:
const TOOLS_URL = "https://your-tools-list-url.com";
const RESUME_TEX_STATIC = "/resume.tex"; // Direct public file for downloading

type Section = 'skills' | 'projects' | 'github' | 'metrics' | 'help' | 'blog' | 'tools';

const GITHUB_URL = "https://github.com/";
const LINKEDIN_URL = "https://linkedin.com/";
const SUBSTACK_URL = "https://substack.com/profile/";

const VimTerminal: React.FC = () => {
  const [devMode, setDevMode] = useState<boolean>(true); // true=Dev(Vim), false=Recruiter
  const [activeSection, setActiveSection] = useState<Section>('help');
  const [mode, setMode] = useState<'normal' | 'insert'>('normal');
  const [history, setHistory] = useState<string[]>([]);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  // Handle commands entered in the command line
  const executeCommand = (command: string) => {
    setHistory(prev => [...prev, `$ ${command}`]);
    const cmd = command.trim().toLowerCase();

    if (cmd === ':q' || cmd === ':quit') {
      setHistory(prev => [...prev, "Use browser navigation to exit. This is a web app!"]);
    } 
    else if (cmd === ':skills' || cmd === ':projects' || cmd === ':github' || cmd === ':metrics' || cmd === ':help' || cmd === ':blog') {
      const commands: Record<string, Section> = {
        ':skills': 'skills',
        ':projects': 'projects',
        ':github': 'github',
        ':metrics': 'metrics',
        ':help': 'help',
        ':blog': 'blog',
      };
      setActiveSection(commands[cmd]);
      setHistory(prev => [...prev, `Opening ${commands[cmd]} panel...`]);
    }
    else if (cmd === ':tools') {
      setHistory(prev => [...prev, "Opening tools page in new window..."]);
      window.open(TOOLS_URL, "_blank", "noopener,noreferrer");
    }
    else if (cmd === ':clear') {
      setHistory([]);
    }
    else if (cmd === 'i' && mode === 'normal') {
      setMode('insert');
      setHistory(prev => [...prev, "-- INSERT MODE --"]);
    }
    else if (cmd === '<esc>' && mode === 'insert') {
      setMode('normal');
      setHistory(prev => [...prev, "-- NORMAL MODE --"]);
    }
    else {
      setHistory(prev => [...prev, `Command not found: ${command}`]);
    }
    
    // Scroll to bottom after command execution
    setTimeout(() => {
      if (terminalBodyRef.current) {
        terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
      }
    }, 0);
  };

  // Auto-scroll on history changes
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const handleDevModeToggle = () => {
    setDevMode((prev) => !prev);
    console.log("Dev mode toggled:", !devMode);
  };

  // Handle file download in recruiter mode
  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = RESUME_TEX_STATIC;
    link.download = 'resume.tex';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Add a class to the container based on the mode
  const containerClasses = cn(
    "terminal-container min-h-screen max-w-7xl mx-auto overflow-hidden font-mono text-[0.95rem]", 
    !devMode && "glass-morphism recruiter-mode"
  );

  // Custom toggle button styles based on state (matches screenshot)
  const CustomToggle = ({ checked, onClick }: { checked: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      aria-label={checked ? "Switch to Recruiter Mode" : "Switch to Dev Mode"}
      className={cn(
        "relative inline-flex items-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-terminal-accent",
        "h-6 w-10 rounded-full mr-1",
        checked
          ? "border-2 border-[--terminal-bright-green] bg-transparent"
          : "border-2 border-terminal-muted bg-transparent"
      )}
      type="button"
      tabIndex={0}
    >
      {/* Icon center in track */}
      <span className={cn(
        "absolute left-1.5 top-[55%] -translate-y-1/2 pointer-events-none",
        "transition-colors",
        checked ? "text-[--terminal-bright-green]" : "text-terminal-muted"
      )}>
        {/* Small Lucide toggle icon */}
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: 'block' }}>
          <rect x="3" y="7" width="14" height="6" rx="3" fill="none"/>
          <circle cx={checked ? 15 : 5} cy="10" r="2.1" fill="none" />
        </svg>
      </span>
      {/* Circle for knob, smoothly moving L/R */}
      <span
        className={cn(
          "block transition-transform duration-300",
          "h-4 w-4 rounded-full",
          checked
            ? "bg-[--terminal-bright-green] border-2 border-[--terminal-bright-green]"
            : "bg-terminal-muted border-2 border-terminal-muted",
          checked
            ? "translate-x-[28px]"
            : "translate-x-0"
        )}
      />
    </button>
  );

  // Top menu: icons (left), title (center), toggle + vim mode status or download button (right)
  return (
    <div className={containerClasses}>
      {/* Unified Menu Bar */}
      <div className="flex items-center justify-between px-4 pt-3 pb-1 border-b border-terminal-border bg-terminal-background">
        {/* Social Icons (left) */}
        <div className="flex items-center gap-3">
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github size={22} style={{ color: "var(--terminal-bright-green)" }} className="transition-all" />
          </a>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin size={22} style={{ color: "var(--terminal-bright-green)" }} className="transition-all" />
          </a>
          <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer" aria-label="Substack">
            <Rss size={22} style={{ color: "var(--terminal-bright-green)" }} className="transition-all" />
          </a>
        </div>
        {/* Header Title center */}
        <div className="flex items-center space-x-2">
          <Terminal size={16} />
          <span className="font-bold text-xl text-terminal-bright-green select-none" style={{fontFamily: "'JetBrains Mono', Menlo, Monaco, 'Courier New', monospace"}}>
            ~/.profile
          </span>
        </div>
        {/* Right side: Toggle or Download in recruiter mode */}
        <div className="flex items-center gap-3">
          {!devMode ? (
            // Recruiter mode: show toggle + download button
            <>
              <div className="flex items-center">
                <CustomToggle checked={devMode} onClick={handleDevModeToggle} />
                <span
                  className="ml-0.5 text-terminal-muted select-none text-base tracking-wide"
                  style={{ fontFamily: "'JetBrains Mono', Menlo, Monaco, 'Courier New', monospace" }}
                >
                  Recruiter Mode
                </span>
              </div>
              <button
                onClick={handleDownloadResume}
                className="ml-3 flex items-center px-2 py-1 rounded-md border border-terminal-muted transition hover:bg-terminal-muted/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-accent text-terminal-muted hover:text-terminal-bright-green"
                aria-label="Download Resume"
                type="button"
              >
                <Download size={19} />
              </button>
            </>
          ) : (
            // Dev mode: show toggle + mode indicator
            <>
              <div className="flex items-center">
                <CustomToggle checked={devMode} onClick={handleDevModeToggle} />
                <span
                  className="ml-0.5 text-terminal-muted select-none text-base tracking-wide"
                  style={{ fontFamily: "'JetBrains Mono', Menlo, Monaco, 'Courier New', monospace" }}
                >
                  Dev Mode
                </span>
              </div>
              {activeSection === 'blog' && (
                <FileText size={18} className="text-terminal-accent ml-1" />
              )}
              {activeSection === 'tools' && (
                <Wrench size={18} className="text-terminal-accent ml-1" />
              )}
              <div className={cn(
                "vim-mode",
                mode === 'insert' && "vim-insert-mode"
              )}>
                {mode === 'normal' ? 'NORMAL' : 'INSERT'}
              </div>
            </>
          )}
        </div>
      </div>
      {/* Main Body */}
      <div className={devMode ? "" : "recruiter-mode-container"}>
        {devMode ? (
          <>
            <div ref={terminalBodyRef} className="terminal-body h-[calc(100vh-170px)] overflow-y-auto flex flex-col">
              {/* Active section first */}
              <div className="mb-4 flex-shrink-0">
                {activeSection === 'skills' && <VimSkills />}
                {activeSection === 'projects' && <VimProjects />}
                {activeSection === 'github' && <VimGithub />}
                {activeSection === 'metrics' && <VimMetrics />}
                {activeSection === 'help' && <VimHelp />}
                {activeSection === 'blog' && <VimBlog />}
              </div>
              {/* Move history to bottom */}
              <div className="mt-auto">
                {history.map((line, index) => (
                  <div key={index} className="mb-1">
                    {line}
                  </div>
                ))}
              </div>
            </div>
            <VimCommandLine onExecuteCommand={executeCommand} mode={mode} setMode={setMode} />
          </>
        ) : (
          <RecruiterResume />
        )}
      </div>
    </div>
  );
};

export default VimTerminal;
