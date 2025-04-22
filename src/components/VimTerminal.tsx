
import React, { useState, useEffect, useRef } from 'react';
import { Terminal, FileText, Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';
import VimCommandLine from './VimCommandLine';
import VimSkills from './VimSkills';
import VimProjects from './VimProjects';
import VimGithub from './VimGithub';
import VimMetrics from './VimMetrics';
import VimHelp from './VimHelp';
import VimBlog from './VimBlog';
import RecruiterResume from './RecruiterResume';
import { Switch } from "@/components/ui/switch";
import { Github, Linkedin, Rss } from "lucide-react";

// Change this to your AI tools URL:
const TOOLS_URL = "https://your-tools-list-url.com";
const RESUME_TEX_FILE = "/src/resume.tex"; // Not a real file, loaded through import

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

  const handleDevModeToggle = (checked: boolean) => {
    setDevMode(checked);
    console.log("Dev mode toggled:", checked);
  };

  // Top menu: icons (left), title (center), toggle + vim mode status (right)
  return (
    <div className={cn("terminal-container min-h-screen max-w-7xl mx-auto overflow-hidden font-mono text-[0.95rem]", !devMode && "glass-morphism")}>
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
        {/* Right: Mode toggle and status */}
        <div className="flex items-center gap-3">
          {/* Dev/Recruiter toggle switch */}
          <div className="flex items-center gap-2">
            <Switch
              checked={devMode}
              onCheckedChange={handleDevModeToggle}
              id="devmode-toggle"
              aria-label="Dev Mode Toggle"
              className="data-[state=checked]:bg-terminal-bright-green data-[state=unchecked]:bg-terminal-border"
            />
            <span className="ml-2 text-terminal-muted select-none text-sm">
              {devMode ? "Dev Mode" : "Recruiter Mode"}
            </span>
          </div>
          {/* Section icons (optional) */}
          {devMode && ( // Only in Vim/dev mode show Vim details
            <>
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
  );
};

export default VimTerminal;
