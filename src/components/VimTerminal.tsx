
import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Blog, Tools } from 'lucide-react';
import { cn } from '@/lib/utils';
import VimCommandLine from './VimCommandLine';
import VimSkills from './VimSkills';
import VimProjects from './VimProjects';
import VimGithub from './VimGithub';
import VimMetrics from './VimMetrics';
import VimHelp from './VimHelp';
import VimBlog from './VimBlog';
import { Toggle } from "@/components/ui/toggle";

// Change this to your AI tools URL:
const TOOLS_URL = "https://your-tools-list-url.com";

type Section = 'skills' | 'projects' | 'github' | 'metrics' | 'help' | 'blog';

const VimTerminal: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>('help');
  const [mode, setMode] = useState<'normal' | 'insert'>('normal');
  const [history, setHistory] = useState<string[]>([]);
  const [recruiterMode, setRecruiterMode] = useState(false);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  // Handle commands entered in the command line
  const executeCommand = (command: string) => {
    setHistory(prev => [...prev, `$ ${command}`]);
    const cmd = command.trim().toLowerCase();

    if (cmd === ':q' || cmd === ':quit') {
      setHistory(prev => [...prev, "Use browser navigation to exit. This is a web app!"]);
    } 
    else if (cmd === ':skills' || cmd === ':s') {
      setActiveSection('skills');
      setHistory(prev => [...prev, "Opening skills panel..."]);
    }
    else if (cmd === ':projects' || cmd === ':p') {
      setActiveSection('projects');
      setHistory(prev => [...prev, "Opening projects panel..."]);
    }
    else if (cmd === ':github' || cmd === ':g') {
      setActiveSection('github');
      setHistory(prev => [...prev, "Opening github stats..."]);
    }
    else if (cmd === ':metrics' || cmd === ':m') {
      setActiveSection('metrics');
      setHistory(prev => [...prev, "Opening performance metrics..."]);
    }
    else if (cmd === ':help' || cmd === ':h') {
      setActiveSection('help');
      setHistory(prev => [...prev, "Opening help..."]);
    }
    else if (cmd === ':clear' || cmd === ':cl') {
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
    // Blog command
    else if (cmd === ':blog' || cmd === ':b') {
      setActiveSection('blog');
      setHistory(prev => [...prev, "Opening blog posts..."]);
    }
    // Tools command
    else if (cmd === ':tools' || cmd === ':t') {
      setHistory(prev => [...prev, "Opening tools page in new window..."]);
      window.open(TOOLS_URL, "_blank", "noopener,noreferrer");
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

  // Add recruiter mode class to body
  useEffect(() => {
    if (recruiterMode) {
      document.body.classList.add('recruiter-mode');
    } else {
      document.body.classList.remove('recruiter-mode');
    }
  }, [recruiterMode]);

  return (
    <div className={cn("terminal-container min-h-screen max-w-7xl mx-auto overflow-hidden font-mono", recruiterMode && "glass-morphism")}>
      <div className="terminal-header">
        <div className="flex items-center space-x-2">
          <Terminal size={16} />
          <span className="font-bold text-xl text-terminal-bright-green select-none" style={{fontFamily: "'JetBrains Mono', Menlo, Monaco, 'Courier New', monospace"}}>
            Vim Portfolio Terminal
          </span>
        </div>
        {/* Toggle for Dev / Recruiter Mode */}
        <div className="flex items-center gap-2">
          <Toggle
            variant="outline"
            size="sm"
            aria-label="Switch Mode"
            pressed={recruiterMode}
            onPressedChange={setRecruiterMode}
            className={cn("mr-1", recruiterMode && "bg-primary text-white")}
          >
            <span className="hidden sm:inline">
              {recruiterMode ? "Recruiter Mode" : "Dev Mode"}
            </span>
            <span className="sm:hidden">
              {recruiterMode ? "R" : "D"}
            </span>
          </Toggle>
          {activeSection === 'blog' && (
            <Blog size={18} className="text-terminal-accent ml-1" />
          )}
          {activeSection === 'tools' && (
            <Tools size={18} className="text-terminal-accent ml-1" />
          )}
          <div className={cn(
            "vim-mode",
            mode === 'insert' && "vim-insert-mode"
          )}>
            {mode === 'normal' ? 'NORMAL' : 'INSERT'}
          </div>
        </div>
      </div>
      
      <div ref={terminalBodyRef} className="terminal-body h-[calc(100vh-120px)] overflow-y-auto">
        {/* Command history */}
        {history.map((line, index) => (
          <div key={index} className="mb-1">
            {line}
          </div>
        ))}
        
        {/* Active section */}
        <div className="mt-4">
          {activeSection === 'skills' && <VimSkills />}
          {activeSection === 'projects' && <VimProjects />}
          {activeSection === 'github' && <VimGithub />}
          {activeSection === 'metrics' && <VimMetrics />}
          {activeSection === 'help' && <VimHelp />}
          {activeSection === 'blog' && <VimBlog />}
        </div>
      </div>
      
      <VimCommandLine onExecuteCommand={executeCommand} mode={mode} setMode={setMode} />
    </div>
  );
};

export default VimTerminal;
