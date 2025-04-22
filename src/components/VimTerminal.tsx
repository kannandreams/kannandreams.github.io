
import React, { useState, useEffect, useRef } from 'react';
import { Terminal, FileText, Wrench, Github, Linkedin, Rss } from 'lucide-react';
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
const RESUME_PDF_URL = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"; // Replace with real resume PDF

type Section = 'skills' | 'projects' | 'github' | 'metrics' | 'help' | 'blog' | 'tools';

const GITHUB_URL = "https://github.com/";
const LINKEDIN_URL = "https://linkedin.com/";
const SUBSTACK_URL = "https://substack.com/profile/";

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

  // Add recruiter mode class to body
  useEffect(() => {
    if (recruiterMode) {
      document.body.classList.add('recruiter-mode');
    } else {
      document.body.classList.remove('recruiter-mode');
    }
  }, [recruiterMode]);

  // PDF download button handler
  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = RESUME_PDF_URL;
    link.download = 'resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={cn("terminal-container min-h-screen max-w-7xl mx-auto overflow-hidden font-mono text-[0.95rem]", recruiterMode && "glass-morphism")}>
      {/* Social media icons row */}
      <div className="flex items-center justify-end gap-3 px-4 pt-3 pb-1 border-b border-terminal-border bg-terminal-background">
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <Github size={22} className="hover:text-terminal-accent text-terminal-muted transition-colors" />
        </a>
        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <Linkedin size={22} className="hover:text-terminal-accent text-terminal-muted transition-colors" />
        </a>
        <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer" aria-label="Substack">
          <Rss size={22} className="hover:text-terminal-accent text-terminal-muted transition-colors" />
        </a>
      </div>
      <div className="terminal-header">
        <div className="flex items-center space-x-2">
          <Terminal size={16} />
          <span className="font-bold text-xl text-terminal-bright-green select-none" style={{fontFamily: "'JetBrains Mono', Menlo, Monaco, 'Courier New', monospace"}}>
            ~/.profile
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
        </div>
      </div>
      {
        recruiterMode ? (
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-0 bg-white text-gray-900 animate-fade-in">
            {/* Download button at the top */}
            <div className="w-full flex justify-center py-4 bg-white shadow z-10">
              <button
                onClick={handleDownloadResume}
                className="bg-primary text-white rounded px-5 py-2 hover:bg-primary/90 transition-colors"
              >
                Download Resume (PDF)
              </button>
            </div>
            {/* PDF full screen below */}
            <div className="flex-1 w-full flex justify-center items-center bg-gray-50">
              <iframe
                src={RESUME_PDF_URL}
                title="Resume"
                className="w-full h-[calc(100vh-140px)] rounded-none border-0 bg-white"
                style={{
                  minHeight: '600px',
                  maxHeight: 'calc(100vh - 140px)',
                }}
              />
            </div>
            <div className="text-gray-500 text-center mt-3 italic">Switch to Dev Mode to explore the interactive Vim terminal.</div>
          </div>
        ) : (
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
        )
      }
    </div>
  );
};

export default VimTerminal;

